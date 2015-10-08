#Simple DI pattern

The `injector.js` module is a very simple and straightforward dependency
injection pattern in NodeJS.

##How does it help?
Allows you to call a function without passing a dependencies object but only
the actual required parameters:
```js
doSomething('someParameterValue', 'aSecondParameterValue');
```

At the same time the function receives a `dependencies` object as the first
parameter of the function's declaration:

```js
function doSomething(dependencies, parameter1, parameter2) {
  /**
   * do something with dependencies.someDependency, parameter1 and
   * parameter2 then return
   */
}
```
Dependencies are added using:
```js
doSomething.injectDependencies(objectWithDependencies);
```
**NOTE: The `injectDependencies` method is called directly on the function.
`doSomething` is a function (functions are objects in Javascript).**

##Practical use case:

Create a new module using the following pattern:

**do-something.js**

```js
/**
 * Require the injector module.
 */
let injector = require('./injector');

/**
 * Declare a function and receive a dependencies object
 * in the first parameter.
 */
function doSomething(dependencies, parameter1, parameter2) {
  /**
   * do something with dependencies.someDependency, parameter1 and
   * parameter2 then return
   */
}

/**
 * Pass the function to the injector and export the result.
 * The result is a function reference.
 */
module.exports = injector(doSomething);
```

then in some other file:

```js
/**
 * require the module we just created above
 */
let doSomething = require('./do-something');

/**
 * inject the dependencies
 */
doSomething.injectDependencies({
  someDependency: new SomeDependency()
});

/**
 * call the exported function
 */
let result = doSomething('someParameterValue', 'aSecondParameterValue');
```

The pattern relies on the fact that functions are objects in Javascript.
The injector module decorates a function instance with methods for injecting
and clearing dependencies.

##API

###injectDependencies(obj)
Injects a list of dependencies. It will override any existing dependencies with
the same name.

**Arguments**
- `obj` - object with dependencies.
  Eg: {nameOfDependency: dependencyInstance}

###clearDependencies()
Clears all dependencies.

- - -

licensed under [The MIT License](http://www.opensource.org/licenses/mit-license.php).
