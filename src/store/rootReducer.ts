import { History } from 'history';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
} as any);

export default rootReducer;
