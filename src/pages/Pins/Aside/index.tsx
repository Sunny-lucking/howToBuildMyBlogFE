import "./style.less"
import Profile from "components/Profile"
import RelatedPin from "components/RelatedPin"
import { notification, message, Modal, Tag } from "antd"
import { useSelector } from "react-redux"
import StateStore from "store"
import { AddPin, GetPin } from "service/pin"
import { useSetState } from "ahooks"
import { useEffect } from "react"
function Aside() {
    let user = useSelector((state: StateStore) => state.userStore.user)

    const [state, setState] = useSetState({
        pinList: [],
        isModalVisible: false,
        pinValue: '',
        tagIndex: -1,
    })

    // 获取推荐沸点
    useEffect(() => {
        setPin()
    }, [])
    return (
        <div className="pin__side sidebar">
            {
                user._id && <Profile authorInfo={user}/>
            }
           <RelatedPin
               title="精选沸点" 
               relatedList={state.pinList}
           />
           
        </div>
    )

    async function setPin() {
        const result: any = await GetPin({
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

export default Aside;