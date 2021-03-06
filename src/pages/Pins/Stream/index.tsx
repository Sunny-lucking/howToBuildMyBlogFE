import "./style.less"
import 'braft-editor/dist/index.css'
import Editor from "components/BraftEditor"
import PinList from "components/PinList"
import queryString from "query-string"
import { notification, message, Modal, Tag } from "antd"
import { useSelector } from "react-redux"
import StateStore from "store"
import { AddPin, GetPin } from "service/pin"
import { useSetState } from "ahooks"
import { useEffect } from "react"
interface StreamProps {
    pinType: string
}
const tagList = [
    { label: "上班摸鱼", value: '6824710203301167112' },
    { label: "内推招聘", value: '6819970850532360206' },
    { label: "一图胜千言", value: '6824710202487472141' },
    { label: "今天学到了", value: '6824710202562969614' },
]
function Stream(props: StreamProps) {
    let user = useSelector((state: StateStore) => state.userStore.user)
    const { pinType } = props
    const [state, setState] = useSetState({
        pinList: [],
        isModalVisible: false,
        pinValue: '',
        tagIndex: -1,
    })
    useEffect(() => {
        setPin()
    }, [pinType])
    return (
        <div className="stream">
            <div className="stream-wrapper">
                <div className="pin-editor-dialog pin-editor">
                    <div className="editor-body">
                        <Editor
                            placeholder="告诉你个小秘密，发布沸点时添加合适话题会被更多掘友们看见哟～"
                            onSumbit={(value) => showModal(value)}
                        />
                    </div>
                </div>
                <div className="pin-list-view">
                    <PinList
                        pinList={state.pinList}
                        onReLoadPinList={setPin}
                    />
                </div>
            </div>
            <Modal title="选一下最合适的话题呗！" visible={state.isModalVisible} onOk={SendPin} onCancel={handleCancel} wrapClassName="tag-list-container">
                {
                    tagList.map((item: any, index: number) => (
                        <Tag color={state.tagIndex === index ? 'success' : ''} key={item.value} className="pin-tag-item" onClick={() => onChooseTag(index)}>{item.label}</Tag>
                    ))
                }

            </Modal>
        </div>
    )
    function onChooseTag(index: number) {
        setState({
            tagIndex: index
        })
    }
    async function showModal(pinValue: any) {
        setState({
            isModalVisible: true,
            pinValue,
        })
    }
    function handleCancel() {
        setState({
            isModalVisible: false,
        })
    }
    async function setPin() {
        const result: any = await GetPin({
            pinType
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
    async function SendPin(value: any) {

        if (!user._id) {
            notification.open({
                message: '请先登录',
            });
            return;
        }
        if (!state.pinValue) {
            notification.open({
                message: '沸点不能为空',
            });
            return
        }
        const result: any = await AddPin({
            user_name: user.git_name,
            content: state.pinValue,
            user_id: user._id,
            user_avatar: user.avatar_url, // 用户头像
            pinTypeValue: tagList[state.tagIndex].value, // 沸点类型的值
            pinTypeLabel: tagList[state.tagIndex].label, // 沸点类型的label
        })
        if (result.data.code === 0) {
            message.success('发表成功')
            setState({
                isModalVisible: false,
            })
        } else {
            notification.open({
                message: '发表失败',
            });
        }
        setPin()
    }
}

export default Stream;