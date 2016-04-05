import $ from 'jquery';

const initialState = {
  userinfo: {
    local: {
      username: ' '
    },
    facebook: {

    },
    vk: {

    }
  },
  products: [],
  rounds: [],
  viewingProduct: {},
  viewingRound: {},
  markedTickets: [],
  ownedTickets: [],
  numberTicketsMarked: 0,
  viewingTickets: new Array(100 + 1).join('0').split('').map(parseFloat),
  nav: 'index'
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
        userinfo: action.userinfo
      });
    case 'RECIEVE_PRODUCTS':
      return Object.assign({}, state, {
        products: action.products
      });
    case 'RECIEVE_ROUNDS':
      return Object.assign({}, state, {
        rounds: action.rounds,
        viewingRound: action.rounds[0] // take 0th round for now
      });
    case 'VIEW_PRODUCT':
      var prod = $.grep(state.products, el => {
        return el._id === action.product;
      });
      var round = $.grep(state.rounds, el => {
        return el.product_id === action.product;
      });
      return Object.assign({}, state, {
        viewingProduct: prod,
        viewingRound: round,
        nav: 'productpage'
      });
    case 'MARK_TICKET':
      var tckts = state.viewingTickets;
      tckts[action.value] = 3;
      var mtckts = state.markedTickets;
      mtckts.push(action.value);
      return Object.assign({}, state, {
        viewingTickets: tckts,
        markedTickets: mtckts
      });
    case 'VIEWING_TICKETS':
      var temp = state.viewingTickets;
      action.data.forEach(ticket => {
        if (ticket.user_id === state.userinfo._id) {
          temp[ticket.value] = 2;
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
    default:
      return state;
  }
}

export default App;
