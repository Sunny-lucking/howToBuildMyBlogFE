import "./style.less"
import RelatedPinItem from "./RelatedPinItem"
function RelatedPin(props:any) {
    return (
        <div className="related-pin-block pin-block">
            <header >{props.title}</header>
            <ul className="pin-list">
                <li className="item">
                    <RelatedPinItem/>
                </li>
                <li className="item">
                    <RelatedPinItem/>
                </li>
                <li className="item">
                    <RelatedPinItem/>
                </li>
                <li className="item">
                    <RelatedPinItem/>
                </li>
            </ul>
        </div>
    )
}

export default RelatedPin;