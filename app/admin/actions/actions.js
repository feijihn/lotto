'use strict';
import $ from 'jquery';

function recieveProducts(data) {
  return {
    type: 'RECIEVE_PRODUCTS',
    products: data,
    category: 'products'
  }
}

function recieveRounds(data) {
  return {
    type: 'RECIEVE_ROUNDS',
    rounds: data,
    category: 'rounds'
  }
}

export function fetchProducts() {
  return function(dispatch) {
      console.log('requesting products...')
    return(
      $.ajax({
        url: '/products',
        dataType: 'json',
        success: data => {
          dispatch(recieveProducts(data))
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    )
  }
}

export function fetchRounds() {
  return function(dispatch) {
      console.log('requesting products...')
    return(
      $.ajax({
        url: '/rounds',
        dataType: 'json',
        success: data => {
          dispatch(recieveRounds(data))
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    )
  }
}

