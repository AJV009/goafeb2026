/**
 * GOA GUIDE — Global Search Component
 */
(function (App) {
  'use strict';

  var ALL_AREAS = ['All', 'North', 'South', 'Central', 'East', 'Various'];

  App.getSearchAreas = function () {
    var areas = new Set();
    Object.values(GOA_DATA).forEach(function (cat) {
      cat.items.forEach(function (i) { if (i.area) areas.add(i.area); });
    });
    return ALL_AREAS.filter(function (a) { return a === 'All' || areas.has(a); });
  };

  App.searchAllItems = function (query) {
    if (!query || !query.trim()) return [];
    var words = query.toLowerCase().split(/\s+/).filter(Boolean);
    var results = [];

    Object.entries(GOA_DATA).forEach(function (entry) {
      var catKey = entry[0], cat = entry[1];
      cat.items.forEach(function (item) {
        var blob = (item.name + ' ' + item.desc + ' ' + (item.tags || []).join(' ') + ' ' + (item.area || '') + ' ' + cat.title).toLowerCase();
        var allMatch = words.every(function (w) { return blob.includes(w); });
        if (!allMatch) return;

        var nameLower = item.name.toLowerCase();
        var score = 0;
        if (nameLower.includes(query.toLowerCase().trim())) score += 3;
        words.forEach(function (w) { if (nameLower.includes(w)) score += 1; });
        score += 0.5;

        results.push({ item: item, catKey: catKey, cat: cat, score: score });
      });
    });

    results.sort(function (a, b) { return b.score - a.score; });
    return results;
  };

  App.renderSearchView = function () {
    var results = App.searchAllItems(App.state.searchQuery);

    // Apply area filter
    if (App.state.areaFilter !== 'All') {
      results = results.filter(function (r) { return r.item.area === App.state.areaFilter; });
    }

    // Apply sort
    var sortBy = App.state.sortBy;
    if (sortBy && sortBy !== 'default') {
      if (sortBy === 'votes') {
        results.sort(function (a, b) {
          return (App.getVoteCount(b.catKey, b.item.name) || 0) - (App.getVoteCount(a.catKey, a.item.name) || 0);
        });
      } else if (sortBy === 'rating') {
        results.sort(function (a, b) { return (b.item.rating || 0) - (a.item.rating || 0); });
      } else if (sortBy === 'popularity') {
        var popOrder = { high: 3, medium: 2, low: 1 };
        results.sort(function (a, b) { return (popOrder[b.item.popularity] || 0) - (popOrder[a.item.popularity] || 0); });
      }
    }

    // Count unique categories in results
    var catSet = new Set(results.map(function (r) { return r.catKey; }));
    var hasQuery = App.state.searchQuery.trim().length > 0;

    var areas = App.getSearchAreas();
    var areaButtons = areas.map(function (area) {
      return '<button class="area-btn ' + (App.state.areaFilter === area ? 'active' : '') + '" data-area="' + area + '">' +
        (area === 'All' ? 'All Areas' : area + ' Goa') + '</button>';
    }).join('');

    var infoHtml = hasQuery
      ? '<span class="search-results-info">' + results.length + ' result' + (results.length !== 1 ? 's' : '') +
        ' across ' + catSet.size + ' categor' + (catSet.size !== 1 ? 'ies' : 'y') + '</span>'
      : '';

    var cardsHtml;
    if (!hasQuery) {
      cardsHtml = '<div class="empty-state"><div class="empty-state-icon">\uD83D\uDD0D</div>' +
        '<div class="empty-state-text">Start typing to search across all categories</div></div>';
    } else if (results.length === 0) {
      cardsHtml = '<div class="empty-state"><div class="empty-state-icon">\uD83C\uDF34</div>' +
        '<div class="empty-state-text">No matches found. Try a different search or area filter.</div></div>';
    } else {
      cardsHtml = '<div class="card-grid">' + results.map(function (r, idx) {
        var badgeHtml = '<span class="card-area list-cat-badge" style="background:' + r.cat.color + '15;color:' + r.cat.color + '">' +
          r.cat.icon + ' ' + r.cat.title + '</span>';
        return App.renderCard(r.item, idx, r.cat.color, r.catKey, { badgeHtml: badgeHtml });
      }).join('') + '</div>';
    }

    App.$('#content').innerHTML =
      '<div class="section-header">' +
        '<h2 class="section-title">\uD83D\uDD0D Search</h2>' +
        infoHtml +
      '</div>' +
      '<div class="section-divider" style="background: var(--jungle)"></div>' +
      '<div class="filters">' +
        '<input class="search-box" type="text" placeholder="Search all categories..." value="' + App.state.searchQuery + '" id="search-input" autofocus />' +
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

})(GoaApp);
