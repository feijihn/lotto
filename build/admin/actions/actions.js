'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProducts = fetchProducts;
exports.fetchRounds = fetchRounds;
exports.fetchContent = fetchContent;
exports.updateProducts = updateProducts;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function fetchProducts() {
  return function (dispatch) {
    var _this = this;

    return _jquery2.default.ajax({
      url: '/products',
      dataType: 'json',
      success: function success(data) {
        dispatch(recieveProducts(data));
      },
      error: function error(xhr, status, err) {
        console.error(_this.props.url, status, err.toString());
      }
    });
  };
}

function fetchRounds() {
  return function (dispatch) {
    var _this2 = this;

    return _jquery2.default.ajax({
      url: '/rounds',
      dataType: 'json',
      data: {
        options: {
          all: true
        }
      },
      success: function success(data) {
        dispatch(recieveRounds(data));
      },
      error: function error(xhr, status, err) {
        console.error(_this2.props.url, status, err.toString());
      }
    });
  };
}

function fetchContent() {
  return function (dispatch) {
    var _this3 = this;

    return _jquery2.default.ajax({
      url: '/content',
      dataType: 'json',
      success: function success(data) {
        dispatch(recieveContent(data));
      },
      error: function error(xhr, status, err) {
        console.error(_this3.props.url, status, err.toString());
      }
    });
  };
}

function updateProducts(product) {
  return function (dispatch) {
    var _this4 = this;

    return _jquery2.default.ajax({
      url: '/products',
      dataType: 'json',
      success: function success(data) {
        dispatch(recieveProducts(data));
      },
      error: function error(xhr, status, err) {
        console.error(_this4.props.url, status, err.toString());
      }
    });
  };
}