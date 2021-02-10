import {createAction} from 'redux-actions';

export const USER_LOGIN = 'user/login'

// reducer
export const userLoginAction = createAction(USER_LOGIN)
