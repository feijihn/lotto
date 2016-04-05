'use strict';
import $ from 'jquery';
/** @namespace Actions */
/**
 * Action representing userinfo to reducer
 * @param {Object} data userinfo fetched from server
 * @return {Object} object to update the current store state
 * @memberof Actions
 */
function recieveUserInfo(data) {
  return {
    type: 'RECIEVE_USERINFO',
    userinfo: data
  };
}

/**
 * Action representing products to reducer
 * @param {Object} data products fetched from server
 * @return {Object} object to update the current store state
 * @memberof Actions
 */
function recieveProducts(data) {
  return {
    type: 'RECIEVE_PRODUCTS',
    products: data
  };
}

/**
 * Action currently viewing product to reducer
 * @param {Object} product product id currently viewing
 * @return {Object} object to update the current store state
 * @memberof Actions
 */
function viewProduct(product) {
  return {
    type: 'VIEW_PRODUCT',
    product: product
  };
}

/**
 * Action representing rounds to reducer
 * @param {Object} data rounds fetched from server
 * @return {Object} object to update the current store state
 * @memberof Actions
 */
function recieveRounds(data) {
  return {
    type: 'RECIEVE_ROUNDS',
    rounds: data
  };
}

/**
 * Action representing that ticket is marked to reducer
 * @param {Number} value value of ticket to mark for buying
 * @return {Object} object to update the current store state
 * @memberof Actions
 */
function markTicket(value) {
  return {
    type: 'MARK_TICKET',
    value: value
  };
}

function ticketsOwned() {
  return {
    type: 'TICKETS_OWNED'
  };
}

function ticketDeselected(value) {
  return {
    type: 'TICKET_DESELECT',
    value: value
  };
}

function ownedTicket(value) {
  return {
    type: 'OWN_TICKET',
    value: value
  };
}

function viewingTickets(data) {
  return {
    type: 'VIEWING_TICKETS',
    data: data
  };
}
/**
 * Fetches products from server
 * @function fetchProducts
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
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

/**
 * Fetches userinfo from server
 * @function fetchUserInfo
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
export function fetchUserInfo() {
  return function(dispatch) {
    return (
      $.ajax({
        url: '/userinfo',
        dataType: 'json',
        success: data => {
          dispatch(recieveUserInfo(data));
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    );
  };
}

/**
 * Fetches rounds from server
 * @function fetchRounds
 * @param {ObjectId} prodId product ID to fetch rounds for
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
export function fetchRounds(prodId) {
  return function(dispatch) {
    return (
      $.ajax({
        url: '/rounds',
        dataType: 'json',
        data: {prodId: prodId},
        success: data => {
          dispatch(fetchTickets(data[0]._id));
          dispatch(recieveRounds(data));
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    );
  };
}

/**
 * Claims a ticket which belong to a product
 * @function fetchRounds
 * @param {Number} value value of ticket
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
export function claimTicket(value) {
  return function(dispatch) {
    dispatch(markTicket(value));
  };
}

/**
 * choose product to open respective ProductPage and remember product currently viewing
 * @function fetchRounds
 * @param {ObjectId} product viewing product id
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
export function viewingProduct(product) {
  return function(dispatch) {
    dispatch(viewProduct(product));
  };
}

/**
 * fetch ticket for specified round
 * @function fetchRounds
 * @param {ObjectId} rndId viewing round id
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
export function fetchTickets(rndId) {
  return function(dispatch) {
    $.ajax({
      url: '/tickets',
      dataType: 'json',
      data: {rndId: rndId},
      success: data => {
        dispatch(viewingTickets(data));
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  };
}

/**
 * owns tickets on the server
 * @function ownTickets
 * @param {Array} values ticket values
 * @param {ObjectId} rndId round id viewing
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
export function ownTickets(values, rndId) {
  return function(dispatch) {
    $.ajax({
      url: '/owntickets',
      method: 'post',
      data: {rndId: rndId, values: values},
      success: data => {
        dispatch(ticketsOwned());
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  };
}

export function deselectTicket(value) {
  return function(dispatch) {
    dispatch(ticketDeselected(value));
  };
}
