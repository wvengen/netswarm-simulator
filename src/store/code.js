import debounce from 'throttle-debounce/debounce';
import Compiler from '../compiler';

const rootCompiler = new Compiler(); // there's one compiler for compiling the code
let   nodeCompilers = [];            // and each node has its own compiler runtime
let   timer = null;                  // timer handle for running program

const doCompile = debounce(1500, (code, callback) => {
  callback(rootCompiler.compile(code));
});

function updateCode(code) {
  return (dispatch, getState) => {
    dispatch({type: 'UPDATE_CODE', data: {code: code, error: null, compiled: false, started: false, running: false, messages: []}});
    doCompile(code, (error) => {
      if (!error) {
        dispatch({type: 'UPDATE_CODE', data: {compiled: true}});
        dispatch(setupNodes());
        dispatch(sync());
      } else {
        console.log(error);
        const msg = `Line ${error.line} column ${error.column}: ${error.message}`;
        dispatch({type: 'UPDATE_CODE', data: {error: msg, compiled: true}});
      }
    });
  };
}

function setupNodes() {
  return (dispatch, getState) => {
    const {settings: {nodeCount}, code: {code}} = getState();
    nodeCompilers = [];
    for (let nodeId = 0; nodeId < nodeCount; nodeId++) {
      const stdio = {
        write: s => { dispatch({type: `APPEND_MESSAGE`, data: {nodeId, message: s, timestamp: Date.now()}}); },
        drain: () => { },
      };
      const compiler = rootCompiler.clone({stdio});
      compiler.compile(code);
      compiler.setup();
      compiler.load('loop');
      nodeCompilers.push(compiler);
    }
    dispatch({type: 'UPDATE_CODE', data: {started: true}})
  };
}

// @todo move eeprom to function-based with dispatch
function sync() {
  const eeproms = [];
  nodeCompilers.forEach(compiler => {
    eeproms.push(compiler.eeprom);
  });
  return {type: 'UPDATE_CODE', data: {eeproms}};
}

function step() {
  nodeCompilers.forEach(compiler => {
    compiler.step() && compiler.load('loop');
  });
  return sync();
}

function start() {
  return (dispatch, getState) => {
    timer = setInterval(() => { dispatch(step()); }, getState().settings.loopTime);
    dispatch({type: 'UPDATE_CODE', data: {running: true}});
  };
}

function reset() {
  return (dispatch, getState) => {
    const {code: {code}} = getState();
    dispatch(stop());
    dispatch(updateCode(code));
  };
}

function stop() {
  return (dispatch, getState) => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      dispatch({type: 'UPDATE_CODE', data: {running: false}});
    }
  }
}

export const actions = {updateCode, step, start, stop, reset, sync};

const initialState = {
  code: 'void setup() {\n  Serial.println("Started.");\n}\n\nunsigned int i = 0;\nvoid loop() {\n  Serial.print("-> ");\n  Serial.println(++i);\n}',
  error: null,
  compiled: false,
  started: false,
  running: false,
  eeproms: [],
  messages: [],
};

export function reducer(state = initialState, action) {
  switch(action.type) {
  case 'UPDATE_CODE':
    return {...state, ...action.data};
  case 'APPEND_MESSAGE': // append chunk of text to messages
    return action.data.message.split('\n').reduce((s, line, i) => (
      reducer(s, {type: `APPEND_${i === 0 ? 'TO' : 'NEW' }_MESSAGE`, data: {...action.data, message: line}})
    ), state);
  case 'APPEND_NEW_MESSAGE': // add a new line to messages
    return {...state, messages: state.messages.concat(action.data)};
  case 'APPEND_TO_MESSAGE': // append text to an existing line in messages
    const lastIdx = state.messages.map(m => m.nodeId).lastIndexOf(action.data.nodeId);
    if (lastIdx >= 0) {
      // found existing message: append to last one
      const lastMsg = state.messages[lastIdx];
      const newLastMsg = {...lastMsg, message: lastMsg.message + action.data.message, timestamp: action.data.timestamp};
      const newMessages = state.messages.slice(0, lastIdx).concat([newLastMsg]).concat(state.messages.slice(lastIdx + 1));
      return {...state, messages: newMessages};
    } else {
      // no message found for this node: add new
      return reducer(state, {type: 'APPEND_NEW_MESSAGE', data: action.data});
    }
  default:
    return state;
  }
};
