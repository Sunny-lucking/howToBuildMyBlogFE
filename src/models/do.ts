export interface ArticleVO {
    title: string,
    content: string,
    category: string,
    tag: string,
    user_id: string,
    user_name: string,
    create_time: string,
    _id: string,
    praiseList:[],
    commentCount:number,
}