import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';
import rootReducer from '../reducers/rootReducer';

const config = {};

const middleware = [thunk, createStateSyncMiddleware(config)];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

initStateWithPrevTab(store);

export default store;