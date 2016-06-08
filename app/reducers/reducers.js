import $ from 'jquery';

function zeroArray(len) {
  return new Array(len + 1).join('0').split('').map(parseFloat);
}

export const initialState = {
  userinfo: {
    local: {
      username: ' '
    },
    facebook: {

    },
    vk: {

    }
  },
  loggedIn: false,
  products: [],
  round: [],
  dateChecking: false,
  transactions: [
    2399123,
    1234822,
    299993,
    327484,
    1284872,
    71263,
    44123452,
    12312123,
    123949,
    1231212,
    244881,
    123231,
    21368089,
    123689,
    12389000
  ],
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
function App(state = initialState, action) {
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
      var prod = $.grep(state.products, el => {
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
      action.data.forEach(ticket => {
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
      stckts.forEach((ticket, i) => {
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
    case 'RECIEVE_CONTENT' :
      let newContent = {};
      action.content.forEach((el, i) => {
        newContent[el.name] = {};
        newContent[el.name].header = el.header;
        newContent[el.name].text = el.text;
      });
      return Object.assign({}, state, {
        content: newContent
      });
    case 'ARCHIVE_TICKETS' :
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
    case 'DATE_CHECKED' :
      return Object.assign({}, state, {
        transactions: action.data,
        dateChecking: false
      });
    case 'DATE_CHECKING' :
      return Object.assign({}, state, {
        dateChecking: true,
        transactions: []
      });
    default:
      return state;
  }
}

export default App;
