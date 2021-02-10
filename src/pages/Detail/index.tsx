import "./style.less"
import ReactMarkdown from "./ReactMarkdown"
import SideBar from './SideBar'
import Suspended from "./Suspended"
import Comment from "components/Comment"
import EntryList from "components/EntryList"
import { GetArticleDetail } from "service/article"
import { GetAuthorInfo } from "service/user"
import { AddComment, GetComment } from "service/comment"
import queryString from "query-string"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSetState, useClickAway } from "ahooks"
import moment from "moment"
import { getTagNameFromCategoryList } from "constants/utils"
import StateStore from "store"
import { useSelector } from "react-redux"
interface State {
    article: any,
    authorInfo: any,
}
function Detail() {
    let history = useHistory()
    let categoryList = useSelector((state: StateStore) => state.categoryStore.category_list)
    const [state, setState] = useSetState<State>({
        article: {

        },
        authorInfo: {

        },
    })
    useEffect(() => {
        setArticleDetail()
    }, [])
    useEffect(() => {
        setAuthorInfo(article?.user_id)
    }, [state.article?.user_id])
    const { article, authorInfo } = state
    return (
        <div className="view column-view">
            <div className="main-area article-area shadow">
                <article className="article">
                    <div className="author-info-block">
                        <a href="/user/2664871913078168" target="_blank" rel="" className="avatar-link">
                            <img src={authorInfo?.avatar_url} className="lazy avatar avatar" alt="12" />
                        </a>
                        <div className="author-info-box">
                            <div className="author-name">
                                <div className="username username ellipsis">
                                    <span className="name" style={{ maxWidth: `calc(100% - 50px)` }}>
                                        {authorInfo?.git_name}
                                    </span>
                                    <a href="/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022" target="_blank" rel="" className="rank">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDIzIDE0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iIzU5OURGRiIgZD0iTTMgMWgxN2EyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMkgzYTIgMiAwIDAgMS0yLTJWM2EyIDIgMCAwIDEgMi0yeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zIDRoMnY3SDN6TTggNmgybDIgNWgtMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQgNmgtMmwtMiA1aDJ6TTMgOWg1djJIM3pNMTUgM2g1djJoLTV6TTE4IDVoMnYxaC0yek0xOCA4aDJ2MWgtMnpNMTYgNmg0djJoLTR6TTE1IDloNXYyaC01eiIvPgogICAgPC9nPgo8L3N2Zz4K" alt="lv-3" />
                                    </a>
                                </div>
                            </div>
                            <div className="meta-box">
                                <time dateTime="2021-01-04T06:37:51.000Z" title={article?.create_time} className="time">
                                    {moment(article?.create_time).format('YYYY-MM-DD')}
                                </time>
                                <span className="views-count">阅读 {article?.pvcount}</span>
                            </div></div>
                        <button data-v-06c7d5b3="" className="follow-button follow">
                            <span data-v-06c7d5b3="">关注</span>
                        </button>
                    </div>
                    <h1 className="article-title">
                        {article.title}
                    </h1>
                    <div className="article-content">
                        <ReactMarkdown content={article?.content} />
                    </div>
                </article>
                <div className="tag-list-box">
                    <div className="tag-list-title">关注下面的标签，发现更多相似文章</div>
                    <div className="tag-list">
                        <a href="/tag/React.js" target="_blank" rel="" className="item">
                            <img src="https://lc-gold-cdn.xitu.io/f655215074250f10f8d4.png?imageView2/2/w/42/h/42/q/85/format/webp/interlace/1" className="lazy tag-icon" data-src="https://lc-gold-cdn.xitu.io/f655215074250f10f8d4.png?imageView2/2/w/42/h/42/q/85/format/webp/interlace/1" alt="1" />
                            <div className="tag-title">{getTagNameFromCategoryList(categoryList, article?.category, article?.tag)}</div>
                        </a>
                    </div>
                </div>
                <Comment commentTypeID={article._id} authorID={article.user_id} commentType="article" />
            </div>
            <SideBar authorInfo={authorInfo} />
            <Suspended article={article} onReLoadArticleList={()=>setArticleDetail()}/>
            <div className="main-area recommended-area shadow">
                <div className="recommended-entry-list-title">
                    相关推荐
                </div>
                <EntryList isShowListHeader={false} />
            </div>
        </div>
    )

    async function setArticleDetail() {
        const { id } = queryString.parse(history.location.search)
        const result: any = await GetArticleDetail({ id })
        if (result.data.code === 0) {
            setState({
                article: result.data.article
            })
        }
    }
    async function setAuthorInfo(user_id: string) {
        const result: any = await GetAuthorInfo({ _id: user_id })
        if (result.data.code === 0) {
            setState({
                authorInfo: result.data.user
            })
        }
    }
}
export default Detail