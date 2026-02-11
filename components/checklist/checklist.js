/**
 * GOA GUIDE — Checklist Component
 * Marks places as visited/no-go with per-user tracking.
 */
(function (App) {
  'use strict';

  var CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
    '<polyline points="20 6 9 17 4 12"/></svg>';

  var saveTimer = null;

  App.getCheckKey = function (catKey, itemName) {
    return catKey + ':' + itemName;
  };

  App.hasUserChecked = function (catKey, itemName) {
    var key = App.getCheckKey(catKey, itemName);
    var users = App.state.checked[key];
    return users ? users.indexOf(App.state.userId) !== -1 : false;
  };

  App.toggleCheck = function (catKey, itemName) {
    var key = App.getCheckKey(catKey, itemName);
    if (!App.state.checked[key]) App.state.checked[key] = [];

    var users = App.state.checked[key];
    var idx = users.indexOf(App.state.userId);

    if (idx === -1) {
      users.push(App.state.userId);
    } else {
      users.splice(idx, 1);
    }

    if (users.length === 0) delete App.state.checked[key];

    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { App.saveChecked(); }, 2000);
  };

  App.saveChecked = async function () {
    if (!App.API || !App.API.hasConfig()) return;
    var ok = await App.API.saveChecked(App.state.checked);
    if (ok) {
      App.Toast.show('Checklist saved', 'success');
    } else {
      App.Toast.show('Failed to save checklist', 'error');
    }
  };

  App.buildCheckBtn = function (catKey, itemName) {
    var checked = App.hasUserChecked(catKey, itemName);
    return '<button class="check-btn' + (checked ? ' checked' : '') + '" ' +
      'data-check-cat="' + catKey + '" data-check-item="' + itemName.replace(/"/g, '&quot;') + '" ' +
      'title="Mark as visited">' +
      CHECK_ICON +
    '</button>';
  };

  App.bindChecklistEvents = function (contentEl) {
    contentEl.querySelectorAll('.check-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var catKey = btn.dataset.checkCat;
        var itemName = btn.dataset.checkItem;

        App.toggleCheck(catKey, itemName);

        var checked = App.hasUserChecked(catKey, itemName);
        btn.classList.toggle('checked', checked);

        var card = btn.closest('.card');
        if (card) card.classList.toggle('card-checked', checked);
      });
    });
  };
})(GoaApp);
