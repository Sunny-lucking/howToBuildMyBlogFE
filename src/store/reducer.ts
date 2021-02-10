import { combineReducers } from 'redux';
import userReducer from 'store/user/reducer';
import categoryReducer from "store/category/reducer"
const createRootReducer = combineReducers({
  userStore: userReducer,
  categoryStore: categoryReducer,
});

export default createRootReducer;
