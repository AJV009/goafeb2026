/**
 * GOA GUIDE — Application Orchestrator
 * =====================================
 * Reads GOA_DATA from data.js and renders everything dynamically.
 * Adding new categories to data.js automatically shows them on the page.
 */
(function (App) {
  'use strict';

  App.renderContent = function () {
    // Route to lists views
    if (App.state.viewMode === 'search') { App.renderSearchView(); return; }
    if (App.state.viewMode === 'lists') { App.renderListsOverview(); return; }
    if (App.state.viewMode === 'listDetail') { App.renderListDetail(); return; }

    // Mobile browse: render all categories as continuous scroll
    if (App.state.isMobileView) {
      App.renderAllCategories();
      return;
    }

    // Default: browse GOA_DATA categories (desktop single-category)
    var cat = GOA_DATA[App.state.activeCategory];
    var filteredItems = App.getFilteredItems(cat);
    var areas = App.getAvailableAreas(cat);

    var areaButtons = areas
      .map(function (area) {
        return '<button class="area-btn ' + (App.state.areaFilter === area ? 'active' : '') + '" data-area="' + area + '">' +
          (area === 'All' ? 'All Areas' : area + ' Goa') + '</button>';
      })
      .join('');

    var cardsHtml = filteredItems.length === 0
      ? '<div class="empty-state"><div class="empty-state-icon">\uD83C\uDF34</div>' +
        '<div class="empty-state-text">No matches found. Try a different search or area filter.</div></div>'
      : '<div class="card-grid">' +
          filteredItems.map(function (item, idx) {
            return App.renderCard(item, idx, cat.color, App.state.activeCategory);
          }).join('') +
        '</div>';

    App.$('#content').innerHTML =
      '<div class="section-header">' +
        '<h2 class="section-title">' + cat.icon + ' ' + cat.title + '</h2>' +
        '<span class="section-count">' + filteredItems.length + ' ' + (filteredItems.length === 1 ? 'item' : 'items') + '</span>' +
      '</div>' +
      '<div class="section-divider" style="background: ' + cat.color + '"></div>' +
      '<div class="filters">' +
        '<input class="search-box" type="text" placeholder="Search ' + cat.title.toLowerCase() + '..." value="' + App.state.searchQuery + '" id="search-input" />' +
        areaButtons +
        '<span class="sort-divider"></span>' +
        '<button class="sort-btn' + (App.state.sortBy === 'default' ? ' active' : '') + '" data-sort="default">Default</button>' +
        '<button class="sort-btn' + (App.state.sortBy === 'votes' ? ' active' : '') + '" data-sort="votes">Top Voted</button>' +
        '<button class="sort-btn' + (App.state.sortBy === 'rating' ? ' active' : '') + '" data-sort="rating">\u2605 Rating</button>' +
        '<button class="sort-btn' + (App.state.sortBy === 'popularity' ? ' active' : '') + '" data-sort="popularity">\uD83D\uDD25 Popular</button>' +
      '</div>' +
      cardsHtml;

    App.bindContentEvents();
  };

  async function init() {
    App.renderHeroStats();
    App.renderSidebar();
    App.renderContent();
    App.renderFooter();
    App.bindSidebarEvents();
    App.updateBodyMargin();

    // Fetch lists from JSONBin
    if (App.API && App.API.hasConfig()) {
      try {
        var data = await App.API.fetchLists();
        App.state.lists = data.lists || {};
        App.state.votes = data.votes || {};
        App.state.notes = data.notes || {};
        App.state.checked = data.checked || {};
        App.state.listsLoaded = true;
        App.state.votesLoaded = true;
        App.state.notesLoaded = true;
        App.state.checkedLoaded = true;
        App.renderContent(); // Re-render with vote counts
      } catch (err) {
        console.error('Failed to load lists:', err);
        App.state.lists = {};
        App.state.votes = {};
        App.state.notes = {};
        App.state.checked = {};
        App.state.listsLoaded = true;
        App.state.votesLoaded = true;
        App.state.notesLoaded = true;
        App.state.checkedLoaded = true;
      }
      // Re-render sidebar to show "Wishlists" button now that API check passed
      App.renderSidebar();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(GoaApp);
