import { Link } from "react-router-dom"
import "./style.less"
import { useHistory } from "react-router-dom"
import queryString from "query-string"
function EntryList() {
    const history = useHistory()
    const {sortType} = queryString.parse(history.location.search)
    return (
        <header className="list-header">
            <nav role="navigation" className="list-nav">
                <ul className="nav-list left">
                    <li className="nav-item route-active">
                        <Link to={`${history.location.pathname}?sortType=praiseList`}  className={ sortType=== "praiseList" ? 'active' : ''} >热门</Link>
                    </li>
                    <li className="nav-item route-active">
                        <Link to={`${history.location.pathname}?sortType=create_time`} className={sortType === "create_time" ? 'active' : ''}>最新</Link>
                    </li>
                    <li className="nav-item route-active">
                        <Link to={`${history.location.pathname}?sortType=pvcount`} className={sortType === "pvcount" ? 'active' : ''}>热榜</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default EntryList