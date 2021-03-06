import {
    PIN_ADD_URL,PIN_LIST_URL,PIN_DELETE_URL,PIN_PRAISE_URL,PIN_CANCEL_PRAISE_URL,
} from 'constants/serviceUrl';
import {postRequest} from "utils/request";


export function DeletePin(params: any) {
    return postRequest(PIN_DELETE_URL, params);
}
export function AddPin(params: any) {
    return postRequest(PIN_ADD_URL, params);
}
export function PraisePin(params: any) {
    return postRequest(PIN_PRAISE_URL, params);
}
export function CancelPraisePin(params: any) {
    return postRequest(PIN_CANCEL_PRAISE_URL, params);
}
export function GetPin(params: any) {
    return postRequest(PIN_LIST_URL, params);
}

// export function AddRecall(params: any) {
//     return postRequest(RECALL_ADD_URL, params);
// }