import {
    EVENT_UPLOAD_URL,EVENT_LIST_URL
} from 'constants/serviceUrl';
import {postFileRequest,getRequest,postRequest,} from "utils/request";


export function UpLoadEvent(params: any) {
    return postRequest(EVENT_UPLOAD_URL, params);
}

export function GetEventList(params: any) {
    return getRequest(EVENT_LIST_URL, params);
}
