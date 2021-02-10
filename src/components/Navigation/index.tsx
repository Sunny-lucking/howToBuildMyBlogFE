import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { onWatchScroll } from "constants/utils"
import { NavigationProps } from "models"
import { useSelector } from "react-redux"
import "./style.less"
import StateStore from "store"

function Navigation(props:NavigationProps) {
    let [isTop, setIsTop] = useState(false)
    const user = useSelector((state:StateStore) =>state.userStore.user)
    
    useEffect(() => {
        onWatchScroll(200, setIsTopTrue, setIsTopFalse)
    }, [])

    return (
        <nav role="navigation" className={["view-nav", isTop ? "top" : null].join(' ')}>
            <div className="nav-list left">
                {
                    props.commonNavList.concat(props.navList).map((item:any)=>(
                        <NavLink key={item.label} to={props.baseUrl+item.category_url} activeClassName="active" className="nav-item" onClick={()=>{props.onChange(item)}}>{item.label}</NavLink>
                    ))
                }
            </div>
        </nav>
    )
    function setIsTopTrue() {
        setIsTop(true)
    }
    function setIsTopFalse() {
        setIsTop(false)
    }
}
export default Navigation