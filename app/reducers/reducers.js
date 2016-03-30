const initialState = {
  userinfo: {
    local: {
      username: ' '
    },
    facebook: {

    },
    vk: {

    }
  }
};

function App(state = initialState, action) {
  switch (action.type) {
    case 'RECIEVE_USERINFO':
      return Object.assign({}, state, {
        userinfo: action.userinfo
      })
    default:
      return state;
  }
}

export default App;
