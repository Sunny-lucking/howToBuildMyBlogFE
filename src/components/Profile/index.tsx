import "./style.less"
import { useSetState} from "ahooks"
import {notification,message} from "antd"
import {GetPin} from "service/pin"
import { useEffect } from "react"
interface ProfileProps {
    authorInfo:any
}
function Profile(props:ProfileProps) {

    const {authorInfo} = props
    const [state,setState] = useSetState({
        pinList:[]
    })
    useEffect(()=>{
        setPin()
    },[])
    return (
        <div className="profile-box shadow">
            <div className="profile">
                <a href={`/juejin/user/${authorInfo?._id}/posts`} target="_blank" rel="">
                    <img src={authorInfo?.avatar_url} alt={`${authorInfo?.git_name}`} className="lazy avatar avatar" />
                </a>
                <div className="user-info">
                    <a href={`/juejin/user/${authorInfo?._id}/post`} target="_blank" rel="" className="username ellipsis">{authorInfo?.git_name} </a>
                    <div className="position ellipsis">{authorInfo?.company} @ {authorInfo?.location}</div>
                </div>
            </div>
            <ul className="stat-list">
                <a href={`/juejin/user/${authorInfo?._id}/pins`} target="_blank" rel="" className="item">
                    <div className="title">沸点</div>
                    <div className="count">{state.pinList?.length || 0}</div>
                </a>
                <a href={`/juejin/user/${authorInfo?._id}/fans`} target="_blank" rel="" className="item">
                    <div className="title">关注</div>
                    <div className="count">{authorInfo?.fans?.length || 0}</div>
                </a>
                <a href={`/juejin/user/${authorInfo?._id}/followers`} target="_blank" rel="" className="item">
                    <div className="title">关注者</div>
                    <div className="count">{authorInfo?.followers?.length || 0}</div>
                </a>
            </ul>
        </div>
    )
    async function setPin() {
        const result: any = await GetPin({
            authorId:authorInfo?._id
        })
        if (result.data.code !== 0) {
            notification.open({
                message: result.data.msg,
            });
        } else {
            setState({
                pinList: result.data.pins
            })
        }
    }
}

export default Profile;