'use strict';
const initialState = {
  products: [],
  rounds: [],
  content: undefined
};

function App(state = initialState, action) {
  switch (action.type) {
    case 'RECIEVE_PRODUCTS':
      return Object.assign({}, state, {
        products: action.products
      });
    case 'RECIEVE_ROUNDS':
      return Object.assign({}, state, {
        rounds: action.rounds
      });
    case 'RECIEVE_CONTENT':
      return Object.assign({}, state, {
        content: action.content
      });
    default:
      return state;
  }
}

export default App;
