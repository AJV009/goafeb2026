/**
 * GOA GUIDE — Sidebar Navigation Component
 */
(function (App) {
  'use strict';

  var scrollSpyObserver = null;
  var mobileExpanded = false;

  App.isSidebarCollapsed = function () {
    if (App.state.isMobileView) return true;
    return localStorage.getItem('goa_sidebar_collapsed') === 'true';
  };

  App.setSidebarCollapsed = function (collapsed) {
    localStorage.setItem('goa_sidebar_collapsed', collapsed ? 'true' : 'false');
  };

  App.updateBodyMargin = function () {
    if (App.state.isMobileView) {
      document.body.style.marginLeft = '52px';
    } else {
      document.body.style.marginLeft = App.isSidebarCollapsed() ? '64px' : '220px';
    }
  };

  // ── Backdrop for mobile overlay ──

  function ensureBackdrop() {
    var bd = App.$('#sidebar-backdrop');
    if (!bd) {
      bd = document.createElement('div');
      bd.id = 'sidebar-backdrop';
      bd.className = 'sidebar-backdrop';
      document.body.appendChild(bd);
      bd.addEventListener('click', function () {
        closeMobileMenu();
      });
    }
    return bd;
  }

  function openMobileMenu() {
    mobileExpanded = true;
    var el = App.$('#sidebar');
    if (el) el.classList.add('mobile-expanded');
    var bd = ensureBackdrop();
    bd.classList.add('visible');
  }

  function closeMobileMenu() {
    mobileExpanded = false;
    var el = App.$('#sidebar');
    if (el) el.classList.remove('mobile-expanded');
    var bd = App.$('#sidebar-backdrop');
    if (bd) bd.classList.remove('visible');
  }

  App.renderSidebar = function () {
    var el = App.$('#sidebar');
    if (!el) return;

    var collapsed = App.isSidebarCollapsed();
    el.className = 'sidebar' + (collapsed && !App.state.isMobileView ? ' collapsed' : '');

    var categories = Object.entries(GOA_DATA);
    var hasLists = App.API && App.API.hasConfig();
    var isListsView = App.state.viewMode === 'lists' || App.state.viewMode === 'listDetail';

    var btns = categories.map(function (entry) {
      var key = entry[0], cat = entry[1];
      var active = !isListsView && App.state.activeCategory === key ? ' active' : '';
      return '<button class="sidebar-btn' + active + '" data-cat="' + key + '">' +
        '<span class="sidebar-icon">' + cat.icon + '</span>' +
        '<span class="sidebar-label">' + cat.title + '</span>' +
      '</button>';
    }).join('');

    if (hasLists) {
      var listsActive = isListsView ? ' active' : '';
      btns += '<div class="sidebar-separator"></div>';
      btns += '<button class="sidebar-btn' + listsActive + '" data-cat="__lists__">' +
        '<span class="sidebar-icon">\uD83D\uDCCB</span>' +
        '<span class="sidebar-label">Wishlists</span>' +
      '</button>';
    }

    // Show arrow toggle only when expanded on desktop
    var showToggle = !App.state.isMobileView && !collapsed;
    var toggleHtml = showToggle
      ? '<button class="sidebar-toggle" aria-label="Collapse sidebar">\u2039</button>'
      : '';

    el.innerHTML =
      '<div class="sidebar-header">' +
        '<div class="sidebar-logo">' +
          '<span class="sidebar-logo-icon" role="button" aria-label="Toggle sidebar">\uD83C\uDF34</span>' +
          '<span class="sidebar-logo-text">Goa Guide</span>' +
        '</div>' +
        toggleHtml +
      '</div>' +
      '<nav class="sidebar-nav">' + btns + '</nav>';

    App.updateBodyMargin();
    // Ensure mobile state is clean on re-render
    if (App.state.isMobileView && !mobileExpanded) {
      el.classList.remove('mobile-expanded');
    }
  };

  App.bindSidebarEvents = function () {
    var el = App.$('#sidebar');
    if (!el) return;

    el.addEventListener('click', function (e) {
      // Arrow toggle button (desktop expanded only)
      var toggle = e.target.closest('.sidebar-toggle');
      if (toggle) {
        App.setSidebarCollapsed(true);
        App.renderSidebar();
        return;
      }

      // Logo icon click → expand (desktop collapsed) or open overlay (mobile)
      var logoIcon = e.target.closest('.sidebar-logo-icon');
      if (logoIcon) {
        if (App.state.isMobileView) {
          if (mobileExpanded) {
            closeMobileMenu();
          } else {
            openMobileMenu();
          }
        } else {
          var newState = !App.isSidebarCollapsed();
          App.setSidebarCollapsed(newState);
          App.renderSidebar();
        }
        return;
      }

      // Category button
      var btn = e.target.closest('.sidebar-btn');
      if (!btn) return;
      var cat = btn.dataset.cat;

      if (App.state.isMobileView && cat !== '__lists__') {
        // Mobile: close menu, then scroll to section
        closeMobileMenu();
        var section = document.querySelector('.category-section[data-category-key="' + cat + '"]');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Desktop click (or lists on any device)
      if (cat === '__lists__') {
        if (App.state.isMobileView) closeMobileMenu();
        App.state.viewMode = 'lists';
        App.state.activeListId = null;
        App.state.searchQuery = '';
        App.state.expandedCard = null;
      } else {
        App.state.viewMode = 'browse';
        App.state.activeCategory = cat;
        App.state.areaFilter = 'All';
        App.state.searchQuery = '';
        App.state.expandedCard = null;
      }

      App.renderSidebar();
      App.renderContent();
    });

    // Ensure backdrop exists
    ensureBackdrop();
  };

  // ── Scroll Spy (mobile continuous scroll) ──

  App.initScrollSpy = function () {
    App.cleanupScrollSpy();
    var sections = document.querySelectorAll('.category-section');
    if (sections.length === 0) return;

    scrollSpyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var key = entry.target.dataset.categoryKey;
          App.state.activeCategory = key;
          App.updateSidebarActiveState(key);
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    sections.forEach(function (section) {
      scrollSpyObserver.observe(section);
    });
  };

  App.cleanupScrollSpy = function () {
    if (scrollSpyObserver) {
      scrollSpyObserver.disconnect();
      scrollSpyObserver = null;
    }
  };

  App.updateSidebarActiveState = function (activeKey) {
    var el = App.$('#sidebar');
    if (!el) return;
    el.querySelectorAll('.sidebar-btn').forEach(function (btn) {
      if (btn.dataset.cat === activeKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  // ── Mobile: Render all categories ──

  App.renderAllCategories = function () {
    var categories = Object.entries(GOA_DATA);
    var html = '';

    categories.forEach(function (entry) {
      var key = entry[0], cat = entry[1];
      var cardsHtml = cat.items.map(function (item, idx) {
        return App.renderCard(item, idx, cat.color, key);
      }).join('');

      html += '<div class="category-section" data-category-key="' + key + '">' +
        '<div class="section-header">' +
          '<h2 class="section-title">' + cat.icon + ' ' + cat.title + '</h2>' +
          '<div class="section-divider" style="background: ' + cat.color + '"></div>' +
          '<span class="section-count">' + cat.items.length + ' ' +
            (cat.items.length === 1 ? 'item' : 'items') + '</span>' +
        '</div>' +
        '<div class="card-grid">' + cardsHtml + '</div>' +
      '</div>';
    });

    App.$('#content').innerHTML = html;
    App.bindContentEvents();
    App.initScrollSpy();
  };

  // ── Resize handler ──

  var resizeTimer = null;

  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var wasMobile = App.state.isMobileView;
      App.state.isMobileView = window.innerWidth <= 768;

      if (wasMobile !== App.state.isMobileView) {
        // Clean up mobile state when switching to desktop
        if (!App.state.isMobileView) closeMobileMenu();
        App.cleanupScrollSpy();
        App.renderSidebar();

        if (App.state.viewMode === 'browse') {
          if (App.state.isMobileView) {
            App.renderAllCategories();
          } else {
            App.renderContent();
          }
        }
      }
    }, 150);
  }

  window.addEventListener('resize', handleResize);

})(GoaApp);
