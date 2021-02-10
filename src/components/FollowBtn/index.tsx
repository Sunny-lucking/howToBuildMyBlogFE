import StateStore from "store";
import "./style.less"
import { useSelector } from "react-redux"
import { FollowAuthor, UnFollowAuthor } from "service/user"
import { message, notification } from "antd"
interface Iprops {
    authorInfo: any,
    onFollowChange: () => void
}
function FollowBtn(props: Iprops) {
    const { authorInfo } = props
    const user = useSelector((state: StateStore) => state.userStore.user)
    return (
        <>
            {
                authorInfo?.fans?.includes(user._id) ?
                    <button className="follow-btn btn active" onClick={() => onUnFollowAuthor(authorInfo._id)}><span >已关注</span></button> :
                    <button className="follow-btn btn" onClick={() => onFollow(authorInfo._id)}><span >关注</span></button>

            }
        </>
    )

    async function onFollow(_id: string) {
        const { data: { code, msg } }: any = await FollowAuthor({ _id })
        if (code === 0) {
            message.success(msg)
            props.onFollowChange()
        } else {
            notification.open({ message: msg })
        }
    }

    async function onUnFollowAuthor(_id: string) {
        const { data: { code, msg } }: any = await UnFollowAuthor({ _id })
        if (code === 0) {
            message.success(msg)
            props.onFollowChange()
        } else {
            notification.open({ message: msg })
        }
    }
}

export default FollowBtn