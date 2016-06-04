'use strict';
import $ from 'jquery';

function recieveContent(data) {
  return {
    type: 'RECIEVE_CONTENT',
    content: data
  };
}

function recieveProducts(data) {
  return {
    type: 'RECIEVE_PRODUCTS',
    products: data,
    category: 'products'
  };
}

function recieveRounds(data) {
  return {
    type: 'RECIEVE_ROUNDS',
    rounds: data,
    category: 'rounds'
  };
}

export function fetchProducts() {
  return function(dispatch) {
    return (
      $.ajax({
        url: '/products',
        dataType: 'json',
        success: data => {
          dispatch(recieveProducts(data));
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    );
  };
}

export function fetchRounds() {
  return function(dispatch) {
    return (
      $.ajax({
        url: '/rounds',
        dataType: 'json',
        data: {
          options: {
            all: true
          }
        },
        success: data => {
          dispatch(recieveRounds(data));
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    );
  };
}

export function fetchContent() {
  return function(dispatch) {
    return (
      $.ajax({
        url: '/content',
        dataType: 'json',
        success: data => {
          dispatch(recieveContent(data));
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    );
  };
}

export function updateProducts(product) {
  return function(dispatch) {
    return (
      $.ajax({
        url: '/products',
        dataType: 'json',
        success: data => {
          dispatch(recieveProducts(data));
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    );
  };
}
