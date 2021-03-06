import "./style.less"
import { RightOutlined } from "@ant-design/icons"
import Advertisement from "components/Advertisement"
import { GetAuthorList } from "service/user"
import { useSetState } from "ahooks"
import { useEffect } from "react"
import {NavLink} from "react-router-dom"
import {notification} from "antd"
function Aside() {

    const [state, setState] = useSetState({
        authorInfoList: []
    })
    useEffect(() => {
        setAuthorInfoList()
    }, [])
    return (
        <aside className="index-aside aside">
            <Advertisement />
            <div className="sidebar-block user-block">
                <div className="recommend-author-block sticky-author-block">
                    <header className="user-block-header">
                        🎖️作者榜
                    </header>
                    <div className="user-list">
                        {
                            state.authorInfoList && state.authorInfoList.map((item:any, index:number) => (
                                <div className="item" key={index}>
                                    <NavLink className="link" to={`/juejin/user/${item._id}/posts`} target="_blank">
                                        <img src={item?.avatar_url} alt={`${item?.git_name}的头像`} className="lazy avatar avatar" data-src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/647bbb13384358a57273be9477cc43f5~300x300.image" />
                                        <div className="user-info">
                                            <div className="username username">
                                                <span className="name" style={{ maxWidth: 128 }}>{item?.git_name} </span>
                                                {/* <a href="/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022" target="_blank" rel="" className="rank">
                                                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDIzIDE0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iIzZFQ0VGRiIgZD0iTTMgMWgxN2EyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMkgzYTIgMiAwIDAgMS0yLTJWM2EyIDIgMCAwIDEgMi0yeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zIDRoMnY3SDN6TTggNmgybDIgNWgtMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQgNmgtMmwtMiA1aDJ6TTMgOWg1djJIM3pNMTUgM2g1djJoLTV6TTE4IDVoMnYyaC0yek0xNSA5VjdoMnYyeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xNSA4VjZoNXYyek0xNSA5aDV2MmgtNXoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" alt="lv-2" />
                                                </a> */}
                                            </div>
                                            <div className="position"> 前端阳光</div>
                                        </div>
                                    </NavLink>
                                </div>
                            ))
                        }

                        <a href="/juejin/userRank" className="item" target="_blank">
                            <div className="more">
                                <span>完整榜单</span>
                                <RightOutlined />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="link">
                <h4 className="link-title">友情链接</h4>
                <ul className="link-list">
                    <a target="_blank" rel="noreferrer" href="http://101.37.32.66:5000" className="link-item" style={{ textDecoration: 'none' }}>博客后台管理</a>
                    <a target="_blank" rel="noreferrer" href="http://101.37.32.66:5002" className="link-item" style={{ textDecoration: 'none' }}>小羊商城（移动端）</a>
                    <a target="_blank" rel="noreferrer" href="http://101.37.32.66:5002/small_route" className="link-item" style={{ textDecoration: 'none' }}>亦称家具(微信小程序)</a>
                </ul>
            </div>
            <div className="sidebar-block more-block" >
                <ul className="more-list" >
                    <li className="item" >
                        <a href="/about" target="_blank">关于</a>
                    </li>
                    <li className="item" >
                        <a href="/license" target="_blank" rel="" >
                            营业执照
                    </a>
                    </li>
                    <li className="item" >
                        <a href="/links" target="_blank">友情链接</a>
                    </li>
                </ul>
                <ul className="more-list" >
                    <li className="item" >
                        <a href="/terms" target="_blank">用户协议</a>
                    </li>
                    <li className="item" ><a href="/privacy" target="_blank">隐私政策</a></li>
                    <li className="item" ><a href="/book/5c90640c5188252d7941f5bb" target="_blank">
                        使用指南
        </a>
                    </li>
                </ul>
                <ul className="more-list" >
                    <li className="item" >
                        <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">
                            京ICP备18012699号-3
                        </a>
                    </li>
                </ul>
                <ul className="more-list" >
                    <li className="item" >
                        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802026719" target="_blank" rel="noreferrer">
                            京公网安备11010802026719号
                        </a>
                    </li>
                    <li className="item" >
                        <span >版权所有：北京北比信息技术有限公司</span>
                    </li>
                    <li className="item" >
                        <span >公司地址：北京市海淀区信息路甲28号13层B座13B-5</span>
                    </li>
                    <li className="item" >
                        <span >公司座机：010-83434395</span>
                    </li>
                </ul>
                <ul className="more-list" >
                    <li className="item" >
                        <a href="/">©2020 掘金</a>
                    </li>
                </ul>
                <ul className="more-list account-list" >
                    <li className="item weibo" >
                        <a href="http://weibo.com/xitucircle" rel="nofollow noopener noreferrer" target="_blank">
                            <img src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/weibo.0cd39f5.png" alt="微博" className="icon" />
                        </a>
                    </li>
                    <li className="item wechat" >
                        <img src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/wechat.ce329e6.png" alt="微信" className="icon" />
                        <div className="qr-panel" >
                            <div className="title" >微信扫一扫</div>
                            <img src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/juejin-qr.b247fde.jpeg" className="qr" alt="微信" />
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    )
    async function setAuthorInfoList() {
        const result: any = await GetAuthorList({})
        if (result.data.code === 0) {
            setState({
                authorInfoList: result.data.userList
            })
        }else{
            notification.open({
                message: result.data.msg,
            });
        }
    }
}
export default Aside;