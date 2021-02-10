import "./style.less"
import { useHistory ,NavLink} from "react-router-dom";
import { useSelector } from "react-redux"
import { ArticleVO } from "models";
import StateStore from "store"
import { getTagNameFromCategoryList } from "constants/utils"
import { getDistanceSpecifiedTime } from "constants/utils"
import { LikeOutlined } from "@ant-design/icons"
import { PraiseArticle, CancelPraiseArticle,DeleteArticle } from "service/article"
import { message, notification,Modal } from "antd"
import { useSetState } from "ahooks"
interface EntryItemProps {
    article: ArticleVO,
    onArticleListChange?:()=>void
}

function EntryItem(props: EntryItemProps) {
    const history = useHistory();
    let categoryList = useSelector((state: StateStore) => state.categoryStore.category_list)
    const user: any = useSelector((state: StateStore) => state.userStore.user)
    const { article } = props
    const [state, setState] = useSetState({
        isPraise: article?.praiseList?.includes(user?._id as never)
    })
    return (
        <div className="entry">
            <div className="entry-link">
                <div className="content-box">
                    <div className="info-box">
                        <div className="info-row meta-row">
                            <ul className="meta-list">
                                <li className="item username clickable">
                                    <div>
                                        <a href={`/juejin/user/${article?.user_id}/posts`} target="_blank">
                                            {article?.user_name || "佚名"}
                                        </a>
                                    </div>
                                </li>
                                <li className="item">{getDistanceSpecifiedTime(article?.create_time)}</li>
                                <li className="item tag">
                                    <a href="/tag/JavaScript" target="_blank" rel="" className="tag">
                                        {getTagNameFromCategoryList(categoryList = [], article?.category, article?.tag)}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="info-row title-row">
                            <span >
                                <a href={`/juejin/post?id=${article?._id}`} target="_blank" rel="" className="title"  dangerouslySetInnerHTML={{ __html: article?.title }}>
                                    {/* {article?.title} */}
                                </a>
                            </span>
                        </div>
                        <div className="info-row action-row">
                            <ul className="action-list">
                                <li
                                    className={["item like clickable", state.isPraise ? "liked" : ''].join(" ")}
                                    onClick={state.isPraise ? () => cancelPraiseArticle(article?._id) : () => praiseArticle(article?._id)}
                                >
                                    <div className="title-box">
                                        {
                                            state.isPraise ?
                                                <LikeOutlined style={{ color: "green" }} /> :
                                                <LikeOutlined />
                                        }
                                        <span className="count">
                                            {article?.praiseList.length}
                                        </span>
                                    </div>
                                </li>
                                <li className="item comment clickable">
                                    <a href={`/juejin/post?id=${article?._id}`} target="_blank" rel="" className="title-box">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHRpdGxlPjc1MzFEREU0LTZCMzgtNDI4Ny04QTJBLUY2ODVGMDgzNUFGQzwvdGl0bGU+PGRlZnM+PHJlY3QgaWQ9ImEiIHg9IjU5IiB5PSI1NCIgd2lkdGg9IjU0IiBoZWlnaHQ9IjI1IiByeD0iMSIvPjxtYXNrIGlkPSJiIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTQiIGhlaWdodD0iMjUiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02OCAtNTYpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNCMkJBQzIiIGQ9Ik03MiA2MXY4LjAzOGg0LjQ0NEw4MS4xMTEgNzJ2LTIuOTYySDg0VjYxeiIvPjx1c2Ugc3Ryb2tlPSIjRURFRUVGIiBtYXNrPSJ1cmwoI2IpIiBzdHJva2Utd2lkdGg9IjIiIHhsaW5rOmhyZWY9IiNhIi8+PC9nPjwvc3ZnPg==" className="icon" alt="评论" />
                                        <span className="count">
                                            {article?.commentCount}
                                        </span>
                                    </a>
                                </li>
                                {
                                    article?.user_id?.toString() === user?._id?.toString() &&
                                    <li className="item more clickable hover">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+NTdERjlDRTMtRjVENi00RDZELTgyQzktM0NCOTREQTU0RjQ3PC90aXRsZT48cGF0aCBkPSJNNS41IDExYTEuNSAxLjUgMCAxIDAgMC0zIDEuNSAxLjUgMCAwIDAgMCAzem01IDBhMS41IDEuNSAwIDEgMCAwLTMgMS41IDEuNSAwIDAgMCAwIDN6bTUgMGExLjUgMS41IDAgMSAwIDAtMyAxLjUgMS41IDAgMCAwIDAgM3oiIGZpbGw9IiNCMkJBQzIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==" className="icon" />
                                        <ul className="more-list">
                                            <li className="item" onClick={()=>onGotoModify()}>
                                                编辑
                                            </li>
                                            <li className="item" onClick={()=>{onCancel(article._id)}}>删除</li>
                                        </ul>
                                    </li>
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    function onGotoModify(){
        history.push(`/editor?_id=${article._id}`)
    }
    async function praiseArticle(_id: string) {
        const result: any = await PraiseArticle({ _id })
        if (result.data.code === 0) {
            message.success(result.data.msg)
            setState({
                isPraise: true
            })
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
            setState({
                isPraise: false
            })
        } else {
            notification.open({
                message: result.data.msg,
            });
        }
    }

    async function onDeleteArticle(_id:string) {
        const result: any = await DeleteArticle({ _id })
        if (result.data.code === 0) {
            message.success(result.data.msg)
            setState({
                isPraise: false
            })
            props.onArticleListChange && props.onArticleListChange()
        } else {
            notification.open({
                message: result.data.msg,
            });
        }
    }
      // 关闭窗口时将取消所有正在上传中的文件
  function onCancel(_id:string) {
    Modal.confirm({
      title: "确定删除文章？",
      onOk() {
        onDeleteArticle(_id)
      }
    });
  }
}

export default EntryItem;