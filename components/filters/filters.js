/**
 * GOA GUIDE — Filters Component
 */
(function (App) {
  'use strict';

  function getAllAreas() {
    return ['All', 'North', 'South', 'Central', 'East', 'Various'];
  }

  App.getAvailableAreas = function (cat) {
    var areas = new Set(cat.items.map(function (i) { return i.area; }).filter(Boolean));
    return ['All'].concat(getAllAreas().filter(function (a) { return a !== 'All' && areas.has(a); }));
  };

  App.getFilteredItems = function (cat) {
    var items = cat.items;

    if (App.state.areaFilter !== 'All') {
      items = items.filter(function (i) { return i.area === App.state.areaFilter; });
    }

    if (App.state.searchQuery.trim()) {
      var q = App.state.searchQuery.toLowerCase();
      items = items.filter(function (i) {
        return i.name.toLowerCase().includes(q) ||
          i.desc.toLowerCase().includes(q) ||
          (i.tags && i.tags.some(function (t) { return t.toLowerCase().includes(q); }));
      });
    }

    var sortBy = App.state.sortBy;
    if (sortBy && sortBy !== 'default') {
      items = items.slice();
      if (sortBy === 'votes') {
        var catKey = App.state.activeCategory;
        items.sort(function (a, b) {
          return (App.getVoteCount(catKey, b.name) || 0) - (App.getVoteCount(catKey, a.name) || 0);
        });
      } else if (sortBy === 'rating') {
        items.sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });
      } else if (sortBy === 'popularity') {
        var popOrder = { high: 3, medium: 2, low: 1 };
        items.sort(function (a, b) { return (popOrder[b.popularity] || 0) - (popOrder[a.popularity] || 0); });
      }
    }

    return items;
  };

  App.bindContentEvents = function () {
    var contentEl = App.$('#content');

    // Search input
    var searchInput = App.$('#search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        App.state.searchQuery = e.target.value;
        App.renderContent();
        var newInput = App.$('#search-input');
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(App.state.searchQuery.length, App.state.searchQuery.length);
        }
      });
    }

    // Area filter buttons
    contentEl.querySelectorAll('.area-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        App.state.areaFilter = btn.dataset.area;
        App.state.expandedCard = null;
        App.renderContent();
      });
    });

    // Vote buttons
    if (App.bindVoteEvents) App.bindVoteEvents(contentEl);

    // Note buttons
    if (App.bindNoteEvents) App.bindNoteEvents(contentEl);

    // Checklist buttons
    if (App.bindChecklistEvents) App.bindChecklistEvents(contentEl);

    // Sort buttons
    contentEl.querySelectorAll('.sort-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        App.state.sortBy = btn.dataset.sort;
        App.renderContent();
      });
    });

    // Copy GPS buttons
    contentEl.querySelectorAll('.copy-gps-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(btn.dataset.lat + ', ' + btn.dataset.lng);
        App.Toast.show('GPS coordinates copied to clipboard', 'success');
      });
    });

    // Add-to-list buttons
    contentEl.querySelectorAll('.add-to-list-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wrap = btn.closest('.add-to-list-wrap');
        var existing = wrap.querySelector('.add-to-list-dropdown');
        if (existing) { existing.remove(); return; }

        // Close any other open dropdowns
        contentEl.querySelectorAll('.add-to-list-dropdown').forEach(function (d) { d.remove(); });

        var listKeys = Object.keys(App.state.lists);
        var catKey = btn.dataset.cat;
        var itemName = btn.dataset.item;

        var html = '<div class="add-to-list-dropdown">';
        if (listKeys.length === 0) {
          html += '<div class="add-to-list-option" style="color:var(--text-muted);cursor:default">No lists yet</div>';
        } else {
          listKeys.forEach(function (id) {
            html += '<button class="add-to-list-option" data-list-id="' + id + '">' + App.state.lists[id].name + '</button>';
          });
        }
        html += '<button class="add-to-list-option new-list-option">+ New List</button></div>';

        wrap.insertAdjacentHTML('beforeend', html);

        var dropdown = wrap.querySelector('.add-to-list-dropdown');

        // Bind dropdown options
        dropdown.querySelectorAll('.add-to-list-option[data-list-id]').forEach(function (opt) {
          opt.addEventListener('click', function (e) {
            e.stopPropagation();
            App.addToList(opt.dataset.listId, catKey, itemName);
            dropdown.remove();
          });
        });

        var newBtn = dropdown.querySelector('.new-list-option');
        if (newBtn) {
          newBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var id = App.createList();
            App.addToList(id, catKey, itemName);
            dropdown.remove();
          });
        }

        // Close on outside click
        setTimeout(function () {
          document.addEventListener('click', function closeDropdown() {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
          }, { once: true });
        }, 0);
      });
    });
  };
})(GoaApp);
