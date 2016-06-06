'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialState = {
  products: [],
  rounds: []
};

function rootReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

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

exports.default = rootReducer;