import { NavLink } from "react-router-dom"
import "./style.less"
interface Iprops {
    cateItem: any,
    baseUrl: string
}
function TagNavigator(props: Iprops) {
    return (
        <nav role="navigation" className="tag-nav tag-navigator">
            <ul className="nav-list tag-list">
                {
                    props?.cateItem?.tags?.map((item: any, index: number) => (
                        <NavLink to={`${props.baseUrl}${props.cateItem.category_url}/${item.label}`} activeClassName="active" className="nav-item tag" key={index}>{item.label}</NavLink>
                    ))
                }
            </ul>
        </nav>

    )

}
export default TagNavigator