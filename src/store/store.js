import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {reducer as settings} from './settings';
import {reducer as code} from './code';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({settings, code});
const store = createStoreWithMiddleware(reducer);

export default store;
