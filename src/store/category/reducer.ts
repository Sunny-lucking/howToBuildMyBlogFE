import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import {CATEGORY_GET} from "./action";
import {Action,CategoryStore} from 'store'

const categoryState :CategoryStore= {
	category_list: []
};

const categoryReducer = handleActions(
	{
		[CATEGORY_GET](state, {payload}: Action) {
			return update(state, {
				category_list: {
					$set: payload
				}
			})
		}
	},
	categoryState
);

export default categoryReducer;
