import {
    COMMENT_ADD_URL,COMMENT_GET_URL,RECALL_ADD_URL,COMMENT_DELETE_URL
} from 'constants/serviceUrl';
import {postFileRequest,getRequest,postRequest} from "utils/request";



export function AddComment(params: any) {
    return postRequest(COMMENT_ADD_URL, params);
}
export function DeleteComment(params: any) {
    return postRequest(COMMENT_DELETE_URL, params);
}
export function GetComment(params: any) {
    return postRequest(COMMENT_GET_URL, params);
}

export function AddRecall(params: any) {
    return postRequest(RECALL_ADD_URL, params);
}