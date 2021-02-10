import "./style.less"
import {onWatchScroll} from "constants/utils"
import { useEffect,useState } from "react"
import { NotificationOutlined ,CloudUploadOutlined} from "@ant-design/icons"
function BookAside() {
    let [isTop, setIsTop] = useState(false)
    useEffect(()=>{
        let removeWatcher = onWatchScroll(200,setIsTopTrue,setIsTopFalse)
        return removeWatcher
    },[])
    return (
        <div className={["aside", isTop ? "top" : null].join(' ')}>
            <div className="sticky-section">
                <div className="section announcement">
                    <div className="announcement-content">
                        <NotificationOutlined className="announcement-icon"/>
                        <span>上传公共资料公告</span>
                    </div>
                </div>
                <div className="section">
                    <div className="slogan">
                        <div className="title">为什么要分享资料？</div>
                        <div className="desc">营造一个我为人人，人人为我的技术学习平台</div>
                    </div>
                    <div className="wechat-qr">
                        <div className="title">上传资料规范：</div>
                        <div className="desc">请上传属于个人版权的文件资料，个人行为均与本平台无关，有侵权地方，请扫码联系下方工作人员</div>

                        <div className="qr-img">

                        </div>
                    </div>
                </div>
                <div className="section help">
                    <a href="/upload?type=book" target="_blank" rel="" className="items author">
                        {/* <img src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/author.c5d975e.png" alt="1"/> */}
                        <CloudUploadOutlined className="help-icon"/>
                        <div className="title">上传文件</div>
                    </a>
                    {/* <a href="/topic/6824710202692993037?sort=newest" target="_blank" rel="" className="items feedback" >
                        <img src="//sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/feedback.1230fb5.png" alt="1"/>
                        <div className="title">建议反馈</div>
                    </a> */}
                </div>
            </div>
        </div >
    )

    function setIsTopTrue() {
        setIsTop(true)
    }
    function setIsTopFalse() {
        setIsTop(false)
    }
}
export default BookAside
