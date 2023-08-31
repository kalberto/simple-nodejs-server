const {AppController} = require('./Controllers/AppController');
const {UserController} = require('./Controllers/UserController');

const routes = {
  'GET': {
      '/': AppController.index,
      '/users': UserController.listUsers,
  },
  'POST': {
      '/create-user': UserController.createUser,
  }
};

module.exports = {
    routes: routes
};