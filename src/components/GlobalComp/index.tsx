import "./style.less"
import { CloseOutlined } from "@ant-design/icons"
import { Form, Input } from "antd"
import { useState } from 'react';
function GlobalComp(props: any) {
    let [isShowNormalImg, setIsShowNormalImg] = useState(true)
    let [isOtherLoginStyle, setIsOtherLoginStyle] = useState(false)
    return (
        <div className="global-component-box" >
            { props.isShowLoginModal &&
                <div className="auth-modal-box">
                    <Form action="" className="auth-form">
                        <div className="panfish">
                            {
                                isShowNormalImg &&
                                <img src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/normal.0447fe9.png" className="normal" alt="1"/>
                            }
                            {
                                !isShowNormalImg &&
                                <img src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/greeting.1415c1c.png" className="greeting" alt="1"/>
                            }

                            <img src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/blindfold.58ce423.png" className="blindfold" style={{ display: 'none' }} alt="1"/>

                        </div>
                        <CloseOutlined className="close-btn ion-close-round" onClick={() => { props.setShowLoginModal(false) }} />
                        <div className="panel">
                            <h1 className="title">手机登录</h1>
                            <Form.Item name={['user', 'name']} label="" rules={[{}]}>
                                <Input placeholder="账号" onFocus={onFocus} onBlur={onBlur} />
                            </Form.Item>
                            <Form.Item name={['user', 'email']} label="" rules={[{ type: 'email' }]}>
                                <Input placeholder="密码" />
                            </Form.Item>
                            <button className="btn">
                                登录
                        </button>
                            <div className="prompt-box">
                                {
                                    !isOtherLoginStyle &&
                                    <span className="clickable" onClick={() => { setIsOtherLoginStyle(true) }}>
                                        其他登录方式
                                    </span>
                                }
                                {
                                    isOtherLoginStyle &&
                                    <>
                                        <span className="clickable" onClick={() => { setIsOtherLoginStyle(false) }}>
                                            手机登录
                                        </span>
                                        <span className="right clickable">
                                            忘记密码
                                        </span>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="oauth-box">
                            <div className="oauth">
                                <div className="oauth-bg">
                                    <img title="微博" alt="微博" src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/weibo.fa758eb.svg" className="oauth-btn" />
                                </div>
                                <div className="oauth-bg">
                                    <img title="微信" alt="微信" src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/wechat.e0ff124.svg" className="oauth-btn" />
                                </div>
                                <div className="oauth-bg">
                                    <img title="GitHub" alt="GitHub" src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/github.547dd8a.svg" className="oauth-btn" onClick={goToGithubLogin}/>
                                </div>
                            </div>
                        </div>

                    </Form>
                </div>
            }
        </div>
    )

    function goToGithubLogin(){
        window.location.href = "https://github.com/login/oauth/authorize?client_id=d1d8edec3f85e60918f9&redirect_uri=http://localhost:3000/juejin/home"
    }
    function onFocus() {
        setIsShowNormalImg(false)
    }
    function onBlur() {
        setIsShowNormalImg(true)
    }
}

export default GlobalComp