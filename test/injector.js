'use strict';

let expect = require('chai').expect;
let injector = require('../injector');

describe('injector decorator', function() {
  it('should throw an error if no dependencies are injected', function() {
    function someFunction() {}
    let functionWithDI = injector(someFunction);

    expect(functionWithDI).to.throw(
      /Dependencies not set/
    );
  });

  it("should override a dependency if it's already injected", function() {
      function oldDependency() {
        return 'oldDependency';
      }
      function newDependency() {
        return 'newDependency';
      }
      function someFunctionToDecorate(dependencies) {
        return dependencies.someDependency();
      }
      let functionWithDI = injector(someFunctionToDecorate);

      functionWithDI.injectDependencies({
        someDependency: oldDependency
      })
      expect(functionWithDI()).to.equal('oldDependency');

      functionWithDI.injectDependencies({
        someDependency: newDependency
      })
      expect(functionWithDI()).to.equal('newDependency');
  });

  it('should be able to clear all dependencies', function() {
    function someFunction() {}
    let functionWithDI = injector(someFunction);
    functionWithDI.injectDependencies({
      someDependency: 'success'
    });
    expect(functionWithDI).to.not.throw(
      /Dependencies not set/
    );
    functionWithDI.clearDependencies();
    expect(functionWithDI).to.throw(
      /Dependencies not set/
    );
  });
});
