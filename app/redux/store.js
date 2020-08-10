import { createStore, applyMiddleware  } from 'redux';
import createSagaMiddleware from 'redux-saga';
import initialize from './saga';
import rootReducer from './reducers/index';

let storeCach = {};
let dev = process.env.NODE_ENV !== "production";

/*
 *   创建store
 */
export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(rootReducer,
        // 触发 redux-devtools
        // eslint-disable-next-line no-undef
      window.__REDUX_DEVTOOLS_EXTENSION__ && dev ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined,
      applyMiddleware(sagaMiddleware)
    );
    storeCach = store;
    sagaMiddleware.run(initialize);
    return store;
}

export function getStore() {
    return storeCach;
}
