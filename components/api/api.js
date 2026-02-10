/**
 * GOA GUIDE — JSONBin API Component
 */
(function (App) {
  'use strict';

  var baseUrl = 'https://api.jsonbin.io/v3/b';
  var CACHE_KEY = 'goa_lists_cache';
  var CACHE_TIME_KEY = 'goa_lists_cache_time';
  var CACHE_TTL = 30000; // 30 seconds

  function hasConfig() {
    return typeof CONFIG !== 'undefined' && CONFIG.JSONBIN_API_KEY && CONFIG.JSONBIN_BIN_ID;
  }

  App.API = {
    hasConfig: hasConfig,

    async fetchLists(skipCache) {
      if (!hasConfig()) return { lists: {} };

      var cached = localStorage.getItem(CACHE_KEY);
      var cacheTime = localStorage.getItem(CACHE_TIME_KEY);

      if (!skipCache && cached && cacheTime && Date.now() - parseInt(cacheTime) < CACHE_TTL) {
        return JSON.parse(cached);
      }

      try {
        var response = await fetch(baseUrl + '/' + CONFIG.JSONBIN_BIN_ID + '/latest', {
          headers: { 'X-Access-Key': CONFIG.JSONBIN_API_KEY },
        });
        if (!response.ok) throw new Error('Failed to fetch lists');

        var result = await response.json();
        this.updateCache(result.record);
        return result.record;
      } catch (error) {
        console.error('API fetch error:', error);
        if (cached) {
          App.Toast.show('Using cached data', 'info');
          return JSON.parse(cached);
        }
        return { lists: {} };
      }
    },

    async saveLists(listsData, retries) {
      if (!hasConfig()) return false;
      retries = retries || 2;

      for (var attempt = 0; attempt <= retries; attempt++) {
        try {
          // Read-modify-write: fetch latest, merge, save
          var remote = await this.fetchLists(true);
          remote.lists = listsData;
          remote.lastUpdated = new Date().toISOString();

          var response = await fetch(baseUrl + '/' + CONFIG.JSONBIN_BIN_ID, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Access-Key': CONFIG.JSONBIN_API_KEY,
            },
            body: JSON.stringify(remote),
          });

          if (!response.ok) throw new Error('Failed to save');
          this.updateCache(remote);
          return true;
        } catch (error) {
          if (attempt === retries) {
            console.error('API save error:', error);
            return false;
          }
          await new Promise(function (r) {
            setTimeout(r, 100 * (attempt + 1));
          });
        }
      }
      return false;
    },

    async saveVotes(votesData, retries) {
      if (!hasConfig()) return false;
      retries = retries || 2;

      for (var attempt = 0; attempt <= retries; attempt++) {
        try {
          var remote = await this.fetchLists(true);
          remote.votes = votesData;
          remote.lastUpdated = new Date().toISOString();

          var response = await fetch(baseUrl + '/' + CONFIG.JSONBIN_BIN_ID, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Access-Key': CONFIG.JSONBIN_API_KEY,
            },
            body: JSON.stringify(remote),
          });

          if (!response.ok) throw new Error('Failed to save votes');
          this.updateCache(remote);
          return true;
        } catch (error) {
          if (attempt === retries) {
            console.error('API save votes error:', error);
            return false;
          }
          await new Promise(function (r) {
            setTimeout(r, 100 * (attempt + 1));
          });
        }
      }
      return false;
    },

    async saveNotes(notesData, retries) {
      if (!hasConfig()) return false;
      retries = retries || 2;

      for (var attempt = 0; attempt <= retries; attempt++) {
        try {
          var remote = await this.fetchLists(true);
          remote.notes = notesData;
          remote.lastUpdated = new Date().toISOString();

          var response = await fetch(baseUrl + '/' + CONFIG.JSONBIN_BIN_ID, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Access-Key': CONFIG.JSONBIN_API_KEY,
            },
            body: JSON.stringify(remote),
          });

          if (!response.ok) throw new Error('Failed to save notes');
          this.updateCache(remote);
          return true;
        } catch (error) {
          if (attempt === retries) {
            console.error('API save notes error:', error);
            return false;
          }
          await new Promise(function (r) {
            setTimeout(r, 100 * (attempt + 1));
          });
        }
      }
      return false;
    },

    updateCache: function (data) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    },

    clearCache: function () {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIME_KEY);
    },
  };
})(GoaApp);
