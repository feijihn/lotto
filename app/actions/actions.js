'use strict';
import {FETCH_USERINFO} from './actionTypes.js';
import $ from 'jquery';

function recieveUserInfo(data) {
  return {
    type: 'RECIEVE_USERINFO',
    userinfo: data
  }
}

export function fetchUserInfo() {
  return function(dispatch) {
      console.log('requesting...')
    return(
      $.ajax({
        url: '/userinfo',
        dataType: 'json',
        success: data => {
          console.log(data);
          dispatch(recieveUserInfo(data))
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    )
  }
}

