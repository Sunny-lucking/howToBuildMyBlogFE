import "./style.less"
import Navigation from "components/Navigation"
import SettingItem from "./SettingItem"
import SettingAvatar from "./SettingAvatar"
function UserSetting() {
    const navList = [
        {label:"< 返回个人主页",href: "/#"},
        {label:"个人资料",href:"/juejin/user_setting"},
        {label:"账号设置",href:"/juejin/user_setting#1"},
    ]
    return (
        <>
            {/* <Navigation navList={navList}/> */}
            <div className="view setting-view">
                <div className="sub-view-box shadow">
                    <div className="view setting-profile-view">
                        <h1 >个人资料</h1>
                        <ul className="setting-list">
                            <SettingAvatar/>
                            <SettingItem
                                title="用户名"
                                placeholder="填写你的用户名"
                            />
                            <SettingItem
                                title="职位"
                                placeholder="填写你的职位"
                            />
                            <SettingItem
                                title="公司"
                                placeholder="填写你的公司"
                            />
                            <SettingItem
                                title="个人介绍"
                                placeholder="填写职业技能、擅长的事情、喜欢的事情等"
                            />
                            <SettingItem
                                title="个人主页"
                                placeholder="填写你的个人主页"
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSetting