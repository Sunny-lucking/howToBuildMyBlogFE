import {
    BOOK_UPLOAD_URL,BOOK_LIST_URL
} from 'constants/serviceUrl';
import {postFileRequest,getRequest,postRequest,} from "utils/request";


export function UpLoadBook(params: any) {
    return postRequest(BOOK_UPLOAD_URL, params);
}

export function GetBookList(params: any) {
    return getRequest(BOOK_LIST_URL, params);
}
