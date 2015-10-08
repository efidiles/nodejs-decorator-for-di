'use strict';

let injector = require('./injector');

/**
 * [userService description]
 * @param  {[object]} dependencies Object containing function's dependecies.
 * @param  {[object]} user         Object containing user data.
 * @return {[object]}
 */
function userService(dependencies, user) {
  return {
    fullName: dependencies.fullNameFormatter(user)
  }
}

/**
 * Exports and extends the userService function with DI functionality.
 */
module.exports = injector(userService);
