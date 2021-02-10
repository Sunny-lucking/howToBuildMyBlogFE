import "./style.less"
import { useState } from "react"
import { useSetState } from "ahooks"
interface SettingItemProps {
    title: string,
    placeholder: string,
}
function SettingItem(props: SettingItemProps) {
    let [isFocus, setFocus] = useState(false)
    const value = "123"
    let [state, setState] = useSetState({ value: value })
    return (
        <li className="item">
            <span className="title">{props.title}</span>
            <div className="input-box profile-input profile-input">
                <input spellCheck="false" placeholder={props.placeholder} className="input" onFocus={onSetFocusTrue} onBlur={onSetFocusFalse} value={state.value}
                    onChange={onChangeValue}
                />
                <div className="action-box">
                    {
                        !isFocus &&
                        <button className="btn edit-btn">
                            <img src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/edit-icon.6d6382b.svg" className="icon" alt="1"/>
                            <span>修改</span>
                        </button>
                    }

                    {
                        isFocus &&
                        <>
                            <button className="btn confirm-btn" onClick={onSave}>保存</button>
                            <button className="btn cancel-btn" onClick={onCancel}>取消</button>
                        </>
                    }
                </div>
            </div>
        </li>
    )
    function onSetFocusFalse(e: any) {
       
        setTimeout(()=>{
            setFocus(false)
            setState({
                value:value
            })
        },200)
    }
    function onChangeValue(e: any) {

        setState({
            value: e.target.value
        })
    }
    function onCancel() {
    }
    function onSave() {
      
        
        // value = state.value
    }
    function onSetFocusTrue() {
        setFocus(true)
    }


}

export default SettingItem