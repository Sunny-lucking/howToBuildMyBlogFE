import "./style.less"
import EntryListWrap from "components/EntryList/EntryListWrap"
import { useEffect,useState } from "react"
import { throttle } from "constants/utils"
import { GetArticleList } from "service/article"
import {GetAuthorInfo} from "service/user"
import { useSetState } from "ahooks"
import {ArticleVO} from "models"
import { Empty, Skeleton ,notification} from "antd"
interface PostsProps {
    userId: string,
    match:any,
}
interface ArticleState {
    articleList: ArticleVO[],
    pageNum: number,
    pageSize: number,
}
function Posts(props: PostsProps) {

    const userId  = props.match.params.id
    const [articleState, setArticleState] = useState<ArticleState>({
        articleList: [],
        pageNum: 1,
        pageSize: 2,
    })


    let getMoreLatestThrottle = getLatestArticle;
    // 进入，先第一次获取列表数据
    useEffect(()=>{
        getMoreLatestThrottle()
    },[])
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
        return function(){
            window.removeEventListener('scroll', getMoreListListener)
        }
    })
    return (

        <div className="post-list-box">
            <div className="sub-header">
                <div className="sub-header-title">文章</div>
                <div className="sub-type-box">
                    <a href="/user/1204720476893064/posts?sort=popular" className="sub-type">热门</a>
                    <a href="/user/1204720476893064/posts?sort=newest" className="sub-type active">最新</a>
                </div>
            </div>
            <EntryListWrap articleList={articleState.articleList}/>
        
               
        </div>

    )


    async function getLatestArticle() {
        const  {data:{user}}:any = await GetAuthorInfo({_id:userId})
        let result: any = await GetArticleList({ pageNum: articleState.pageNum,pageSize:articleState.pageSize ,favorites:user?.favorites||[],})
        if (result.data.code === 0) {
            setArticleState((preState:ArticleState)=>{
                return {
                    ...preState,
                    pageNum:preState.pageNum+1,
                    articleList: preState.articleList.concat(result.data.articleList)
                }
            })
        }else{
            notification.open({
                message: result.data.msg,
            });
        }
        
    }
}

export default Posts

