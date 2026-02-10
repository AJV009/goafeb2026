/**
 * GOA GUIDE — Notes Component
 */
(function (App) {
  'use strict';

  var NOTE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  var saveTimer = null;

  function generateNoteId() {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var id = 'n_';
    for (var i = 0; i < 12; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
  }

  App.getNoteKey = function (catKey, itemName) {
    return catKey + ':' + itemName;
  };

  App.getNotesForItem = function (catKey, itemName) {
    var key = App.getNoteKey(catKey, itemName);
    return App.state.notes[key] || [];
  };

  App.getNoteCount = function (catKey, itemName) {
    return App.getNotesForItem(catKey, itemName).length;
  };

  App.addNote = function (catKey, itemName, text) {
    var key = App.getNoteKey(catKey, itemName);
    if (!App.state.notes[key]) App.state.notes[key] = [];

    var note = {
      id: generateNoteId(),
      userId: App.state.userId,
      text: text,
      ts: new Date().toISOString(),
    };

    App.state.notes[key].push(note);
    App.scheduleNotesSave();
    return note;
  };

  App.deleteNote = function (catKey, itemName, noteId) {
    var key = App.getNoteKey(catKey, itemName);
    var notes = App.state.notes[key];
    if (!notes) return;

    var idx = notes.findIndex(function (n) {
      return n.id === noteId && n.userId === App.state.userId;
    });
    if (idx === -1) return;

    notes.splice(idx, 1);
    if (notes.length === 0) delete App.state.notes[key];
    App.scheduleNotesSave();
  };

  App.scheduleNotesSave = function () {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { App.saveNotes(); }, 2000);
  };

  App.saveNotes = async function () {
    if (!App.API || !App.API.hasConfig()) return;
    var ok = await App.API.saveNotes(App.state.notes);
    if (ok) {
      App.Toast.show('Notes saved', 'success');
    } else {
      App.Toast.show('Failed to save notes', 'error');
    }
  };

  App.buildNoteBtn = function (catKey, itemName, catColor) {
    var count = App.getNoteCount(catKey, itemName);
    var hasNotes = count > 0;
    var style = hasNotes ? ' style="color:' + catColor + ';border-color:' + catColor + '"' : '';
    return '<button class="note-btn' + (hasNotes ? ' has-notes' : '') + '" ' +
      'data-note-cat="' + catKey + '" data-note-item="' + itemName.replace(/"/g, '&quot;') + '"' +
      style + '>' +
      NOTE_ICON +
      '<span class="note-count">' + count + '</span>' +
    '</button>';
  };

  App.openNotesPanel = function (catKey, itemName) {
    // Remove any existing panel
    App.closeNotesPanel();

    var notes = App.getNotesForItem(catKey, itemName);
    var catData = GOA_DATA[catKey];
    var catColor = catData ? catData.color : '#666';

    var notesListHtml = '';
    if (notes.length === 0) {
      notesListHtml = '<div class="notes-empty">' +
        '<div class="notes-empty-icon">💬</div>' +
        'No notes yet. Be the first to add one!</div>';
    } else {
      notesListHtml = notes.map(function (n) {
        var isOwn = n.userId === App.state.userId;
        var deleteBtn = isOwn
          ? '<button class="notes-delete-btn" data-del-id="' + n.id + '" title="Delete">' +
              App.ICONS.trash + '</button>'
          : '';
        var userLabel = isOwn ? 'You' : n.userId.substring(0, 8);
        return '<div class="notes-item">' +
          '<div class="notes-item-text">' + escapeHtml(n.text) + '</div>' +
          '<div class="notes-item-meta">' +
            '<span>' + userLabel + '</span>' +
            '<span>' + App.relativeTime(n.ts) + '</span>' +
            deleteBtn +
          '</div>' +
        '</div>';
      }).join('');
    }

    var html = '<div class="notes-overlay" id="notes-overlay">' +
      '<div class="notes-panel">' +
        '<div class="notes-header">' +
          '<h3 style="color:' + catColor + '">' + escapeHtml(itemName) + '</h3>' +
          '<button class="notes-close-btn" id="notes-close-btn">&times;</button>' +
        '</div>' +
        '<div class="notes-list" id="notes-list">' + notesListHtml + '</div>' +
        '<div class="notes-input">' +
          '<textarea id="notes-textarea" placeholder="Add a note..." rows="1"></textarea>' +
          '<button id="notes-post-btn" disabled>Post</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    document.body.insertAdjacentHTML('beforeend', html);

    // Scroll to bottom of notes list
    var listEl = document.getElementById('notes-list');
    listEl.scrollTop = listEl.scrollHeight;

    // Bind events
    var overlay = document.getElementById('notes-overlay');
    var textarea = document.getElementById('notes-textarea');
    var postBtn = document.getElementById('notes-post-btn');

    // Close on backdrop click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) App.closeNotesPanel();
    });

    document.getElementById('notes-close-btn').addEventListener('click', function () {
      App.closeNotesPanel();
    });

    // Enable/disable post button
    textarea.addEventListener('input', function () {
      postBtn.disabled = !textarea.value.trim();
    });

    // Post note
    function postNote() {
      var text = textarea.value.trim();
      if (!text) return;
      App.addNote(catKey, itemName, text);
      updateCardNoteCount(catKey, itemName, catColor);
      App.openNotesPanel(catKey, itemName);
    }

    postBtn.addEventListener('click', postNote);

    // Enter to send, Shift+Enter for newline
    textarea.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        postNote();
      }
    });

    // Delete note buttons
    overlay.querySelectorAll('.notes-delete-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        App.deleteNote(catKey, itemName, btn.dataset.delId);
        updateCardNoteCount(catKey, itemName, catColor);
        App.openNotesPanel(catKey, itemName);
      });
    });

    // Close on Escape
    overlay._escHandler = function (e) {
      if (e.key === 'Escape') App.closeNotesPanel();
    };
    document.addEventListener('keydown', overlay._escHandler);
  };

  App.closeNotesPanel = function () {
    var overlay = document.getElementById('notes-overlay');
    if (!overlay) return;
    if (overlay._escHandler) document.removeEventListener('keydown', overlay._escHandler);
    overlay.remove();
  };

  function updateCardNoteCount(catKey, itemName, catColor) {
    var selector = '.note-btn[data-note-cat="' + catKey + '"][data-note-item="' +
      itemName.replace(/"/g, '\\"') + '"]';
    var btn = document.querySelector(selector);
    if (!btn) return;

    var count = App.getNoteCount(catKey, itemName);
    btn.querySelector('.note-count').textContent = count;
    if (count > 0) {
      btn.classList.add('has-notes');
      btn.style.color = catColor;
      btn.style.borderColor = catColor;
    } else {
      btn.classList.remove('has-notes');
      btn.style.color = '';
      btn.style.borderColor = '';
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  App.bindNoteEvents = function (contentEl) {
    contentEl.querySelectorAll('.note-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        App.openNotesPanel(btn.dataset.noteCat, btn.dataset.noteItem);
      });
    });
  };
})(GoaApp);
