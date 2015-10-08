'use strict';

let userService = require('./user-service');
let userData = {
  firstName: 'John',
  lastName: 'Smith',
  title: 'Mr'
};

/**
 * This is a dependecy which will be injected into the userService module.
 * @param  {[object]} user User's data.
 * @return {[string]}      Returns the full name of a user without the
 *                         person's title.
 */
function getFullNameExcludingTitleDependency(user) {
  return `${user.firstName} ${user.lastName}`;
}

/**
 * Injects the dependency into the userService module under the
 * fullNameFormatter name.
 */
userService.injectDependencies({
  fullNameFormatter: getFullNameExcludingTitleDependency
});

/**
 * outputs: John Smith
 */
console.log(userService(userData).fullName);

/**
 * This is a dependecy which will be injected into the userService module.
 * @param  {[object]} user User's data.
 * @return {[string]}      Returns the full name of a user including the
 *                         person's title.
 */
function getFullNameIncludingTitleDependency(user) {
  return `${user.title}. ${user.firstName} ${user.lastName}`;
}

/**
 * Overrides the fullNameFormatter dependency.
 */
userService.injectDependencies({
  fullNameFormatter: getFullNameIncludingTitleDependency
});

/**
 * outputs: Mr. John Smith
 */
console.log(userService(userData).fullName);
