import "./style.less"
import UserList from "components/UserList"
import { AddPin, GetPin } from "service/pin"
import { notification, message, Modal, Tag } from "antd"
import { RightOutlined } from "@ant-design/icons"
import Advertisement from "components/Advertisement"
import { GetAuthorList } from "service/user"
import { useSetState } from "ahooks"
import { useEffect } from "react"
import {NavLink} from "react-router-dom"
function UserRank(props: any) {


    const [state, setState] = useSetState({
        authorInfoList: []
    })
    useEffect(() => {
        setAuthorInfoList()
    }, [])
    return (
        <div className="view pin-view">
            <div className="main-area shadow">
                <UserList
                    authorInfoList={state.authorInfoList}
                    // onReLoadUserList={()=>{
                    // }}
                />
            </div>
        </div>
    )


    async function setAuthorInfoList() {
        const result: any = await GetAuthorList({})
        if (result.data.code === 0) {
            setState({
                authorInfoList: result.data.userList
            })
        }else{
            notification.open({
                message: result.data.msg,
            });
        }
    }
}

export default UserRank;