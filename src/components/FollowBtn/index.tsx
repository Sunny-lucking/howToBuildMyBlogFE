import StateStore from "store";
import "./style.less"
import { useSelector } from "react-redux"
import { FollowAuthor, UnFollowAuthor } from "service/user"
import { message, notification } from "antd"
import { useSetState } from "ahooks"
import {useEffect} from "react"
interface Iprops {
    authorInfo: any,
    // onFollowChange: () => void
}
function FollowBtn(props: Iprops) {
    const { authorInfo } = props
    const user = useSelector((state: StateStore) => state.userStore.user)
    const [state, setState] = useSetState({
        isFollowed: false
    })
    useEffect(() => {
        setState({
            isFollowed:authorInfo?.fans?.includes(user._id)
        })
    }, [authorInfo])

    return (
        <>
            {
                state.isFollowed ?
                    <button className="follow-btn btn active" onClick={() => onUnFollowAuthor(authorInfo._id)}><span >已关注</span></button> :
                    <button className="follow-btn btn" onClick={() => onFollow(authorInfo._id)}><span >关注</span></button>

            }
        </>
    )

    async function onFollow(_id: string) {
        const { data: { code, msg } }: any = await FollowAuthor({ _id })
        if (code === 0) {
            message.success(msg)
            // props.onFollowChange()
            setState({
                isFollowed:true 
            })
        } else {
            notification.open({ message: msg })
        }
    }

    async function onUnFollowAuthor(_id: string) {
        const { data: { code, msg } }: any = await UnFollowAuthor({ _id })
        if (code === 0) {
            message.success(msg)
            // props.onFollowChange()
            setState({
                isFollowed:false 
            })
        } else {
            notification.open({ message: msg })
        }
    }
}

export default FollowBtn