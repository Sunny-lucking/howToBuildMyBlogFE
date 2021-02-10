import {
    USER_LOGIN_URL,USER_REGISTER_URL,USER_TOKEN_URL
} from 'constants/serviceUrl';
import {postRequest,getRequest} from "utils/request";
import {LoginParam} from "models"

export function UserLogin(params?: LoginParam) {
    return postRequest(USER_LOGIN_URL, params);
}

export function GetUserToken(params: any) {
    return postRequest(USER_TOKEN_URL, params);
}
export function UserRegister(params: LoginParam) {
    return postRequest(USER_REGISTER_URL, params);
}
export function test(){
    return getRequest("/api/admin/current",{admin:{name:"111"}})
}