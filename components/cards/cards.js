/**
 * GOA GUIDE — Card Component
 */
(function (App) {
  'use strict';

  App.ICONS = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    navigate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>',
  };

  function buildAddToListBtn(catKey, itemName) {
    if (!App.API || !App.API.hasConfig()) return '';
    return '<div class="add-to-list-wrap">' +
      '<button class="action-icon add-to-list-btn" data-cat="' + catKey + '" data-item="' + itemName.replace(/"/g, '&quot;') + '" onclick="event.stopPropagation()">' + App.ICONS.plus + '</button>' +
    '</div>';
  }

  App.renderCard = function (item, index, catColor, catKey, opts) {
    opts = opts || {};
    var cardId = catKey + '-' + index;
    var hasLocation = item.lat && item.lng;
    var delay = Math.min(index * 0.04, 0.6);
    var tagBg = catColor + '12';

    var actionsHtml = '<div class="card-actions">';
    if (hasLocation) {
      actionsHtml +=
        '<a class="action-icon" href="' + App.getMapsUrl(item.lat, item.lng, item.name) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="View on Maps">' +
          App.ICONS.pin + '</a>' +
        '<a class="action-icon" href="' + App.getMapsDirections(item.lat, item.lng) + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="Directions">' +
          App.ICONS.navigate + '</a>' +
        '<button class="action-icon copy-gps-btn" data-lat="' + item.lat + '" data-lng="' + item.lng + '" onclick="event.stopPropagation()" title="Copy GPS">' +
          App.ICONS.copy + '</button>';
    }
    if (!opts.skipAddToList) actionsHtml += buildAddToListBtn(catKey, item.name);
    if (opts.extraActionsHtml) actionsHtml += opts.extraActionsHtml;
    actionsHtml += '</div>';

    var voteHtml = App.buildVoteBtn ? App.buildVoteBtn(catKey, item.name, catColor) : '';
    var noteHtml = App.buildNoteBtn ? App.buildNoteBtn(catKey, item.name, catColor) : '';

    var whereHtml = item.where
      ? '<div class="card-where">Try at: ' + item.where + '</div>'
      : '';

    var tagsHtml = (item.tags || [])
      .map(function (t) { return '<span class="tag" style="background:' + tagBg + ';color:' + catColor + '">' + t + '</span>'; })
      .join('');

    var priceHtml = item.price ? '<div class="card-price">' + item.price + '</div>' : '';

    var shelfLifeHtml = item.shelfLife
      ? '<div class="shelf-life"><span>\u2708\uFE0F</span> Flight-safe \u00B7 Shelf life: ' + item.shelfLife + '</div>'
      : '';

    var badgeHtml = opts.badgeHtml || (item.area ? '<span class="card-area">' + item.area + '</span>' : '');

    return '<div class="card" data-card-id="' + cardId + '" style="animation-delay: ' + delay + 's">' +
      '<div class="card-accent" style="background: linear-gradient(90deg, ' + catColor + ', ' + catColor + '66)"></div>' +
      '<div class="card-body">' +
        '<div class="card-top">' +
          '<span class="card-name">' + item.name + '</span>' +
          badgeHtml +
        '</div>' +
        '<div class="card-desc">' + item.desc + '</div>' +
        whereHtml +
        '<div class="card-tags">' + tagsHtml + '</div>' +
        priceHtml +
        shelfLifeHtml +
        actionsHtml +
      '</div>' +
      noteHtml +
      voteHtml +
    '</div>';
  };
})(GoaApp);
