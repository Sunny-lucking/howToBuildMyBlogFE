import "./style.less"
import MinorArea from "./MinorArea"
import UserInfo from "./UserInfo"
import ListBlock from "./ListBlock"
import { GetAuthorInfo } from "service/user"
import { useSetState } from "ahooks"
import {useEffect} from "react"
import { notification} from "antd"
interface State{
    authorInfo: any
}
function User(props:any) {
    const [state, setState] = useSetState<State>({
        authorInfo: {

        }
    })
    useEffect(()=>{
        setAuthorInfo(props.match.params.id)
    },[props.match.params.id])
    return (
        <div className="view user-view">
            <div className="major-area">
              <UserInfo authorInfo={state.authorInfo} onFollowChange={()=>setAuthorInfo(state.authorInfo?._id)}/>
              <ListBlock userId={state.authorInfo?._id} route={props.route}/>
            </div >
            <MinorArea authorInfo={state.authorInfo}/>
        </div >
    )

    async function setAuthorInfo(user_id: string) {
        const result: any = await GetAuthorInfo({ _id: user_id })
        if (result.data.code === 0) {
            setState({
                authorInfo: result.data.user
            })
        }else{
            notification.open({
                message: result.data.msg,
            });
        }
    }
}

export default User