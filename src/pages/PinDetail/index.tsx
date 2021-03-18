import "./style.less"
import PinList from "components/PinList"
import { AddPin, GetPinDetail } from "service/pin"
import { useSetState } from "ahooks"
import { useEffect } from "react"
import { notification, message, Modal, Tag } from "antd"
const tagList = [
    { label: "上班摸鱼", value: '6824710203301167112' },
    { label: "内推招聘", value: '6819970850532360206' },
    { label: "一图胜千言", value: '6824710202487472141' },
    { label: "今天学到了", value: '6824710202562969614' },
]
function PinDetail(props: any) {

    const [state, setState] = useSetState({
        pinList: [],
        isModalVisible: false,
        pinValue: '',
        tagIndex: -1,
    })

    const {_id} = props.match.params
    useEffect(() => {
        setPin()
    }, [])
    return (
        <div className="view pin-view">
            <div className="main-area shadow">
                <PinList
                    pinList={state.pinList}
                    onReLoadPinList={()=>{
                    }}
                />
            </div>
        </div>
    )


    async function setPin() {
        const result: any = await GetPinDetail({
            _id
        })
        if (result.data.code !== 0) {
            notification.open({
                message: result.data.msg,
            });
        } else {
            setState({
                pinList: [result.data.pin] as any
            })
        }
    }
}

export default PinDetail;