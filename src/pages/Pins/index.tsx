import "./style.less"
import DockNav from "./DockNav"
import Stream from "./Stream"
import Aside from "./Aside"
function Pins(props:any) {
    return (
        <div className="main">
            <DockNav />
            <Stream  pinType={props.match.params.type}/>
            <Aside/>
        </div>
    )
}

export default Pins;