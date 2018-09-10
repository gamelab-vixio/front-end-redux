import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';

// To enable history mode
export const history = createHistory();

// Initialize state, enhancers, and middleware
const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

// Show Redux store at React Devtools for Chrome
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

// Combine enhancers and middleware previously defined
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

// Create the store based on information above!
export default createStore(rootReducer, initialState, composedEnhancers);
