import {
    USER_LOGIN_URL,USER_REGISTER_URL,USER_TOKEN_URL,AUTHOR_INFO_URL,AUTHOR_LIST_URL,AUTHOR_FOLLOW_URL,AUTHOR_UNFOLLOW_URL,FANS_LIST_URL,FOLLOWERS_LIST_URL
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
export function GetAuthorInfo(params: any) {
    return postRequest(AUTHOR_INFO_URL, params);
}
export function GetAuthorList(params: any) {
    return postRequest(AUTHOR_LIST_URL, params);
}
export function GetFansList(params: any) {
    return postRequest(FANS_LIST_URL, params);
}
export function GetFollowersList(params: any) {
    return postRequest(FOLLOWERS_LIST_URL, params);
}
export function FollowAuthor(params: any) {
    return postRequest(AUTHOR_FOLLOW_URL, params);
}

export function UnFollowAuthor(params: any) {
    return postRequest(AUTHOR_UNFOLLOW_URL, params);
}

export function test(){
    return getRequest("/api/admin/current",{admin:{name:"111"}})
}
