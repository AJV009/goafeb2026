/**
 * GOA GUIDE — Shared State & Utilities
 */
window.GoaApp = (function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  function getUserId() {
    var id = localStorage.getItem('goa_user_id');
    if (!id) {
      var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      id = 'u_';
      for (var i = 0; i < 12; i++) id += chars[Math.floor(Math.random() * chars.length)];
      localStorage.setItem('goa_user_id', id);
    }
    return id;
  }

  const state = {
    activeCategory: Object.keys(GOA_DATA)[0],
    areaFilter: 'All',
    searchQuery: '',
    expandedCard: null,
    // Lists feature
    viewMode: 'browse', // 'browse' | 'lists' | 'listDetail'
    lists: {},
    activeListId: null,
    listsDirty: false,
    listsLastSaved: null,
    listsLoaded: false,
    // Voting feature
    userId: getUserId(),
    votes: {},
    votesLoaded: false,
    sortBy: 'default', // 'default' | 'votes'
    // Notes feature
    notes: {},
    notesLoaded: false,
    // Checklist feature
    checked: {},
    checkedLoaded: false,
    // Layout
    isMobileView: window.innerWidth <= 768,
  };

  function getMapsUrl(lat, lng, name) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
  }

  function getMapsDirections(lat, lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }

  function getTotalItemCount() {
    return Object.values(GOA_DATA).reduce((sum, cat) => sum + cat.items.length, 0);
  }

  function getCategoryCount() {
    return Object.keys(GOA_DATA).length;
  }

  function generateListId() {
    return Math.random().toString(36).substr(2, 8);
  }

  function relativeTime(date) {
    if (!date) return '';
    var diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 10) return 'just now';
    if (diff < 60) return diff + 's ago';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  }

  return {
    state,
    $,
    getMapsUrl,
    getMapsDirections,
    getTotalItemCount,
    getCategoryCount,
    generateListId,
    relativeTime,
  };
})();
