/**
 * GOA GUIDE — Lists Component (Rendering)
 */
(function (App) {
  'use strict';

  // ── Helpers ──

  function escHtml(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function escAttr(s) { return s.replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  App.resolveListItems = function (list) {
    if (!list || !list.items) return [];
    return list.items
      .map(function (ref) {
        if (ref.custom) {
          return { item: ref, cat: '_custom', color: '#9CA3AF', icon: '\uD83D\uDCCC', title: 'Custom', isCustom: true };
        }
        var cat = GOA_DATA[ref.cat];
        if (!cat) return null;
        var item = cat.items.find(function (i) { return i.name === ref.name; });
        if (!item) return null;
        return { item: item, cat: ref.cat, color: cat.color, icon: cat.icon, title: cat.title };
      })
      .filter(Boolean);
  };

  // ── Render: Lists overview ──

  App.renderListsOverview = function () {
    var keys = Object.keys(App.state.lists);
    var query = App.state.searchQuery.toLowerCase();
    if (query) {
      keys = keys.filter(function (id) {
        var l = App.state.lists[id];
        return l.name.toLowerCase().includes(query) || l.description.toLowerCase().includes(query);
      });
    }

    var totalCount = Object.keys(App.state.lists).length;
    var listCardsHtml = keys.length === 0
      ? '<div class="empty-state"><div class="empty-state-icon">\uD83D\uDCCB</div><div class="empty-state-text">' +
        (totalCount === 0 ? 'No wishlists yet \u2014 create your first one!' : 'No wishlists match your search.') +
        '</div></div>'
      : '<div class="lists-grid">' + keys.map(function (id) {
          var l = App.state.lists[id];
          var count = l.items ? l.items.length : 0;
          return '<div class="list-card" data-list-id="' + id + '">' +
            '<div class="list-card-accent"></div>' +
            '<div class="list-card-body">' +
              '<div class="list-card-top">' +
                '<span class="list-card-name">' + escHtml(l.name) + '</span>' +
                '<span class="list-card-count">' + count + ' ' + (count === 1 ? 'item' : 'items') + '</span>' +
              '</div>' +
              (l.description ? '<div class="list-card-desc">' + escHtml(l.description) + '</div>' : '') +
              '<div class="list-card-meta">Created ' + App.relativeTime(l.createdAt) + ' \u00B7 Updated ' + App.relativeTime(l.lastUpdated) + '</div>' +
            '</div>' +
            '<button class="action-icon list-delete-btn" data-list-id="' + id + '" onclick="event.stopPropagation()" title="Delete list">' + App.ICONS.trash + '</button>' +
          '</div>';
        }).join('') + '</div>';

    App.$('#content').innerHTML =
      '<div class="section-header">' +
        '<h2 class="section-title">\uD83D\uDCCB Wishlists</h2>' +
        '<span class="section-count">' + totalCount + ' ' + (totalCount === 1 ? 'list' : 'lists') + '</span>' +
      '</div>' +
      '<div class="section-divider" style="background: var(--jungle)"></div>' +
      '<div class="filters">' +
        '<input class="search-box" type="text" placeholder="Search wishlists..." value="' + App.state.searchQuery + '" id="search-input" />' +
        '<button class="area-btn active create-list-btn">\u002B Create New List</button>' +
      '</div>' +
      listCardsHtml;

    App.bindListsOverviewEvents();
  };

  // ── Render: List detail ──

  App.renderListDetail = function () {
    var list = App.state.lists[App.state.activeListId];
    if (!list) { App.state.viewMode = 'lists'; App.renderContent(); return; }

    var resolved = App.resolveListItems(list);
    var query = App.state.searchQuery.toLowerCase();
    if (query) {
      resolved = resolved.filter(function (r) {
        return r.item.name.toLowerCase().includes(query) ||
          r.item.desc.toLowerCase().includes(query) ||
          (r.item.tags && r.item.tags.some(function (t) { return t.toLowerCase().includes(query); }));
      });
    }

    var savedText = App.state.listsDirty ? 'Unsaved changes' : (App.state.listsLastSaved ? 'Saved ' + App.relativeTime(App.state.listsLastSaved) : '');

    var cardsHtml = resolved.length === 0
      ? '<div class="empty-state"><div class="empty-state-icon">\uD83C\uDF34</div><div class="empty-state-text">' +
        (list.items.length === 0 ? 'This list is empty \u2014 browse categories and add places, or add a custom one!' : 'No matches in this list.') +
        '</div></div>'
      : '<div class="card-grid">' + resolved.map(function (r, idx) {
          return App.renderListCard(r.item, idx, r.color, r.cat, r.icon, r.title, r.isCustom);
        }).join('') + '</div>';

    App.$('#content').innerHTML =
      '<button class="back-btn" id="back-to-lists">\u2190 Back to Wishlists</button>' +
      '<div class="list-detail-header">' +
        '<div class="editable-field">' +
          '<input class="list-name-input" type="text" value="' + escAttr(list.name) + '" id="list-name-input" placeholder="List name" />' +
          '<span class="edit-hint">' + App.ICONS.pen + '</span>' +
        '</div>' +
        '<div class="editable-field">' +
          '<textarea class="list-desc-input" id="list-desc-input" placeholder="Add a description..." rows="2">' + escHtml(list.description) + '</textarea>' +
          '<span class="edit-hint">' + App.ICONS.pen + '</span>' +
        '</div>' +
        '<div class="list-detail-meta">' +
          '<span>Created ' + App.relativeTime(list.createdAt) + '</span>' +
          '<span class="save-indicator" id="save-indicator">' + savedText + '</span>' +
        '</div>' +
        '<div class="list-detail-actions">' +
          '<button class="action-btn save-btn" id="save-now-btn"' + (App.state.listsDirty ? '' : ' disabled') + '>\uD83D\uDCBE Save Now</button>' +
          '<button class="action-btn add-custom-btn" id="add-custom-btn">\uD83D\uDCCC Add Custom Place</button>' +
        '</div>' +
        '<div id="custom-card-form-area"></div>' +
      '</div>' +
      (list.items.length > 0 ? '<div class="filters"><input class="search-box" type="text" placeholder="Search in list..." value="' + App.state.searchQuery + '" id="search-input" /></div>' : '') +
      cardsHtml;

    App.bindListDetailEvents();
    App.startSavedTimer();
  };

  // ── Render: List card (reuses App.renderCard with list-specific overrides) ──

  App.renderListCard = function (item, index, catColor, catKey, catIcon, catTitle, isCustom) {
    var badgeHtml = '<span class="card-area list-cat-badge" style="background:' + catColor + '15;color:' + catColor + '">' + catIcon + ' ' + catTitle + '</span>';
    var removeBtn = '<button class="action-icon remove-from-list-btn" data-index="' + index + '" onclick="event.stopPropagation()" title="Remove">' + App.ICONS.trash + '</button>';

    var opts = {
      badgeHtml: badgeHtml,
      extraActionsHtml: removeBtn,
      skipAddToList: true,
    };

    if (isCustom) {
      var editBtn = '<button class="action-icon edit-custom-btn" data-index="' + index + '" onclick="event.stopPropagation()" title="Edit">' + App.ICONS.pen + '</button>';
      opts.extraActionsHtml = editBtn + removeBtn;
      opts.itemKey = item.id;
      opts.customCard = true;
      // Escape user-generated content for XSS prevention
      var safeItem = {
        name: escHtml(item.name),
        desc: item.desc ? escHtml(item.desc) : '',
        tags: item.tags ? item.tags.map(escHtml) : [],
        area: '',
      };
      return App.renderCard(safeItem, index, catColor, catKey, opts);
    }

    return App.renderCard(item, index, catColor, catKey, opts);
  };

})(GoaApp);
