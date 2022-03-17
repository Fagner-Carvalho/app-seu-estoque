/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  applyMiddleware,
  createStore,
  compose,
  Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router/immutable';

import history from 'src/routes/history';

import createRootReducer from 'src/store/rootReducer';
import { RootState } from 'src/store/rootState';

let store: Store<RootState>;

export const sagaMiddleware = createSagaMiddleware();
export const rootReducer = createRootReducer(history);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default function configureStore(preloadedState?: any): Store {
  const composeEnhancer: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  store = createStore<any, any, any, any>(
    rootReducer,
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
      ),
    ),
  );

  return store;
}
