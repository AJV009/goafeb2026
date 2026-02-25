/**
 * GOA GUIDE — Flight Details Component
 */
(function (App) {
  'use strict';

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
      status: 'Confirmed'
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
      status: 'Confirmed'
    }
  ];

  function renderFlightCard(f) {
    var aircraftLine = f.aircraft
      ? '<span class="flight-aircraft">' + f.aircraft + '</span>'
      : '';

    return '<div class="flight-card">' +
      '<div class="flight-card-header">' +
        '<span class="flight-type-badge">' + f.type + '</span>' +
        '<span class="flight-pnr">PNR: ' + f.pnr + '</span>' +
        '<span class="flight-status flight-status-confirmed">' + f.status + '</span>' +
      '</div>' +
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

  App.renderFlights = function () {
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
  };

})(GoaApp);
