import { createStore } from 'redux';
import rootReducer from './reducers/index';

let storeCach = {};
let dev = process.env.NODE_ENV !== "production";

/*
 *   创建store
 */
export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        // 触发 redux-devtools
        // eslint-disable-next-line no-undef
      window.__REDUX_DEVTOOLS_EXTENSION__ && dev ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
    );
    storeCach = store;
    return store;
}

export function getStore() {
    return storeCach;
}