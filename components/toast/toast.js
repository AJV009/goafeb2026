/**
 * GOA GUIDE — Toast Notification Component
 */
(function (App) {
  'use strict';

  let container = null;

  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  App.Toast = {
    show(message, type, duration) {
      type = type || 'info';
      duration = duration || 3000;

      const toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      toast.textContent = message;
      getContainer().appendChild(toast);

      requestAnimationFrame(() => toast.classList.add('toast-visible'));

      setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },
  };
})(GoaApp);
