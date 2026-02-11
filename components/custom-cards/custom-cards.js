/**
 * GOA GUIDE — Custom Cards Component
 * CRUD, inline form, edit modal for user-created place cards in wishlists.
 */
(function (App) {
  'use strict';

  function generateCustomId() {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var id = 'c_';
    for (var i = 0; i < 12; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
  }

  function escHtml(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function parseTags(str) {
    if (!str) return [];
    return str.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
  }

  // ── CRUD ──

  App.addCustomItem = function (listId, name, desc, tags) {
    var list = App.state.lists[listId];
    if (!list) return;
    list.items.push({
      custom: true,
      id: generateCustomId(),
      name: name,
      desc: desc || '',
      tags: tags || [],
      addedAt: new Date().toISOString(),
    });
    list.lastUpdated = new Date().toISOString();
    App.markListsDirty();
    App.saveListsNow();
    App.Toast.show('Custom place added', 'success');
  };

  App.editCustomItem = function (listId, index, updates) {
    var list = App.state.lists[listId];
    if (!list || !list.items[index] || !list.items[index].custom) return;
    var item = list.items[index];
    if (updates.name !== undefined) item.name = updates.name;
    if (updates.desc !== undefined) item.desc = updates.desc;
    if (updates.tags !== undefined) item.tags = updates.tags;
    list.lastUpdated = new Date().toISOString();
    App.markListsDirty();
    App.saveListsNow();
  };

  // ── Inline "Add" form ──

  App.toggleCustomCardForm = function () {
    var area = document.getElementById('custom-card-form-area');
    if (!area) return;
    if (area.querySelector('.custom-card-form')) {
      area.innerHTML = '';
      return;
    }
    area.innerHTML =
      '<div class="custom-card-form">' +
        '<div class="custom-form-title">\uD83D\uDCCC New Custom Place</div>' +
        '<input type="text" id="custom-name-input" class="custom-form-input" placeholder="Place name (required)" maxlength="100" />' +
        '<textarea id="custom-desc-input" class="custom-form-input custom-form-textarea" placeholder="Description (optional)" rows="2" maxlength="300"></textarea>' +
        '<input type="text" id="custom-tags-input" class="custom-form-input" placeholder="Tags, comma-separated (optional)" maxlength="150" />' +
        '<div class="custom-form-actions">' +
          '<button class="action-btn custom-form-cancel" id="custom-form-cancel">Cancel</button>' +
          '<button class="action-btn custom-form-add" id="custom-form-add" disabled>\uD83D\uDCCC Add Place</button>' +
        '</div>' +
      '</div>';

    var nameInput = document.getElementById('custom-name-input');
    var addBtn = document.getElementById('custom-form-add');

    nameInput.focus();
    nameInput.addEventListener('input', function () {
      addBtn.disabled = !nameInput.value.trim();
    });

    document.getElementById('custom-form-cancel').addEventListener('click', function () {
      area.innerHTML = '';
    });

    addBtn.addEventListener('click', function () {
      var name = nameInput.value.trim();
      if (!name) return;
      var desc = document.getElementById('custom-desc-input').value.trim();
      var tags = parseTags(document.getElementById('custom-tags-input').value);
      App.addCustomItem(App.state.activeListId, name, desc, tags);
      area.innerHTML = '';
      App.renderContent();
    });
  };

  // ── Edit modal ──

  App.openEditCustomModal = function (listId, index) {
    App.closeEditCustomModal();
    var list = App.state.lists[listId];
    if (!list || !list.items[index] || !list.items[index].custom) return;
    var item = list.items[index];

    var html = '<div class="custom-edit-overlay" id="custom-edit-overlay">' +
      '<div class="custom-edit-panel">' +
        '<div class="custom-edit-header">' +
          '<h3>\u270F\uFE0F Edit Custom Place</h3>' +
          '<button class="custom-edit-close" id="custom-edit-close">&times;</button>' +
        '</div>' +
        '<input type="text" id="custom-edit-name" class="custom-form-input" value="' + escHtml(item.name).replace(/"/g, '&quot;') + '" placeholder="Place name" maxlength="100" />' +
        '<textarea id="custom-edit-desc" class="custom-form-input custom-form-textarea" placeholder="Description (optional)" rows="3" maxlength="300">' + escHtml(item.desc || '') + '</textarea>' +
        '<input type="text" id="custom-edit-tags" class="custom-form-input" value="' + escHtml((item.tags || []).join(', ')).replace(/"/g, '&quot;') + '" placeholder="Tags, comma-separated" maxlength="150" />' +
        '<div class="custom-form-actions">' +
          '<button class="action-btn custom-form-cancel" id="custom-edit-cancel">Cancel</button>' +
          '<button class="action-btn custom-form-add" id="custom-edit-save">\uD83D\uDCBE Save</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    document.body.insertAdjacentHTML('beforeend', html);

    var overlay = document.getElementById('custom-edit-overlay');
    var nameInput = document.getElementById('custom-edit-name');
    var saveBtn = document.getElementById('custom-edit-save');

    saveBtn.disabled = !nameInput.value.trim();
    nameInput.addEventListener('input', function () {
      saveBtn.disabled = !nameInput.value.trim();
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) App.closeEditCustomModal();
    });

    document.getElementById('custom-edit-close').addEventListener('click', function () {
      App.closeEditCustomModal();
    });

    document.getElementById('custom-edit-cancel').addEventListener('click', function () {
      App.closeEditCustomModal();
    });

    saveBtn.addEventListener('click', function () {
      var name = nameInput.value.trim();
      if (!name) return;
      App.editCustomItem(listId, index, {
        name: name,
        desc: document.getElementById('custom-edit-desc').value.trim(),
        tags: parseTags(document.getElementById('custom-edit-tags').value),
      });
      App.closeEditCustomModal();
      App.renderContent();
    });

    overlay._escHandler = function (e) {
      if (e.key === 'Escape') App.closeEditCustomModal();
    };
    document.addEventListener('keydown', overlay._escHandler);

    nameInput.focus();
  };

  App.closeEditCustomModal = function () {
    var overlay = document.getElementById('custom-edit-overlay');
    if (!overlay) return;
    if (overlay._escHandler) document.removeEventListener('keydown', overlay._escHandler);
    overlay.remove();
  };

  // ── Event binding ──

  App.bindCustomCardEvents = function (contentEl) {
    var addBtn = document.getElementById('add-custom-btn');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        App.toggleCustomCardForm();
      });
    }

    contentEl.querySelectorAll('.edit-custom-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        App.openEditCustomModal(App.state.activeListId, parseInt(btn.dataset.index));
      });
    });
  };

})(GoaApp);
