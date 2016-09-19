
function update(settings) {
  return {type: 'UPDATE_SETTINGS', data: settings};
}

export const actions = {update};

const initialState = {
  nodeCount: 2,  // number of nodes
  loopTime: 50,  // a statement is run every this many ms when started
};

export function reducer(state = initialState, action) {
  switch(action.type) {
  case 'UPDATE_SETTINGS':
    // make sure loopTime doesn't get zero, or the browser may hang
    return {...state, ...action.data, loopTime: Math.max(1, action.data.loopTime || state.loopTime)};
  default:
    return state;
  }
};
