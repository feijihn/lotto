import $ from 'jquery';

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
