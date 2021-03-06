import "./style.less"
import RelatedPinItem from "./RelatedPinItem"
interface Iprops{
    relatedList:any,
    title:string,
}
function RelatedPin(props: Iprops) {
    return (
        <div className="related-pin-block pin-block">
            <header >{props.title}</header>
            <ul className="pin-list">
                {
                    props.relatedList?.map((item: any, index: number) => (
                        <li className="item" key={item._id}>
                            <RelatedPinItem relatedItem={item} title={props.title}/>
                        </li>
                    ))
                }

               
            </ul>
        </div>
    )
}

export default RelatedPin;