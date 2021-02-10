import {
    CATEGORY_LIST_URL
} from 'constants/serviceUrl';
import {postRequest,getRequest} from "utils/request";



export function GetCategoryList(params?: any) {
    return getRequest(CATEGORY_LIST_URL, params);
}
