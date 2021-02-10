import "./style.less"
import { NavLink } from "react-router-dom"
const tagList = [
    {label:"上班摸鱼",value:'6824710203301167112'},
    {label:"内推招聘",value:'6819970850532360206'},
    {label:"一图胜千言",value:'6824710202487472141'},
    {label:"今天学到了",value:'6824710202562969614'},
]
function DockNav() {
    return (
        <div className="dock shadow">
            <nav role="navigation" className="dock-nav">
                <ul className="nav-list">
                    <NavLink to="/juejin/pins/recommended" activeClassName="active" className="nav-item " exact={true}>推荐</NavLink>
                    <NavLink to="/juejin/pins/hot" activeClassName="active" className="nav-item " exact={true}>热门</NavLink>
                    <NavLink to="/juejin/pins/following" activeClassName="active" className="nav-item ">关注</NavLink>
                    {
                        tagList.map((item,index)=>(
                            <NavLink to={`/juejin/pins/${item.value}`} activeClassName="active" className="nav-item " key={index}>{item.label}</NavLink>
                        ))
                    }
                    <li className="nav-item"><a href="/#"> 更多话题+</a>
                    </li>
                    <div className="divider">
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default DockNav;