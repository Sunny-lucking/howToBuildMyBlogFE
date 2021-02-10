import { createStore ,compose} from 'redux';
import createRootReducer from 'store/reducer';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  createRootReducer,composeEnhancers()
);

// We run the root sagas automatically

// if (process.env.RUN_ENV !== 'production') {
//   window.__STORE__ = store;
// }

export default store;
