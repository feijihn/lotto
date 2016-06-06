'use strict';
const initialState = {
  products: [],
  rounds: [],
  content: undefined
};

function rootReducer(state = initialState, action) {
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
      let newContent = {};
      action.content.forEach(el => {
        newContent[el.name] = {};
        newContent[el.name].header = el.header;
        let text = el.text.replace(/<br\ \/>/g, '\n');
        newContent[el.name].text = text;
      });
      return Object.assign({}, state, {
        content: newContent
      });
    case 'PRODUCT_SUBMITTING': 
      return Object.assign({}, state, {
        productLoading: true
      });
    case 'PRODUCT_SUBMITTED':
      let newProducts = [];
      newProducts.push(action.product);
      newProducts.push(...state.products);
      return Object.assign({}, state, {
        productLoading: false,
        products: newProducts,
        productLoaded: true
      })
    case 'CONTENT_SUBMITTING': 
      return Object.assign({}, state, {
        contentLoading: true
      });
    case 'CONTENT_SUBMITTED':
      return Object.assign({}, state, {
        contentLoading: false,
        contentLoaded: true
      })
    case 'PRODUCT_REMOVED':
      return Object.assign({}, state, {
        products: action.products
      }) 
    default:
      return state;
  }
}

export default rootReducer;
