import "./style.less"
import { SmileOutlined } from "@ant-design/icons"
import { useSetState } from "ahooks"
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import StateStore from "store"
import { useDispatch } from "react-redux"
import { userLoginAction } from "store"
interface MenuProps {
    isHome: boolean,
}

function Menu(props: MenuProps) {
    let history = useHistory()
    let user = useSelector((state: StateStore) => state.userStore.user)
    let dispatch = useDispatch()
    if (!user) {
        history.push("/juejin/home")
    }
    return (
        <div className="menu-container">
            <div className="menu root-menu" style={{...props.isHome?{marginTop:0}:{}}}>
                <div className="item-group">
                    <a href="/editor/drafts/new?v=2" className="item">写文章</a>
                    <a href="/editor/drafts?v=2" className="item">草稿</a>
                </div>
                <div className="item-group">
                    <a href={`/juejin/user/${user?._id}/posts`} className="item">我的主页</a>
                    <a href="/user/1204720476893064/likes" className="item">我喜欢的</a>
                    <a href="/user/1204720476893064/collections" className="item"> 我的收藏集 </a>
                    <a href="/subscribe/subscribed" className="item">标签管理</a>
                </div>
                <div className="item-group">
                    <a href="/user/settings/profile" className="item" rel="noreferrer">设置</a>
                </div>
                {
                    props.isHome && user._id &&
                    <div className="nav-menu-item-group"  onClick={onLogOut}>
                        <div className="nav-menu-item">
                            <a><i className="fengwei fw-logout"></i> <span>登出</span></a>
                        </div>
                    </div>
                }

            </div>

        </div>
    )

    // 退出登录
    async function onLogOut(){
        localStorage.removeItem("blogFrontToken")
        dispatch(userLoginAction())
        history.push("/juejin/home")
    }

}

export default Menu