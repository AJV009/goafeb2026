/**
 * GOA GUIDE — PWA Component
 * Service worker registration, install prompt, iOS hint, offline sync queue.
 */
(function (App) {
  'use strict';

  var QUEUE_KEY = 'goa_sync_queue';
  var IOS_HINT_KEY = 'goa_ios_hint_shown';
  var MAX_QUEUE = 20;
  var deferredInstallPrompt = null;

  // ── Sync Queue ──

  function getQueue() {
    try {
      return JSON.parse(localStorage.getItem(QUEUE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveQueue(queue) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  }

  function queueSync(id) {
    var queue = getQueue();
    // Dedup: remove existing entry with same id
    queue = queue.filter(function (entry) { return entry.id !== id; });
    queue.push({ id: id, ts: Date.now() });
    // FIFO eviction if over cap
    if (queue.length > MAX_QUEUE) {
      queue = queue.slice(queue.length - MAX_QUEUE);
    }
    saveQueue(queue);
  }

  async function processQueue() {
    var queue = getQueue();
    if (queue.length === 0) return;

    var synced = 0;
    var failed = [];

    for (var i = 0; i < queue.length; i++) {
      var entry = queue[i];
      var ok = false;
      try {
        switch (entry.id) {
          case 'lists':
            ok = await App.API.saveLists(App.state.lists);
            break;
          case 'votes':
            ok = await App.API.saveVotes(App.state.votes);
            break;
          case 'checked':
            ok = await App.API.saveChecked(App.state.checked);
            break;
          case 'notes':
            ok = await App.API.saveNotes(App.state.notes);
            break;
        }
      } catch (e) {
        ok = false;
      }
      if (ok) {
        synced++;
      } else {
        failed.push(entry);
      }
    }

    saveQueue(failed);
    if (synced > 0) {
      App.Toast.show('Synced ' + synced + ' pending ' + (synced === 1 ? 'change' : 'changes'), 'success');
    }
    if (failed.length > 0) {
      App.Toast.show(failed.length + ' ' + (failed.length === 1 ? 'change' : 'changes') + ' still pending', 'info');
    }
  }

  // ── Online / Offline listeners ──

  window.addEventListener('offline', function () {
    App.Toast.show('You are offline \u2014 changes will sync later', 'info');
  });

  window.addEventListener('online', function () {
    App.Toast.show('Back online \u2014 syncing...', 'info');
    processQueue();
  });

  // ── Service Worker Registration ──

  function registerSW() {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('./service-worker.js').then(function (reg) {
      reg.addEventListener('updatefound', function () {
        var newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', function () {
          // New SW installed while an old one is controlling — update available
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateToast();
          }
        });
      });
    }).catch(function (err) {
      console.error('SW registration failed:', err);
    });
  }

  function showUpdateToast() {
    var toast = document.createElement('div');
    toast.className = 'toast toast-info';
    toast.textContent = 'Update available \u2014 tap to refresh';
    toast.style.cursor = 'pointer';
    toast.addEventListener('click', function () {
      window.location.reload();
    });

    var container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    container.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('toast-visible'); });
    // Don't auto-dismiss — user must tap
  }

  // ── Install Prompt ──

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    insertInstallButton();
  });

  window.addEventListener('appinstalled', function () {
    deferredInstallPrompt = null;
    App.Toast.show('App installed!', 'success');
    removeInstallButton();
  });

  function insertInstallButton() {
    var nav = document.querySelector('.sidebar-nav');
    if (!nav || nav.querySelector('.pwa-install-btn')) return;

    var btn = document.createElement('button');
    btn.className = 'sidebar-btn pwa-install-btn';
    btn.style.cssText = '--cat-color:#D4943A';
    btn.innerHTML = '<span class="sidebar-icon">\u2B07\uFE0F</span><span class="sidebar-label">Install App</span>';
    btn.addEventListener('click', promptInstall);
    nav.appendChild(btn);
  }

  function removeInstallButton() {
    var btn = document.querySelector('.pwa-install-btn');
    if (btn) btn.remove();
  }

  async function promptInstall() {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    var result = await deferredInstallPrompt.userChoice;
    if (result.outcome === 'accepted') {
      deferredInstallPrompt = null;
    }
  }

  // Re-insert install button after sidebar re-renders
  var origRenderSidebar = App.renderSidebar;
  App.renderSidebar = function () {
    origRenderSidebar.call(App);
    if (deferredInstallPrompt) {
      insertInstallButton();
    }
  };

  // ── iOS Hint ──

  function showIOSHint() {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    var isStandalone = window.navigator.standalone === true;
    if (!isIOS || isStandalone) return;
    if (localStorage.getItem(IOS_HINT_KEY)) return;

    localStorage.setItem(IOS_HINT_KEY, '1');
    App.Toast.show('Tap Share then "Add to Home Screen" to install', 'info', 6000);
  }

  // ── Public API ──

  App.PWA = {
    queueSync: queueSync,
    processQueue: processQueue
  };

  // ── Init ──

  registerSW();
  showIOSHint();

})(GoaApp);
