import "./style.less"
import { useEffect, useState, useRef } from "react"
import { Menu, Dropdown } from "antd"
import { BellFilled, SearchOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom"
import { onWatchScroll } from "constants/utils"
import { useHistory } from "react-router-dom";
import StateStore from "store"
import { useSetState, useClickAway ,useKeyPress} from "ahooks"
import { useSelector } from "react-redux"
import MenuNav from "components/Menu"
function Header(props: any) {
  let [isVisible, setIsVisible] = useState(true)
  const searchInputRef: any = useRef();
  const searchIconRef: any = useRef();
  let history = useHistory();
  useEffect(() => {
    onWatchScroll(200, setIsVisibleFalse, setIsVisibleTrue)
  }, [])

  let user = useSelector((state: StateStore) => state.userStore.user)
  let [state, setState] = useSetState({
    isShowPanel: false,
    isShowNavigator: false,
    inputValue: ''
  })

  // 点击头像其他地方，隐藏MenuNav组件
  const coverRef = useRef(null);
  useClickAway(() => {
    setIsShowNavigatorFalse()
  }, coverRef);

  // 绑定监听，监听回车键的搜索事件
  useKeyPress('enter', () => {
    console.log("entry");
    console.log(state);
    debugger
    
    onGoToSearch()
  });
  const menu = (
    <Menu onClick={(e) => { handleMenuClick(e) }}>
      <Menu.Item key="1">
        <a href="/juejin/pins/recommended/">发布沸点</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={["main-header main-header", isVisible ? "visible" : null].join(' ')}>
      <div className="header-container">
        <a href="/" className="logo">
          <img src="/sunny.png" alt="前端阳光" className="logo-img" />
        </a>

        <nav role="navigation" className="main-nav">
          <ul className="nav-list">
            <li className="main-nav-list">
              <ul className="phone-hide" >
                <li className="nav-item link-item router-link-exact-active route-active">
                  <NavLink to="/juejin/home/" activeClassName="active">首页</NavLink>
                </li>
                <li className="nav-item link-item activities" >
                  <NavLink to="/juejin/pins/recommended/" activeClassName="active">沸点</NavLink>
                </li>
                <li className="nav-item link-item book" >
                  <NavLink to="/juejin/books/" activeClassName="active">小册</NavLink>
                </li>

                <li className="nav-item link-item">
                  <NavLink to="/juejin/event" activeClassName="active">活动</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item search">
              <form role="search" className="search-form" ref={searchInputRef} >
                <input type="search" maxLength={32} placeholder="探索阳光" className="search-input"
                  value={state.inputValue}
                  onChange={(e) => setState({ inputValue: e.target.value })}
                  onBlur={() => removeActiveClass(searchInputRef, searchIconRef)}
                  onFocus={() => addActiveClass(searchInputRef, searchIconRef)} />
                <SearchOutlined className="search-icon" ref={searchIconRef} onClick={() => onGoToSearch()} />
              </form>
            </li>
            <li className="nav-item add">
              <Dropdown.Button overlay={menu} type="primary" onClick={onGoToEdit}>写文章</Dropdown.Button>
            </li>
            <li className="nav-item notification">
              <a className="app-link" href="/notification">
                <BellFilled className="notification-bell" />
              </a>
            </li>
            {
              user?.git_name &&
              <>
                <li className="nav-item menu">
                  <img src={user.avatar_url} alt="阳光是sunny的头像" className="lazy avatar avatar immediate" onClick={onToggleNavigatorVisible} ref={coverRef} />
                  <div style={{ marginTop: -10 }}>
                    {
                      state.isShowNavigator &&
                      <MenuNav isHome={true} />
                    }
                  </div>
                </li>

              </>
            }
            {
              !user?.git_name &&
              <li className="nav-item auth" >
                <button className="login-button" onClick={() => { props.setShowLoginModal(true) }}>登录</button>
              </li>
            }
          </ul>
        </nav>
      </div>
    </div>
  )
  // 点击头像，切换隐藏显示选择板块
  function onToggleNavigatorVisible() {
    setState({
      isShowNavigator: !state.isShowNavigator
    })
  }
  // 点击回车键，触发搜索事件
  function onClickEntryKey(){
    
  }
  function setIsShowNavigatorFalse() {
    setState({
      isShowNavigator: false
    })
  }
  function onGoToEdit() {
    history.push("/editor");
  }
  function onGoToSearch() {
    debugger
    history.push("/juejin/search?keyWord=" + state.inputValue);
  }
  function setIsVisibleTrue() {
    setIsVisible(true)
  }
  function setIsVisibleFalse() {
    setIsVisible(false)
  }
  function handleMenuClick(e: any) {
  }
  function addActiveClass(ref: any, searchIconRef: any) {
    ref.current.classList.add("active")
    searchIconRef.current.classList.add("active")
  }
  function removeActiveClass(ref: any, searchIconRef: any) {
    ref.current.classList.remove("active")
    searchIconRef.current.classList.remove("active")
  }
}

export default Header