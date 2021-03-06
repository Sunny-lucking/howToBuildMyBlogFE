import "./style.less"
import { getDistanceSpecifiedTime } from "constants/utils"
import { useSelector } from "react-redux"
import StateStore from "store"
import { notification, message } from "antd"
import BraftEditor from "components/BraftEditor"
import { useSetState, useClickAway } from "ahooks"
import { useRef } from "react"
import { AddRecall } from "service/comment"
interface ItemProps {
    recallItem: any,
    discussId: string,
    articleUserId: string
}
function RecallItem(props: ItemProps) {
    const { recallItem } = props
    const user = useSelector((state: StateStore) => state.userStore.user)


    // 点击回复的回复按钮的其他地方，隐藏输入框组件
    const commentRef = useRef(null);
    useClickAway(() => {
        setIsShowCommentEditorFalse()
    }, commentRef);


    const [state, setState] = useSetState({
        isShowCommentEditor: false,
    })
    return (
        <div className="item" ref={commentRef}>
            <div className="sub-comment sub-comment">
                <div className="sub-comment-content-row">
                    <div className="sub-comment-content-box">
                        <div className="user-popover-box popover">
                            <a href="/user/1451011081249175" target="_blank" rel="" className="username">
                                <img src={recallItem.cover} className="lazy avatar avatar" alt="1" />
                            </a>
                        </div>
                        <div className="user-content-box">
                            <div className="profie">
                                <div className="user-popover-box">
                                    <div className="username">
                                        <span className="name" style={{ maxWidth: '128px' }}>
                                            {recallItem.selfName}
                                        </span>
                                        <a href="/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022" target="_blank" rel="" className="rank">
                                            {/* <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDIzIDE0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iIzU5OURGRiIgZD0iTTMgMWgxN2EyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMkgzYTIgMiAwIDAgMS0yLTJWM2EyIDIgMCAwIDEgMi0yeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zIDRoMnY3SDN6TTggNmgybDIgNWgtMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQgNmgtMmwtMiA1aDJ6TTMgOWg1djJIM3pNMTUgM2g1djJoLTV6TTE4IDVoMnYxaC0yek0xOCA4aDJ2MWgtMnpNMTYgNmg0djJoLTR6TTE1IDloNXYyaC01eiIvPgogICAgPC9nPgo8L3N2Zz4K" alt="lv-3" /> */}
                                        </a>
                                        {
                                            props.articleUserId === recallItem.userId.toString() &&
                                            <span className="author-badge-text">(作者)</span>
                                        }

                                    </div>
                                </div>
                                {/* <div className="position">微信搜： dadaqianduan @ 软件开发/网页开发</div> */}
                            </div>
                            <div className="content-box">
                                <span className="content" dangerouslySetInnerHTML={{ __html: recallItem?.inputOfRecall }}></span>
                            </div>
                            <div className="limit-all-box">
                            </div>
                            <div className="sub-comment-stat-box">
                                <time dateTime="1609675835000" title="Sun Jan 03 2021 20:10:35 GMT+0800 (中国标准时间)" className="time">
                                    {getDistanceSpecifiedTime(recallItem?.create_time)}
                                </time>
                                <div className="delete" > &nbsp;·&nbsp;删除</div>
                                <div className="sub-comment-action-box">
                                    <div className="like-action action">
                                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" className="icon like-icon"><g fill="none" fillRule="evenodd"><path d="M0 0h20v20H0z"></path> <path stroke="#8A93A0" strokeLinejoin="round" d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"></path></g>
                                        </svg>
                                    </div>
                                    <div className="comment-action action" onClick={onShowCommentEditor}>
                                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" className="icon comment-icon"><g fill="none" fillRule="evenodd"><path d="M0 0h20v20H0z"></path> <path stroke="#8A93A0" strokeLinejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g>
                                        </svg>
                                        <span >回复</span>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



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
            _id: props.discussId,
            inputOfRecall: value,
        })
        if (result.data.code === 0) {
            message.success('回复成功')
        } else {
            notification.open({
                message: '回复失败',
            });
        }
    }
 
}

export default RecallItem