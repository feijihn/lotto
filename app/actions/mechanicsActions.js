import $ from 'jquery';


export function checkRound(roundId) {
  return function(dispatch) {
    dispatch(dateChecking());
    $.ajax({
      url: '/checkround',
      dataType: 'json',
      method: 'post',
      data: {roundId: roundId},
      success: data => {
        switch (data.status) {
          case 'OK':
            dispatch(roundChecked(data.info[1]));
          case 'NOTFINISHED':
            dispatch(roundNotFinished());
        }
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  } 
}

export function checkDate(date) {
  return function(dispatch) {
    dispatch(dateChecking());
    $.ajax({
      url: '/checkdate',
      dataType: 'json',
      method: 'post',
      data: {date: date},
      success: data => {
        dispatch(dateChecked(data[1]));
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  } 
}

export function roundChecking() {
  return {
    type: 'ROUND_CHECKING'
  }
}

export function roundNotFinished() {
  return {
    type: 'ROUND_NOT_FINISHED'
  }
}

export function roundChecked(data) {
  return {
    type: 'ROUND_CHECKED',
    data: data
  }
}

export function dateChecking() {
  return {
    type: 'DATE_CHECKING'
  }
}

export function dateChecked(data) {
  return {
    type: 'DATE_CHECKED',
    data: data
  }
}

export function transactionsExpandToggle(flag) {
  return {
    type: 'TRANSACTIONS_EXPAND_TOGGLE',
    flag: flag
  }
}
