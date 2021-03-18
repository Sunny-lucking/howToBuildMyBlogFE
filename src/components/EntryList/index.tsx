import ListHeader from "./ListHeader"
import EntryListWrap from "./EntryListWrap"
import "./style.less"
import { useEffect, useState } from "react"
import { throttle } from "constants/utils"
import { GetArticleList } from "service/article"
import { useSetState } from "ahooks"
import { ArticleVO } from "models"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import StateStore from "store"
import queryString from "query-string"
import { notification } from "antd"
interface ArticleState {
    articleList: any,
    pageNum: number,
    pageSize: number,
    cateId: string,
    tagId: string
}
function EntryList(props: any) {
    const history = useHistory()
    const BASE_URL = '/juejin/home/'
    let categoryList: any = useSelector((state: StateStore) => state.categoryStore.category_list)
    let user: any = useSelector((state: StateStore) => state.userStore.user)
    const [articleState, setArticleState] = useSetState<ArticleState>({
        articleList: undefined,
        pageNum: 1,
        pageSize: 2,
        cateId: '',
        tagId: '',
    })


    let getMoreLatestThrottle = throttle(getLatestArticle);


    //  目前去除前綴的url
    const currentUrl = history.location.pathname.replace(BASE_URL, '')
    const { sortType } = queryString.parse(history.location.search)
    // 监听到url变化了，就发起请求，此时的请求一般会带上cateId和tagId 。也要支持带上sort
    useEffect(() => {
        setArticleList()
    }, [currentUrl,sortType])

    useEffect(() => {
        function getMoreListListener() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
                getMoreLatestThrottle();
            }
        }
        window.addEventListener('scroll', getMoreListListener)
        return function () {
            window.removeEventListener('scroll', getMoreListListener)
        }
    })
    return (
        <div className="entry-list-container">
            {
                props.isShowListHeader &&
                <ListHeader />
            }
            <EntryListWrap articleList={articleState.articleList} onArticleListChange={onArticleListChange}/>
        </div>
    )

    function setArticleList(){
        if (categoryList) {
            let [category_url, tagName] = currentUrl.split('/')

            let currentcate: any = ''  // 当前的cate对象
            let cateId // 当前的cateId
            let tagId = ''

            if (category_url && !["recommend", "following"].includes(category_url)) {  // 如果category_url存在，则应该获取cateID和cate对象,并且不属于推荐或following
                currentcate = categoryList?.find((item: any) => {
                    console.log(item);
                    return item.category_url === category_url
                })
                cateId = currentcate?._id
            } else if (category_url && ["recommend", "following"].includes(category_url)) { // 如果category_url存在，则应该获取cateID和cate对象,并且属于推荐或following
                cateId = category_url
            }

            if (currentcate && tagName) {  // 如果有tagName, 则应该要获取tagId
                tagId = currentcate?.tags.find((item: any) => {
                    return item.label === tagName
                })._id
            }

            let params = {
                pageNum: 1,
                ...cateId ? { cateId } : {},
                ...tagId ? { tagId } : {},
                ...sortType? {sortType}:{}
            }
            getMoreLatestThrottle(params)
        }
    }

    function onArticleListChange(){
        getMoreLatestThrottle({
            pageNum:1,
            pageSize:(articleState.pageNum-1) *articleState.pageSize,
        })
    }
    async function getLatestArticle(config?: any) {
        // setArticleState({
        //     articleList : undefined 
        // })
        let params = {
            pageNum: articleState.pageNum,
            pageSize: articleState.pageSize,
            ...config
        }
        let result: any = ''
        if (params.cateId === "recommend") {// 当是点击推荐的时候，则是获取所有文章，即不传cateID
            delete params.cateId
            result = await GetArticleList(params)
        } else if (params.cateId === "following") {// 当是点击关注的时候，则是获取关注者的文章，即不传cateID
            params.followers = user.followers
            result = await GetArticleList(params)
        } else {
            result = await GetArticleList(params)
        }
        if (result.data.code === 0) {
            setArticleState({
                pageNum: articleState.pageNum + 1,
                articleList: config?.pageNum === 1 ? [].concat(result.data.articleList) : articleState.articleList?.concat(result.data.articleList)
            })
        }else {
            
            notification.open({message:result.data.msg})
        }
    }



}
export default EntryList

