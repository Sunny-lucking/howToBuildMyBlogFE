import "./style.less"
import { Modal, Input } from "antd"
import { useSetState } from "ahooks"
import {useHistory} from "react-router-dom"
interface BookItemProps {
    book:any
}
function BookItem(props:BookItemProps) {
    const [state, setState] = useSetState({
        isModalVisible: false,
    })
    const {book} = props
    const history = useHistory()
    return (
        <div className="book-item">
            <div className="item">
                <div className="poster">
                    <img src={window.location.host.includes("localhost")?`http://localhost:5001/${book.fileCoverUrl}`:book.fileCoverUrl} className="lazy poster-img" />
                </div>
                <div className="info">
                    <div className="title">
                        <span >{book.fileTitle}</span>
                    </div>
                    <div className="desc">{book.fileDesc}</div>
                    <div className="author">
                        <div className="author-info">
                            <div>
                                <div className="username author-name">
                                    <span className="name" style={{ maxWidth: '128px' }}>
                                        朴灵
                                    </span>
                                  
                                </div>
                            </div>
                        </div>
                        <div className="author-desc">
                            <span className="selfDescription">
                                {/* 高级前端 @ 网易 */}
                            </span>
                        </div>
                    </div>
                    <div className="other">
                        <a href="/book/6850413616484040711" target="_blank" rel="" className="full-link">
                        </a>
                        <div className="price">
                            <div className="price-text" onClick={() => onShowModal()}>免费下载</div>
                        </div>
                        <div className="messages">
                            <span className="message">
                            </span>
                            <span className="message">
                                <span >1976</span>
                                <span >人已下载</span>
                            </span>
                        </div></div> <div className="review" style={{ display: 'none' }}>审核中</div>
                    <div className="footer-bar" style={{ display: 'none' }}>

                    </div>
                </div>
                <div className="m-aside">
                    <div className="price">
                        ￥19.9
                </div>
                </div>
            </div>

            <Modal title="扫码关注公众号,回复“pdf”获取验证码" visible={state.isModalVisible} onOk={SendCode} onCancel={handleCancel} wrapClassName="modal-container">
                <img src="/gongzhonghao.png" alt="" />
                <Input placeholder="请输入验证码" />
            </Modal>
        </div>
    )

    
    async function onShowModal() {
        setState({
            isModalVisible: true,
        })
    }
    function handleCancel() {
        setState({
            isModalVisible: false,
        })
    }
    function download(){
        let a = document.createElement('a');
        a.href = "http://localhost:5001"+book.zipFileUrl;
        // a.download = book.fileTitle;
        a.download = "1111"
        a.click();
    }
    async function SendCode(value: any) {
        if (true === true) {
            download()
        }
    }
}
export default BookItem
