import "./style.less"
import EntryList from "components/EntryList"
import { NavLink } from "react-router-dom"
import { renderRoutes } from 'react-router-config'
interface ListBlockProps {
    userId: string,
    route: any
}
function ListBlock(props: ListBlockProps) {

    const { userId } = props
    return (
        <div className="list-block">
            <div className="detail-list detail-list">
                <div className="list-header">
                    <div className="header-content">
                        <NavLink to={`/juejin/user/${userId}/activities`} className="nav-item" activeClassName="active">
                            <div className="item-title">动态</div>
                        </NavLink>
                        <NavLink to={`/juejin/user/${userId}/posts`} className="nav-item" activeClassName="active">
                            <div className="item-title">文章</div>
                        </NavLink>
                        <NavLink to={`/juejin/user/${userId}/pins`} className="nav-item" activeClassName="active">
                            <div className="item-title">沸点</div>
                        </NavLink>
                        <NavLink to={`/juejin/user/${userId}/books`} className="nav-item" activeClassName="active">
                            <div className="item-title">小册</div>
                        </NavLink>
                        <NavLink to={`/juejin/user/${userId}/fans`} className="nav-item" activeClassName="active">
                            <div className="item-title">关注</div>
                        </NavLink>
                    </div>
                    <div className="list-body">
                        {renderRoutes(props.route.children)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListBlock