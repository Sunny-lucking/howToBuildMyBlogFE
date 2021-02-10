import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import {USER_LOGIN} from "./action";
import {Action,UserStore} from 'store'

const userState :UserStore= {
	user: {}
};

const userReducer = handleActions(
	{
		[USER_LOGIN](state, {payload}: Action) {
			return update(state, {
				user: {
					$set: payload
				}
			})
		}
	},
	userState
);

export default userReducer;
