/**
 * GOA GUIDE — Hero Component
 */
(function (App) {
  'use strict';

  App.renderHeroStats = function () {
    const totalItems = App.getTotalItemCount();
    const totalCats = App.getCategoryCount();

    App.$('#hero-stats').innerHTML = `
      <div class="hero-stat">
        <div class="hero-stat-number">${totalItems}</div>
        <div class="hero-stat-label">Places & Experiences</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-number">${totalCats}</div>
        <div class="hero-stat-label">Categories</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-number">5</div>
        <div class="hero-stat-label">Regions</div>
      </div>
    `;
  };
})(GoaApp);
