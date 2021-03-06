import "./style.less"
import { LikeOutlined, ShareAltOutlined, MessageOutlined } from "@ant-design/icons"
import { getDistanceSpecifiedTime } from "constants/utils"
import { useSelector } from "react-redux"
import StateStore from "store"
import { EllipsisOutlined } from "@ant-design/icons"
import { Menu, Dropdown, notification, message } from 'antd';
import { DeletePin,PraisePin ,CancelPraisePin} from "service/pin"
import Comment from "components/Comment"
import { useSetState, useClickAway } from "ahooks"
import { useRef } from "react"
import { useHistory} from "react-router-dom"

interface PinItemProps {
    pinItem: any,
    onReLoadPinList: () => void // 当点击删除沸点的时候，触发该事件导致重新请求
}


function PinItem(props: PinItemProps) {
    const { pinItem } = props
    let user = useSelector((state: StateStore) => state.userStore.user)
    const history = useHistory()
    const [state, setState] = useSetState({
        isShowComment: false,
    })
    // 点击评论的回复按钮的其他地方，隐藏MenuNav组件
    const commentRef = useRef(null);
    useClickAway(() => {
        setIsShowCommentFalse()
    }, commentRef);

    const menu = (
        <Menu>
            <Menu.Item onClick={() => deletePin(pinItem._id)}>
                删除
          </Menu.Item>

        </Menu>
    );

    return (
        <div className="stream-pin-item" ref={commentRef}>
            <div className="pin">
                <div className="pin-header-row">
                    <div className="account-group">
                        <div className="user-popover-box">
                            <a href={`/juejin/user/${pinItem?.user_id}/posts`} target="_blank" rel="" className="user-link">
                                <img src={pinItem.user_avatar} alt="Bzerocoder的头像" className="lazy avatar avatar" data-src="https://user-gold-cdn.xitu.io/2019/6/20/16b74ae27114ed7d?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" />
                            </a>
                        </div>
                        <div className="pin-header-content">
                            <div className="user-popover-box">
                                <a href={`/juejin/user/${pinItem?.user_id}/posts`} target="_blank" rel="" className="username">{pinItem.user_name}</a>
                            </div>
                            <div className="meta-box">
                                <div className="position ellipsis">{pinItem.user_name}</div>
                                <div className="dot">·</div>
                                <a href="/pin/6911604840611184647" target="_blank" rel="" className="time-box">
                                    <time dateTime="1609233414000" title="Tue Dec 29 2020 17:16:54 GMT+0800 (中国标准时间)" className="time">{getDistanceSpecifiedTime(pinItem.create_time)}</time>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="header-action">
                        {
                            user?._id?.toString() === pinItem?.user_id?.toString() ?
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <EllipsisOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
                                </Dropdown>
                                :
                                <button className="subscribe-btn follow-button">
                                    <span >关注</span>
                                </button>
                        }

                    </div>
                </div>
                <div className="pin-content-row">
                    <div className="content-box content-box">
                        <span dangerouslySetInnerHTML={{ __html: pinItem.content }}></span>
                    </div>
                </div>
                <div className="pin-topic-row">
                    <a href="/topic/6824710203301167112" target="_blank" rel="" title="来分享下你上班看到的好东西吧~" className="topic-title">{pinItem.pinTypeLabel}</a>
                </div>
                <div className="pin-action-row">
                    <div className="action-box action-box">
                        <div className="like-action action">
                            <div className="action-title-box">
                                {
                                    pinItem.praiseList.includes(user?._id) ?
                                    <LikeOutlined style={{color:"green"}} onClick={()=>cancelPraisePin(pinItem._id)}/>:
                                    <LikeOutlined onClick={()=>praisePin(pinItem._id)} />
                                }
                                
                                <span className="action-title">{pinItem.praiseList.length}</span>
                            </div>
                        </div>
                        <div className="comment-action action" onClick={() => onShowComment()}>
                            <div className="action-title-box">
                                <MessageOutlined />
                                <span className="action-title">{pinItem.commentCount}</span>
                            </div>
                        </div>
                        <div className="share-action action" onClick={()=>shareToMicroblog(pinItem)}>
                            <div className="action-title-box">
                                <ShareAltOutlined />
                                <span className="action-title">分享</span>

                            </div>
                        </div>
                    </div>
                </div>
                {
                    state.isShowComment &&
                    <div className="pin-comment-row">
                        <Comment
                            commentTypeID={pinItem._id}
                            commentType="pin"
                            authorID={pinItem.user_id}
                        />
                    </div>
                }
            </div>
        </div>
    )
    function setIsShowCommentFalse() {
        setState({
            isShowComment: false
        })
    }
    function onShowComment() {
        setState({
            isShowComment: !state.isShowComment
        })
    }
    async function praisePin(_id:string) {
        const result: any = await PraisePin({ _id })
        if (result.data.code === 0) {
            message.success(result.data.msg)
            props.onReLoadPinList()
        } else {
            notification.open({
                message: result.data.msg,
            });
        }
    }
    // 取消点赞
    async function cancelPraisePin(_id:string) {
        const result: any = await CancelPraisePin({ _id })
        if (result.data.code === 0) {
            message.success(result.data.msg)
            props.onReLoadPinList()
        } else {
            notification.open({
                message: result.data.msg,
            });
        }
    }
    async function deletePin(_id: number) {
        const result: any = await DeletePin({ _id })
        if (result.data.code === 0) {
            message.success(result.data.msg)
            props.onReLoadPinList()
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
            title: article.content,
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

}

export default PinItem;