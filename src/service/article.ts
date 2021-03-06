import {
    IMAGE_UPLOAD_URL,ARTICLE_ADD_URL,ARTICLE_LIST_URL,ARTICLE_DETAIL_URL,ARTICLE_CANCEL_PRAISE_URL,ARTICLE_PRAISE_URL,ARTICLE_FAVORITE_URL,ARTICLE_CANCEL_FAVORITE_URL,ARTICLE_DELETE_URL,ARTICLE_EDIT_URL
} from 'constants/serviceUrl';
import {postFileRequest,getRequest,postRequest,} from "utils/request";

export function UploadImage(params?: any) {
    return postFileRequest(IMAGE_UPLOAD_URL, params);
}

export function AddArticle(params: any) {
    return postRequest(ARTICLE_ADD_URL, params);
}
export function EditArticle(params: any) {
    return postRequest(ARTICLE_EDIT_URL, params);
}
export function DeleteArticle(params: any) {
    return postRequest(ARTICLE_DELETE_URL, params);
}
export function FavoriteArticle(params: any) {
    return postRequest(ARTICLE_FAVORITE_URL, params);
}
export function CancelFavoriteArticle(params: any) {
    return postRequest(ARTICLE_CANCEL_FAVORITE_URL, params);
}

export function PraiseArticle(params: any) {
    return postRequest(ARTICLE_PRAISE_URL, params);
}
export function CancelPraiseArticle(params: any) {
    return postRequest(ARTICLE_CANCEL_PRAISE_URL, params);
}

export function GetArticleList(params: any) {
    return getRequest(ARTICLE_LIST_URL, params);
}
export function GetArticleDetail(params: any) {
    return getRequest(ARTICLE_DETAIL_URL, params);
}
