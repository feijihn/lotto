'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProducts = fetchProducts;
exports.fetchRoundsArchive = fetchRoundsArchive;
exports.fetchUserInfo = fetchUserInfo;
exports.fetchRounds = fetchRounds;
exports.fetchRoundById = fetchRoundById;
exports.claimTicket = claimTicket;
exports.viewingProduct = viewingProduct;
exports.fetchTickets = fetchTickets;
exports.ownTickets = ownTickets;
exports.deselectTicket = deselectTicket;
exports.markAlertAsRead = markAlertAsRead;
exports.clearTickets = clearTickets;
exports.selectAllTickets = selectAllTickets;
exports.fetchContent = fetchContent;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function recieveContent(data) {
  return {
    type: 'RECIEVE_CONTENT',
    content: data
  };
}

function clearedTickets() {
  return {
    type: 'CLEAR_TICKETS'
  };
}

function roundsArchiveFetched(data) {
  return {
    type: 'ROUNDS_ARCHIVE_FETCHED',
    data: data
  };
}

function loggedIn(bool) {
  return {
    type: 'LOGGED_IN',
    bool: bool
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
 * @param {Object} prodId product id currently viewing
 * @return {Object} object to update the current store state
 * @memberof Actions
 */
function viewProduct(prodId) {
  return {
    type: 'VIEW_PRODUCT',
    prodId: prodId
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
    round: data
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

/**
 * Action representing that some tickets are owned to reducer
 * @return {Object} object to update the current store state
 * @memberof Actions
 */
function ticketsOwned() {
  return {
    type: 'TICKETS_OWNED'
  };
}

/**
 * Action representing that ticket is unmarked to reducer
 * @param {Number} value value of ticket to unmark
 * @return {Object} object to update the current store state
 * @memberof Actions
 */
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

function archiveTickets(data, roundId) {
  return {
    type: 'ARCHIVE_TICKETS',
    roundId: roundId,
    data: data
  };
}

function roundWaitingForWinner(data) {
  return {
    type: 'WAITING_FOR_WINNER',
    data: data
  };
}

function roundFinished(winnum) {
  return {
    type: 'ROUND_FINISH',
    winner: winnum
  };
}

function selectUnmarked() {
  return {
    type: 'SELECT_UNMARKED'
  };
}
/**
 * Fetches products from server
 * @function fetchProducts
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
function fetchProducts() {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      _jquery2.default.ajax({
        url: '/products',
        dataType: 'json',
        success: function success(data) {
          dispatch(recieveProducts(data));
          resolve('done');
        },
        error: function error(xhr, status, err) {
          console.error(status, err.toString());
          reject('error');
        }
      });
    });
  };
}

/**
 * Fetches userinfo from server
 * @function fetchUserInfo
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */

function fetchRoundsArchive() {
  return function (dispatch) {
    return _jquery2.default.ajax({
      url: '/roundsarchive',
      dataType: 'json',
      data: {},
      success: function success(data) {
        dispatch(roundsArchiveFetched(data));
      },
      error: function error(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  };
}

function fetchUserInfo() {
  return function (dispatch) {
    return _jquery2.default.ajax({
      url: '/userinfo',
      dataType: 'json',
      success: function success(data) {
        dispatch(recieveUserInfo(data));
        dispatch(loggedIn(true));
      },
      error: function error(xhr, status, err) {
        dispatch(loggedIn(false));
        console.error(status, err.toString());
      }
    });
  };
}

/**
 * Fetches rounds from server
 * @function fetchRounds
 * @param {ObjectId} prodId product ID to fetch rounds for
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
function fetchRounds(prodId) {
  return function (dispatch) {
    return _jquery2.default.ajax({
      url: '/rounds',
      dataType: 'json',
      data: { prodId: prodId },
      success: function success(data) {
        _jquery2.default.ajax({
          url: '/tickets',
          dataType: 'json',
          data: { rndId: data[0]._id },
          success: function success(data) {
            if (data.state === 'FINISH') {
              dispatch(roundFinished(data.winnum || 0));
            }
            dispatch(viewingTickets(data.tickets));
          },
          error: function error(xhr, status, err) {
            console.error(status, err.toString());
          }
        });
        dispatch(recieveRounds(data[0]));
      },
      error: function error(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  };
}

function fetchRoundById(roundId) {
  return function (dispatch) {
    return _jquery2.default.ajax({
      url: '/roundbyid',
      dataType: 'json',
      method: 'get',
      data: { roundId: roundId },
      success: function success(data) {
        dispatch(recieveRounds(data));
      },
      error: function error(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  };
}

/**
 * Claims a ticket which belong to a product
 * @function fetchRounds
 * @param {Number} value value of ticket
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
function claimTicket(value) {
  return function (dispatch) {
    dispatch(markTicket(value));
  };
}

/**
 * choose product to open respective ProductPage and remember product currently viewing
 * @function fetchRounds
 * @param {ObjectId} prodId viewing product id
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
function viewingProduct(prodId) {
  return function (dispatch) {
    dispatch(viewProduct(prodId));
  };
}

/**
 * fetch ticket for specified round
 * @function fetchRounds
 * @param {ObjectId} rndId round id to fetch tickets for
 * @return {Function} dispatcher fucntion which emits action
 * @memberof Actions
 */
function fetchTickets(rndId) {
  var archive = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  console.log('fetching tickets...');
  return function (dispatch) {
    _jquery2.default.ajax({
      url: '/tickets',
      dataType: 'json',
      data: { rndId: rndId },
      success: function success(data) {
        if (archive) {
          dispatch(archiveTickets(data.tickets, rndId));
          return true;
        } else {
          switch (data.state) {
            case 'FINISH':
              dispatch(roundFinished(data.winnum));
              break;
            case 'WAITING':
              dispatch(roundWaitingForWinner());
              break;
            case 'INPROG':
              break;
            default:
              console.error(new Error('bad data from server when fetching tickets...'));
              break;
          }
          dispatch(viewingTickets(data.tickets));
        }
      },
      error: function error(xhr, status, err) {
        console.error(status, err.toString());
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
function ownTickets(values, rndId) {
  return function (dispatch) {
    _jquery2.default.ajax({
      url: '/owntickets',
      dataType: 'json',
      method: 'post',
      data: { rndId: rndId, values: values },
      success: function success(data) {
        if (data.status === 'OK') {
          dispatch(ticketsOwned());
        }
        if (data.status === 'FINISH') {
          dispatch(roundFinished(data.winnum));
        }
      },
      error: function error(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  };
}

function deselectTicket(value) {
  return function (dispatch) {
    dispatch(ticketDeselected(value));
  };
}

function markAlertAsRead(alertId) {
  return function (dispatch) {
    _jquery2.default.ajax({
      url: '/alertread',
      method: 'post',
      data: { alertId: alertId },
      success: function success(data) {
        recieveUserInfo(data);
      },
      error: function error(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  };
}

function clearTickets() {
  return function (dispatch) {
    dispatch(clearedTickets());
  };
}

function selectAllTickets() {
  return function (dispatch) {
    dispatch(selectUnmarked());
  };
}

function fetchContent() {
  return function (dispatch) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _jquery2.default.ajax({
        url: '/content',
        dataType: 'json',
        success: function success(data) {
          dispatch(recieveContent(data));
          resolve('done');
        },
        error: function error(xhr, status, err) {
          console.error(_this.props.url, status, err.toString());
          reject('error');
        }
      });
    });
  };
}