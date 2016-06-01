// config/database.json
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    url: 'mongodb://heroku_mlv22k2d:8bji0m402c0h6vl4f79i0nq2m1@ds019123.mlab.com:19123/heroku_mlv22k2d' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
  };
} else {
  module.exports = {
    url: 'mongodb://localhost/lotalot' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
  };
}
