import "./style.less"
import { getDistanceSpecifiedTime } from "constants/utils"
import { useSelector } from "react-redux"
import StateStore from "store"
import { notification, message } from "antd"
import BraftEditor from "components/BraftEditor"
import { useSetState, useClickAway } from "ahooks"
import { useRef } from "react"
import { AddRecall,DeleteComment } from "service/comment"
import RecallItem from "./RecallItem"
interface ItemProps {
    commentItem: any,
    onReLoadCommentList:()=>{}
}
function CommentItem(props: ItemProps) {
    const { authorID, discuss } = props.commentItem
    const user = useSelector((state: StateStore) => state.userStore.user)

    // 点击评论的回复按钮的其他地方，隐藏MenuNav组件
    const commentRef = useRef(null);
    useClickAway(() => {
        setIsShowCommentEditorFalse()
    }, commentRef);


    const [state, setState] = useSetState({
        isShowCommentEditor: false,
    })
    return (
        <div className="comment-item-box">
            <div className="item">
                <div className="comment comment">
                    <div className="user-popover-box popover">
                        <a href={`/user/${discuss.userId}`} target="_blank" rel="" className="user-link">
                            <img src={discuss.cover} alt={`${discuss?.username}的头像`} className="lazy avatar avatar" />
                        </a>
                    </div>
                    <div className="content-box comment-divider-line" ref={commentRef}>
                        <div className="meta-box">
                            <div className="user-popover-box">
                                <div   className="username ellipsis">
                                    <span className="name" style={{ maxWidth: '128px' }}>
                                        {discuss?.username}
                                    </span>
                                    <a href="/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022" target="_blank" rel="" className="rank">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDIzIDE0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iIzZFQ0VGRiIgZD0iTTMgMWgxN2EyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMkgzYTIgMiAwIDAgMS0yLTJWM2EyIDIgMCAwIDEgMi0yeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zIDRoMnY3SDN6TTggNmgybDIgNWgtMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQgNmgtMmwtMiA1aDJ6TTMgOWg1djJIM3pNMTUgM2g1djJoLTV6TTE4IDVoMnYyaC0yek0xNSA5VjdoMnYyeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xNSA4VjZoNXYyek0xNSA5aDV2MmgtNXoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" alt="lv-2" />
                                    </a>
                                    {
                                        authorID === discuss.userId.toString() &&
                                        <span className="author-badge-text">(作者)</span>
                                    }
                                </div>
                            </div>
                            {/* <div className="position">Web前端复制粘贴工程师 @ 驻马店复制粘贴信息技术有限公司</div> */}
                        </div>
                        <div className="content" dangerouslySetInnerHTML={{ __html: discuss?.inputOfComment }}></div>
                        <div className="limit-ctl-box">
                        </div>
                        <div className="reply-stat" >
                            <time dateTime="1609674620000" title="Sun Jan 03 2021 19:50:20 GMT+0800 (中国标准时间)" className="time">{getDistanceSpecifiedTime(discuss?.create_time)}</time>
                            <div className="delete" onClick={()=>{deleteComment( props.commentItem._id)}}> &nbsp;·&nbsp;删除</div>
                            <div className="action-box" onClick={() => { onShowCommentEditor() }} >
                                <div className="like-action action">
                                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" className="icon like-icon"><g fill="none" fillRule="evenodd"><path d="M0 0h20v20H0z"></path> <path stroke="#8A93A0" strokeLinejoin="round" d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"></path></g></svg></div><div className="comment-action action"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" className="icon comment-icon"><g fill="none" fillRule="evenodd"><path d="M0 0h20v20H0z"></path> <path stroke="#8A93A0" strokeLinejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g>
                                    </svg>
                                    <span className="action-title" >回复</span>
                                </div>
                            </div>
                        </div>
                        {
                            state.isShowCommentEditor &&
                            <div className="comment-form reply-form focused reply">
                                <BraftEditor
                                    placeholder="评论点什么？？"
                                    onSumbit={(value) => SendRecall(value)}
                                />
                            </div>
                        }
                        <div className="sub-comment-list sub-comment-list">
                            {
                                discuss.subDiscuss.map((item: any, index: number) => (
                                    <RecallItem
                                        key={index}
                                        recallItem={item}
                                        discussId={props.commentItem._id}
                                        articleUserId={authorID}
                                    />
                                ))
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


    async function  deleteComment(_id:string) {
        const result:any = await DeleteComment({_id})
        if (result.data.code ===0) {
            message.success(result.data.msg)
            props.onReLoadCommentList()
        }else{
            notification.open(result.data.msg)
        }
    }
    function onShowCommentEditor() {
        setState({
            isShowCommentEditor: !state.isShowCommentEditor
        })
    }
    function setIsShowCommentEditorFalse() {
        setState({
            isShowCommentEditor: false
        })
    }
    async function SendRecall(value: any) {

        if (!user._id) {
            notification.open({
                message: '请先登录',
            });
            return;
        }
        if (!value) {
            notification.open({
                message: '评论不能为空',
            });
            return
        }
        const result: any = await AddRecall({
            cover: user.avatar_url,
            userId: user._id,
            selfName: user.git_name,
            _id: props.commentItem._id,
            inputOfRecall: value,
        })
        if (result.data.code === 0) {
            message.success('回复成功')
            props.onReLoadCommentList()
        } else {
            notification.open({
                message: '回复失败',
            });
        }
    }
}

export default CommentItem