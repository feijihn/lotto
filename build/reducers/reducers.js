'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function zeroArray(len) {
  return new Array(len + 1).join('0').split('').map(parseFloat);
}

var initialState = exports.initialState = {
  userinfo: {
    local: {
      username: ' '
    },
    facebook: {},
    vk: {}
  },
  loggedIn: false,
  products: [],
  round: [],
  product: [{}],
  viewingRound: {},
  markedTickets: [],
  ownedTickets: [],
  roundHistory: [],
  roundFinished: false,
  roundWaitingForWinner: false,
  winner: -1,
  numberTicketsMarked: 0,
  viewingTickets: new Array(100 + 1).join('0').split('').map(parseFloat)
};

/**
* Main app reducer
* @param {Object} state state of the store
* @param {Object} action emitted action
* @return {Object} new application store state
*/
function App() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'RECIEVE_USERINFO':
      return Object.assign({}, state, {
        userinfo: action.userinfo,
        loggedIn: true
      });
    case 'RECIEVE_PRODUCTS':
      return Object.assign({}, state, {
        products: action.products
      });
    case 'RECIEVE_ROUNDS':
      return Object.assign({}, state, {
        round: action.round
      });
    case 'VIEW_PRODUCT':
      var prod = _jquery2.default.grep(state.products, function (el) {
        return el._id === action.prodId;
      });
      return Object.assign({}, state, {
        product: prod
      });
    case 'MARK_TICKET':
      var newState = Object.assign({}, state);
      var _tickets = newState.viewingTickets;
      _tickets[action.value] = 3;
      var _markedTickets = newState.markedTickets;
      _markedTickets.push(action.value);
      return Object.assign({}, state, {
        viewingTickets: _tickets,
        markedTickets: _markedTickets
      });
    case 'VIEWING_TICKETS':
      var temp = state.viewingTickets;
      action.data.forEach(function (ticket) {
        if (ticket.user_id === state.userinfo._id) {
          temp[ticket.value] = 2;
        } else if (ticket.value === state.winner) {
          temp[ticket.value] = 4;
        } else {
          temp[ticket.value] = 1;
        }
      });
      return Object.assign({}, state, {
        viewingTickets: temp
      });
    case 'TICKET_DESELECT':
      var dtckts = state.markedTickets;
      var vtckts = state.viewingTickets;
      var index = dtckts.indexOf(action.value);
      dtckts.splice(index, 1);
      vtckts[action.value] = 0;
      return Object.assign({}, state, {
        markedTickets: dtckts,
        viewingTickets: vtckts
      });
    case 'TICKETS_OWNED':
      return Object.assign({}, state, {
        markedTickets: []
      });
    case 'ROUND_FINISH':
      var wtckts = state.viewingTickets;
      wtckts[action.winner] = 4;
      return Object.assign({}, state, {
        viewingTickets: wtckts,
        markedTickets: [],
        roundFinished: true,
        winner: action.winner
      });
    case 'LOGGED_IN':
      return Object.assign({}, state, {
        loggedIn: action.bool
      });
    case 'ROUNDS_ARCHIVE_FETCHED':
      return Object.assign({}, state, {
        roundHistory: action.data
      });
    case 'CLEAR_TICKETS':
      return Object.assign({}, state, {
        viewingTickets: zeroArray(100),
        roundFinished: false,
        markedTickets: [],
        winner: null,
        roundWaitingForWinner: false
      });
    case 'SELECT_UNMARKED':
      var stckts = state.viewingTickets;
      var footckts = state.markedTickets;
      stckts.forEach(function (ticket, i) {
        if (ticket === 0) {
          footckts.push(i);
          stckts[i] = 3;
        }
      });
      return Object.assign({}, state, {
        viewingTickets: stckts,
        markedTickets: footckts
      });
    case 'WAITING_FOR_WINNER':
      return Object.assign({}, state, {
        roundWaitingForWinner: true
      });
    case 'RECIEVE_CONTENT':
      var introText = '';
      var securityText = '';
      action.content.forEach(function (entry, i) {
        if (entry.name === 'introText') {
          introText = entry.text;
        }
        if (entry.name === 'securityText') {
          securityText = entry.text;
        }
      });
      return Object.assign({}, state, {
        introText: introText,
        securityText: securityText
      });
    case 'ARCHIVE_TICKETS':
      var archive = state.roundHistory;
      for (var i in archive) {
        if (archive[i]._id === action.roundId) {
          archive[i].tickets = action.data;
          console.log(archive[i].tickets);
        }
      }
      return Object.assign({}, state, {
        roundHistory: archive
      });
    default:
      return state;
  }
}

exports.default = App;