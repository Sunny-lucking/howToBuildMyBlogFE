import "./style.less"
import { LikeOutlined, ShareAltOutlined, MessageOutlined } from "@ant-design/icons"
import { getDistanceSpecifiedTime } from "constants/utils"
import { useSelector } from "react-redux"
import StateStore from "store"
import { EllipsisOutlined } from "@ant-design/icons"
import { Menu, Dropdown, notification, message } from 'antd';
import { DeletePin, PraisePin, CancelPraisePin } from "service/pin"
import Comment from "components/Comment"
import { useSetState, useClickAway } from "ahooks"
import { useRef } from "react"
import { useHistory } from "react-router-dom"
import FollowBtn from "components/FollowBtn"
interface PinItemProps {
    userItem: any,
    // onReLoadPinList: () => void // 当点击删除沸点的时候，触发该事件导致重新请求
}


function UserItem(props: PinItemProps) {
    const { userItem } = props
    let user = useSelector((state: StateStore) => state.userStore.user)
    const history = useHistory()
    const [state, setState] = useSetState({
        isShowComment: false,
    })
    // 点击评论的回复按钮的其他地方，隐藏MenuNav组件
    const commentRef = useRef(null);
    useClickAway(() => {
        // setIsShowCommentFalse()
    }, commentRef);



    return (
        <div className="user">
            <div className="link">
                <img src={userItem?.avatar_url} alt={`${userItem.git_name}的头像`} className="lazy avatar avatar" />
                <div className="info-box">
                    <a href={`/juejin/user/${userItem?._id}/posts`} target="_blank" rel="" className="username">
                        <span className="name" style={{ maxWidth: "128px" }}>{userItem?.git_name}</span>
                        {/* <a href="/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022" target="_blank" rel="" className="rank">
                        </a> */}
                    </a>
                    <div className="detail">{userItem?.location} @ {userItem?.company} </div>
                    <div className="describe">
                        <span > 获得 </span>
                        <span >{userItem?.praiseCount} 赞</span>
                        <span >·</span> <span >{userItem.pvCount} 阅读</span>
                    </div>
                </div>
                <FollowBtn
                    authorInfo={userItem}
                    // onFollowChange={()=>{}}
                    // onFollowChange={()=>setAuthorInfo(state.authorInfo?._id)}
                />
                {/* <button className="follow-btn">关注</button> */}
            </div>
        </div>
    )

}

export default UserItem;