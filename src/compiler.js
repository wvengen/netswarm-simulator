import CRuntime from 'JSCPP/lib/rt';
import Interpreter from 'JSCPP/lib/interpreter';
import ast from 'JSCPP/lib/ast';
import preprocessor from 'JSCPP/lib/preprocessor';
import PEGUtil from 'pegjs-util';

import includes from './includes/index';

// https://github.com/felixhao28/JSCPP/blob/master/src/launcher.coffee

const config = {
  includes: includes,
  stdio: {
    write: s => {},
    drain: () => {},
  },
};

class Compiler {
  constructor({stdio, eeprom} = {}) {
    this.eeprom = eeprom || [];
    this.rt = new CRuntime({...config, stdio: stdio || config.stdio, eeprom: this.eeprom});
    this.rt.include('default');
    this._code = null;
    this._gen = null;
    this._step = null;
  }

  // return new instance with its own runtime
  // @todo don't require code for this (mostly getting includes into rt)
  clone(...args) {
    const c = new Compiler(...args);
    c._code = this._code;
    preprocessor.parse(c.rt, c._code.toString()); // make sure includes are in rt
    c.ast = this.ast;
    return c;
  }

  compile(code) {
    const ppCode = preprocessor.parse(this.rt, code.toString());
    const result = PEGUtil.parse(ast, ppCode);
    if (!result.error) {
      this._code = code; // keep copy for clone()
      this.ast = result.ast;
      return null;
    } else {
      this.ast = null;
      return result.error; //PEGUtil.errorMessage(result.error, true);
    }
  }

  // compile code and `setup()` function, and prepare for `loop()`
  setup() {
    // first load and parse the ast
    const interpreter = new Interpreter(this.rt);
    this._gen = interpreter.run(this.ast);
    this.run();
    // then run the `setup()`` function
    this.load('setup');
    this.run();
  }

  load(fun) {
    this._gen = this.rt.getFunc('global', fun, [])(this.rt, null, []);
  }

  // execute a step, returns `true` when function is done
  step() {
    this._step = this._gen.next();
    return this._step.done;
  }

  // return value if `step()` returned `true`
  result() {
    return this._step.value && this._step.value.v;
  }

  run() {
    while (!this.step()) {}
    return this.result();
  }
}

export default Compiler;
