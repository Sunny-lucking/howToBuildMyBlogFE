import "./style.less"
import { CancelPraiseArticle, PraiseArticle, CancelFavoriteArticle, FavoriteArticle } from "service/article"
import { message, notification } from "antd"
import { useSelector } from "react-redux"
import StateStore from "store"
import {useHistory} from "react-router-dom"
interface Suspended {
    article: any,
    onReLoadArticleList: () => {}
}

function Suspended(props: Suspended) {
    const user = useSelector((state: StateStore) => state.userStore.user)
    const history = useHistory()
    return (
        <div className="article-suspended-panel article-suspended-panel">
            <div
                data-badge={props.article?.praiseList?.length + ''}
                className={["like-btn panel-btn like-adjust with-badge", props?.article?.praiseList?.includes(user?._id) ? "active" : ''].join(" ")}
                onClick={props?.article?.praiseList?.includes(user?._id) ? () => cancelPraiseArticle(props?.article?._id) : () => praiseArticle(props?.article?._id)}></div>
            <div
                className="comment-btn panel-btn comment-adjust with-badge"
                data-badge={props?.article?.commentCount + ''}></div>
            <div
                className={["collect-btn panel-btn", props?.article?.favoriteList?.includes(user?._id)?"active":""].join(' ')}
                
                onClick={ props?.article?.favoriteList?.includes(user?._id)?() => { cancelFavoriteArticle(props.article._id) }:() => { favoriteArticle(props.article._id) }}></div>
            <div className="report-btn share-btn panel-btn"></div>
            <div className="share-title">分享</div>
            <div className="weibo-btn share-btn panel-btn" onClick={()=>{shareToMicroblog(props.article)}}></div>
            <div className="qq-btn share-btn panel-btn" onClick={()=>{shareToQQ(props.article)}}></div>
            <div className="wechat-btn share-btn panel-btn">
                <img src="/wxcode.svg" alt="" className="wechat-qr-code-img shadow" />
            </div>
        </div>
    )
    // 取消收藏文章
    async function cancelFavoriteArticle(articleId: string) {
        const result: any = await CancelFavoriteArticle({ articleId })
        if (result.data.code === 0) {
            message.success(result.data.msg)
            props.onReLoadArticleList()
        } else {
            notification.open({
                message: result.data.msg,
            });
        }
    }
    // 收藏文章
    async function favoriteArticle(articleId: string) {
        const result: any = await FavoriteArticle({ articleId })
        if (result.data.code === 0) {
            message.success(result.data.msg)
            props.onReLoadArticleList()
        } else {
            notification.open({
                message: result.data.msg,
            });
        }
    }

    // 点赞文章
    async function praiseArticle(_id: string) {
        const result: any = await PraiseArticle({ _id })
        if (result.data.code === 0) {
            message.success(result.data.msg)
            props.onReLoadArticleList()
        } else {
            notification.open({
                message: result.data.msg,
            });
        }
    }
    // 取消点赞
    async function cancelPraiseArticle(_id: string) {
        const result: any = await CancelPraiseArticle({ _id })
        if (result.data.code === 0) {
            message.success(result.data.msg)
            props.onReLoadArticleList()
        } else {
            notification.open({
                message: result.data.msg,
            });
        }
    }

    // 分享到微博
    function shareToMicroblog(article:any) {
        //自定义内容
        const share = {
            title: article.title,
            image_url: ["https://avatars.githubusercontent.com/u/44115602?v=4"],
            share_url: history.location.pathname +history.location.search
        };
        //跳转地址
        window.location.href = (
            "https://service.weibo.com/share/share.php?url=" +
            encodeURIComponent(share.share_url) +
            "&title=" +
            share.title +
            "&pic=" +
            share.image_url +
            "&searchPic=true"
        );
    }
    //分享到QQ好友(PC端可用)
    function shareToQQ(article:any) {
        //此处分享链接内无法携带图片
        const share = {
            title: article.title,
            desc: article.content.slice(100),
            share_url:  history.location.pathname +history.location.search
        };
        window.location.href = (
            "https://connect.qq.com/widget/shareqq/index.html?url=" +
            encodeURIComponent(share.share_url) +
            "&title=" +
            share.title +
            "&desc=" +
            share.desc
        );
    }
}
export default Suspended