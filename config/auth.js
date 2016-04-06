// config/auth.js
// expose our config directly to our application using module.exports
var ip = 'localhost';
var port = 3000;
module.exports = {
  facebookAuth: {
    clientID: '1145158655497308', // your App ID
    clientSecret: '4cb769c8572857ba175aec1c9a5da13e', // your App Secret
    callbackURL: 'http://' + ip + ':' + port + '/auth/facebook/callback'
  },

  vkAuth: {
    appID: '5371811',
    clientSecret: 'gZTSLJqKwAV8uWeMwRx5',
    callbackURL: 'http://' + ip + ':' + port + '/auth/vkontakte/callback'
  }
};
