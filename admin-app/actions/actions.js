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

function submittingProduct() {
  return {
    type: 'PRODUCT_SUBMITTING'
  }
}

function submittedProduct(product) {
  return {
    type: 'PRODUCT_SUBMITTED',
    product: product
  } 
}

function submittingContent() {
  return {
    type: 'CONTENT_SUBMITTING'
  }
}

function submittedContent() {
  return {
    type: 'CONTENT_SUBMITTED'
  } 
}

function removedProduct(data) {
  return {
    type: 'PRODUCT_REMOVED',
    products: data
  } 
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

export function removeProduct(productId) {
  return function(dispatch) {
    dispatch(submittingProduct());
    return (
      $.ajax({
        url: '/removeproduct',
        method: 'post',
        data: {productId: productId},
        success: data => {
          dispatch(removedProduct(data));
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    );
  };
}

export function submitProduct(formData) {
  return function(dispatch) {
    dispatch(submittingProduct());
    return (
      $.ajax({
        url: '/submitproduct',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: data => {
          dispatch(submittedProduct(data));
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    );
  };
}

export function editProduct(formData) {
  return function(dispatch) {
    dispatch(submittingProduct());
    return (
      $.ajax({
        url: '/editproduct',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: data => {
          dispatch(submittedProduct(data));
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    );
  };
}

export function submitContent(formData) {
  console.log(formData);
  return function(dispatch) {
    dispatch(submittingContent());
    return (
      $.ajax({
        url: '/submitcontent',
        method: 'post',
        data: formData,
        success: data => {
          dispatch(submittedContent(data));
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
