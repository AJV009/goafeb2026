/**
 * GOA GUIDE — Footer Component
 */
(function (App) {
  'use strict';

  App.renderFooter = function () {
    const total = App.getTotalItemCount();
    const cats = App.getCategoryCount();

    App.$('#footer').innerHTML = `
      <div class="footer-palm">\uD83C\uDF34</div>
      <div class="footer-stats">${total} places & experiences across ${cats} categories</div>
      Tap any card to reveal Google Maps links & directions
    `;
  };
})(GoaApp);
