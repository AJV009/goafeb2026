/**
 * GOA GUIDE — Lists Component (CRUD, Save, Events)
 */
(function (App) {
  'use strict';

  var autoSaveTimer = null;
  var savedTimerInterval = null;
  var AUTOSAVE_DELAY = 30000;

  // ── CRUD ──

  App.createList = function (name, description) {
    var id = App.generateListId();
    App.state.lists[id] = {
      name: name || 'Untitled List',
      description: description || '',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      items: [],
    };
    App.markListsDirty();
    return id;
  };

  App.addToList = function (listId, cat, itemName) {
    var list = App.state.lists[listId];
    if (!list) return;
    var exists = list.items.some(function (r) { return r.cat === cat && r.name === itemName; });
    if (exists) { App.Toast.show('Already in this list', 'info'); return; }
    list.items.push({ cat: cat, name: itemName });
    list.lastUpdated = new Date().toISOString();
    App.markListsDirty();
    App.Toast.show('Added to ' + list.name, 'success');
  };

  App.removeFromList = function (listId, index) {
    var list = App.state.lists[listId];
    if (!list) return;
    list.items.splice(index, 1);
    list.lastUpdated = new Date().toISOString();
    App.markListsDirty();
  };

  App.deleteList = function (listId) {
    delete App.state.lists[listId];
    App.markListsDirty();
    if (App.state.activeListId === listId) {
      App.state.activeListId = null;
      App.state.viewMode = 'lists';
    }
    App.Toast.show('List deleted', 'info');
  };

  // ── Save logic ──

  App.markListsDirty = function () {
    App.state.listsDirty = true;
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(function () { App.saveListsNow(); }, AUTOSAVE_DELAY);
  };

  App.saveListsNow = async function () {
    if (!App.API.hasConfig()) return;
    clearTimeout(autoSaveTimer);
    var ok = await App.API.saveLists(App.state.lists);
    if (ok) {
      App.state.listsDirty = false;
      App.state.listsLastSaved = new Date();
      App.Toast.show('Saved', 'success', 1500);
    } else {
      App.Toast.show('Save failed \u2014 will retry', 'error');
      autoSaveTimer = setTimeout(function () { App.saveListsNow(); }, 10000);
    }
    if (App.state.viewMode === 'listDetail') App.renderContent();
  };

  // ── Saved-time indicator timer ──

  App.startSavedTimer = function () {
    App.stopSavedTimer();
    savedTimerInterval = setInterval(function () {
      var el = App.$('#save-indicator');
      if (!el) return;
      if (App.state.listsDirty) { el.textContent = 'Unsaved changes'; return; }
      if (App.state.listsLastSaved) { el.textContent = 'Saved ' + App.relativeTime(App.state.listsLastSaved); }
    }, 10000);
  };

  App.stopSavedTimer = function () {
    if (savedTimerInterval) { clearInterval(savedTimerInterval); savedTimerInterval = null; }
  };

  // ── Event binding: Lists overview ──

  App.bindListsOverviewEvents = function () {
    var contentEl = App.$('#content');

    var searchInput = App.$('#search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        App.state.searchQuery = e.target.value;
        App.renderContent();
        var n = App.$('#search-input');
        if (n) { n.focus(); n.setSelectionRange(App.state.searchQuery.length, App.state.searchQuery.length); }
      });
    }

    var createBtn = contentEl.querySelector('.create-list-btn');
    if (createBtn) {
      createBtn.addEventListener('click', function () {
        var id = App.createList();
        App.state.activeListId = id;
        App.state.viewMode = 'listDetail';
        App.state.searchQuery = '';
        App.state.expandedCard = null;
        App.renderSidebar();
        App.renderContent();
      });
    }

    contentEl.querySelectorAll('.list-card').forEach(function (card) {
      card.addEventListener('click', function () {
        App.state.activeListId = card.dataset.listId;
        App.state.viewMode = 'listDetail';
        App.state.searchQuery = '';
        App.state.expandedCard = null;
        App.renderSidebar();
        App.renderContent();
      });
    });

    contentEl.querySelectorAll('.list-delete-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        App.deleteList(btn.dataset.listId);
        App.renderContent();
      });
    });
  };

  // ── Event binding: List detail ──

  App.bindListDetailEvents = function () {
    var contentEl = App.$('#content');

    App.$('#back-to-lists').addEventListener('click', function () {
      App.state.viewMode = 'lists';
      App.state.activeListId = null;
      App.state.searchQuery = '';
      App.state.expandedCard = null;
      App.stopSavedTimer();
      App.renderSidebar();
      App.renderContent();
    });

    var nameInput = App.$('#list-name-input');
    if (nameInput) {
      nameInput.addEventListener('input', function (e) {
        var list = App.state.lists[App.state.activeListId];
        if (list) { list.name = e.target.value; list.lastUpdated = new Date().toISOString(); App.markListsDirty(); }
      });
    }

    var descInput = App.$('#list-desc-input');
    if (descInput) {
      descInput.addEventListener('input', function (e) {
        var list = App.state.lists[App.state.activeListId];
        if (list) { list.description = e.target.value; list.lastUpdated = new Date().toISOString(); App.markListsDirty(); }
      });
    }

    App.$('#save-now-btn').addEventListener('click', function () { App.saveListsNow(); });

    var searchInput = App.$('#search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        App.state.searchQuery = e.target.value;
        App.renderContent();
        var n = App.$('#search-input');
        if (n) { n.focus(); n.setSelectionRange(App.state.searchQuery.length, App.state.searchQuery.length); }
      });
    }

    // Reuse browse-view event bindings for card actions
    if (App.bindVoteEvents) App.bindVoteEvents(contentEl);
    if (App.bindNoteEvents) App.bindNoteEvents(contentEl);
    if (App.bindCustomCardEvents) App.bindCustomCardEvents(contentEl);

    contentEl.querySelectorAll('.copy-gps-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(btn.dataset.lat + ', ' + btn.dataset.lng);
        App.Toast.show('GPS coordinates copied to clipboard', 'success');
      });
    });

    contentEl.querySelectorAll('.remove-from-list-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        App.removeFromList(App.state.activeListId, parseInt(btn.dataset.index));
        App.renderContent();
      });
    });
  };

})(GoaApp);
