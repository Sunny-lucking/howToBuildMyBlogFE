import "./style.less"
import PinItem from "./PinItem"

interface PinListProps {
    pinList: any,
    onReLoadPinList: () => void // 当点击删除沸点的时候，触发该事件导致重新请求
}
function PinList(props: PinListProps) {
    return (
        <div className="pin-list-wrap">
            <ul className="pin-list">
                {
                    props.pinList && props.pinList.map((item: any, index: number) => (
                        <li className="item shadow" key={index}>
                            <PinItem pinItem={item} onReLoadPinList={props.onReLoadPinList} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}

export default PinList;