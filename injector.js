'use strict';

module.exports = function(functionToDecorate) {
  let _dependencies = {};

  function decorator() {
    if (!Object.keys(_dependencies).length) {
      throw new Error('Dependencies not set.');
    }
    var currentArgs = Array.prototype.slice.call(arguments);
    var argumentsForDecoratedFunction = [_dependencies].concat(currentArgs);
    /**
     * When invoked, call the wrapped function with the dependencies object
     * prepended in the list of arguments.
     */
    return functionToDecorate.apply(null, argumentsForDecoratedFunction);
  }

  decorator.injectDependencies = function(dependencies) {
    Object.assign(_dependencies, dependencies);
  };

  decorator.clearDependencies = function() {
    _dependencies = {};
  };

  return decorator;
};
