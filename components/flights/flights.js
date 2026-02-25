/**
 * GOA GUIDE — Flight Details Component
 */
(function (App) {
  'use strict';

  var countdownRAF = null;

  var flights = [
    {
      type: 'Onward Journey',
      flight: '6E-6944',
      airline: 'IndiGo',
      class: 'Economy',
      pnr: 'P4H3XZ',
      from: { city: 'Pune', code: 'PNQ', time: '05:20', date: '27 Feb 2026' },
      to: { city: 'North Goa', code: 'GOX', time: '06:20', date: '27 Feb 2026' },
      duration: '1h 00m',
      stops: 'Non-Stop',
      status: 'Confirmed',
      // IST departure: 2026-02-27T05:20:00+05:30
      departureISO: '2026-02-27T05:20:00+05:30'
    },
    {
      type: 'Return Journey',
      flight: '6E-6943',
      airline: 'IndiGo',
      class: 'Economy',
      aircraft: 'Airbus A321',
      pnr: 'J5P4JC',
      from: { city: 'North Goa', code: 'GOX', time: '23:20', date: '02 Mar 2026' },
      to: { city: 'Pune', code: 'PNQ', time: '00:15', date: '03 Mar 2026' },
      duration: '0h 55m',
      stops: 'Non-Stop',
      status: 'Confirmed',
      // IST departure: 2026-03-02T23:20:00+05:30
      departureISO: '2026-03-02T23:20:00+05:30'
    }
  ];

  function padTwo(n) { return n < 10 ? '0' + n : '' + n; }
  function padThree(n) { return n < 10 ? '00' + n : n < 100 ? '0' + n : '' + n; }

  function formatCountdown(ms) {
    if (ms <= 0) return { text: 'Departed', past: true };

    var days = Math.floor(ms / 86400000);
    ms %= 86400000;
    var hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    var mins = Math.floor(ms / 60000);
    ms %= 60000;
    var secs = Math.floor(ms / 1000);
    var millis = ms % 1000;

    return {
      days: days,
      hours: padTwo(hours),
      mins: padTwo(mins),
      secs: padTwo(secs),
      millis: padThree(millis),
      past: false
    };
  }

  function updateCountdowns() {
    var now = Date.now();
    for (var i = 0; i < flights.length; i++) {
      var el = document.getElementById('countdown-' + i);
      if (!el) continue;

      var diff = new Date(flights[i].departureISO).getTime() - now;
      var c = formatCountdown(diff);

      if (c.past) {
        el.innerHTML = '<span class="cd-departed">Departed</span>';
      } else {
        el.innerHTML =
          '<span class="cd-segment"><span class="cd-value">' + c.days + '</span><span class="cd-unit">d</span></span>' +
          '<span class="cd-sep">:</span>' +
          '<span class="cd-segment"><span class="cd-value">' + c.hours + '</span><span class="cd-unit">h</span></span>' +
          '<span class="cd-sep">:</span>' +
          '<span class="cd-segment"><span class="cd-value">' + c.mins + '</span><span class="cd-unit">m</span></span>' +
          '<span class="cd-sep">:</span>' +
          '<span class="cd-segment"><span class="cd-value">' + c.secs + '</span><span class="cd-unit">s</span></span>' +
          '<span class="cd-sep">:</span>' +
          '<span class="cd-segment cd-ms"><span class="cd-value">' + c.millis + '</span><span class="cd-unit">ms</span></span>';
      }
    }
    countdownRAF = requestAnimationFrame(updateCountdowns);
  }

  function renderFlightCard(f, idx) {
    var aircraftLine = f.aircraft
      ? '<span class="flight-aircraft">' + f.aircraft + '</span>'
      : '';

    return '<div class="flight-card">' +
      '<div class="flight-card-header">' +
        '<span class="flight-type-badge">' + f.type + '</span>' +
        '<span class="flight-pnr">PNR: ' + f.pnr + '</span>' +
        '<span class="flight-status flight-status-confirmed">' + f.status + '</span>' +
      '</div>' +
      '<div class="flight-countdown" id="countdown-' + idx + '"></div>' +
      '<div class="flight-route">' +
        '<div class="flight-endpoint">' +
          '<div class="flight-time">' + f.from.time + '</div>' +
          '<div class="flight-code">' + f.from.code + '</div>' +
          '<div class="flight-city">' + f.from.city + '</div>' +
          '<div class="flight-date">' + f.from.date + '</div>' +
        '</div>' +
        '<div class="flight-connector">' +
          '<div class="flight-duration">' + f.duration + '</div>' +
          '<div class="flight-line"><span class="flight-plane-icon">\u2708\uFE0F</span></div>' +
          '<div class="flight-stops">' + f.stops + '</div>' +
        '</div>' +
        '<div class="flight-endpoint">' +
          '<div class="flight-time">' + f.to.time + '</div>' +
          '<div class="flight-code">' + f.to.code + '</div>' +
          '<div class="flight-city">' + f.to.city + '</div>' +
          '<div class="flight-date">' + f.to.date + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="flight-meta">' +
        '<span class="flight-number">' + f.airline + ' ' + f.flight + '</span>' +
        '<span class="flight-class">' + f.class + '</span>' +
        aircraftLine +
      '</div>' +
    '</div>';
  }

  function stopCountdown() {
    if (countdownRAF) {
      cancelAnimationFrame(countdownRAF);
      countdownRAF = null;
    }
  }

  App.renderFlights = function () {
    // Stop any previous countdown loop
    stopCountdown();

    var html =
      '<div class="section-header">' +
        '<h2 class="section-title">\u2708\uFE0F Flight Details</h2>' +
        '<div class="section-divider" style="background: #4A90D9"></div>' +
      '</div>' +
      '<div class="flights-container">' +
        flights.map(renderFlightCard).join('') +
        '<div class="flights-note">' +
          'All times are in 24-hour format and local airport time.' +
        '</div>' +
      '</div>';

    App.$('#content').innerHTML = html;
    // Start countdown loop
    countdownRAF = requestAnimationFrame(updateCountdowns);
  };

  // Stop countdown when navigating away
  var origRenderContent = App.renderContent;
  if (origRenderContent) {
    App.renderContent = function () {
      if (App.state.viewMode !== 'flights') stopCountdown();
      origRenderContent.call(App);
    };
  }

})(GoaApp);
