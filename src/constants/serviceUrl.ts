const SERVICE_URL = '/api';
// const MOCK_URL = '/mockApi';

export const BASE_URL = SERVICE_URL + '';

// user
export const USER_TOKEN_URL = `${BASE_URL}/user/getToken`
export const USER_LOGIN_URL = `${BASE_URL}/user/login`;
export const USER_REGISTER_URL = `${BASE_URL}/user/signup`;
export const AUTHOR_INFO_URL = `${BASE_URL}/user/getAuthor`
export const AUTHOR_LIST_URL = `${BASE_URL}/user/getAllAuthor`
export const AUTHOR_FOLLOW_URL = `${BASE_URL}/user/follow`
export const AUTHOR_UNFOLLOW_URL = `${BASE_URL}/user/unfollow`
export const FANS_LIST_URL = `${BASE_URL}/user/getFans`
export const FOLLOWERS_LIST_URL = `${BASE_URL}/user/getFollowers`

// book
export const BOOK_UPLOAD_URL = `${BASE_URL}/book/upload`
export const BOOK_LIST_URL = `${BASE_URL}/book/list`

// event
export const EVENT_UPLOAD_URL = `${BASE_URL}/event/upload`
export const EVENT_LIST_URL = `${BASE_URL}/event/list`

// article
export const IMAGE_UPLOAD_URL = `${BASE_URL}/article/addMarkDownImg`
export const ARTICLE_ADD_URL = `${BASE_URL}/article/add`
export const ARTICLE_EDIT_URL = `${BASE_URL}/article/edit`
export const ARTICLE_LIST_URL = `${BASE_URL}/article/list`
export const ARTICLE_DETAIL_URL = `${BASE_URL}/article/detail`
export const ARTICLE_PRAISE_URL = `${BASE_URL}/article/praise`
export const ARTICLE_CANCEL_PRAISE_URL = `${BASE_URL}/article/cancelPraise`
export const ARTICLE_FAVORITE_URL = `${BASE_URL}/article/favorite`
export const ARTICLE_CANCEL_FAVORITE_URL = `${BASE_URL}/article/unfavorite`
export const ARTICLE_DELETE_URL = `${BASE_URL}/article/delete`
// category
export const CATEGORY_LIST_URL = `${BASE_URL}/tag/list`

// comment
export const COMMENT_ADD_URL = `${BASE_URL}/comment/addComment`
export const COMMENT_GET_URL = `${BASE_URL}/comment/getComment`
export const COMMENT_DELETE_URL = `${BASE_URL}/comment/deleteComment`
export const RECALL_ADD_URL = `${BASE_URL}/comment/addRecall`

// pin
export const PIN_ADD_URL = `${BASE_URL}/pin/addPin`
export const PIN_LIST_URL = `${BASE_URL}/pin/getPin`
export const PIN_DELETE_URL = `${BASE_URL}/pin/deletePin`
export const PIN_PRAISE_URL = `${BASE_URL}/pin/praise`
export const PIN_CANCEL_PRAISE_URL = `${BASE_URL}/pin/cancelPraise`
