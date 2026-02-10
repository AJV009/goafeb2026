/**
 * GOA GUIDE — Voting Component
 */
(function (App) {
  'use strict';

  var VOTE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>' +
    '<path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>';

  var saveTimer = null;

  App.getVoteKey = function (catKey, itemName) {
    return catKey + ':' + itemName;
  };

  App.getVoteCount = function (catKey, itemName) {
    var key = App.getVoteKey(catKey, itemName);
    var voters = App.state.votes[key];
    return voters ? voters.length : 0;
  };

  App.hasUserVoted = function (catKey, itemName) {
    var key = App.getVoteKey(catKey, itemName);
    var voters = App.state.votes[key];
    return voters ? voters.indexOf(App.state.userId) !== -1 : false;
  };

  App.toggleVote = function (catKey, itemName) {
    var key = App.getVoteKey(catKey, itemName);
    if (!App.state.votes[key]) App.state.votes[key] = [];

    var voters = App.state.votes[key];
    var idx = voters.indexOf(App.state.userId);

    if (idx === -1) {
      voters.push(App.state.userId);
    } else {
      voters.splice(idx, 1);
    }

    // Clean up empty arrays
    if (voters.length === 0) delete App.state.votes[key];

    // Schedule debounced save
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { App.saveVotes(); }, 2000);
  };

  App.saveVotes = async function () {
    if (!App.API || !App.API.hasConfig()) return;
    var ok = await App.API.saveVotes(App.state.votes);
    if (ok) {
      App.Toast.show('Votes saved', 'success');
    } else {
      App.Toast.show('Failed to save votes', 'error');
    }
  };

  App.buildVoteBtn = function (catKey, itemName, catColor) {
    var count = App.getVoteCount(catKey, itemName);
    var voted = App.hasUserVoted(catKey, itemName);
    var style = voted ? ' style="color:' + catColor + ';border-color:' + catColor + '"' : '';
    return '<button class="vote-btn' + (voted ? ' voted' : '') + '" ' +
      'data-vote-cat="' + catKey + '" data-vote-item="' + itemName.replace(/"/g, '&quot;') + '"' +
      style + '>' +
      VOTE_ICON +
      '<span class="vote-count">' + count + '</span>' +
    '</button>';
  };

  App.bindVoteEvents = function (contentEl) {
    contentEl.querySelectorAll('.vote-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var catKey = btn.dataset.voteCat;
        var itemName = btn.dataset.voteItem;

        App.toggleVote(catKey, itemName);

        // Direct DOM update — no re-render
        var voted = App.hasUserVoted(catKey, itemName);
        var count = App.getVoteCount(catKey, itemName);
        var catColor = GOA_DATA[catKey] ? GOA_DATA[catKey].color : '';

        btn.classList.toggle('voted', voted);
        btn.querySelector('.vote-count').textContent = count;

        if (voted) {
          btn.style.color = catColor;
          btn.style.borderColor = catColor;
        } else {
          btn.style.color = '';
          btn.style.borderColor = '';
        }
      });
    });
  };
})(GoaApp);
