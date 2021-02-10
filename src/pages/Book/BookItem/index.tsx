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
        pinValue: '',
        tagIndex: -1,
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
                                {/* <img data-v-3ce2bd44="" src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/e62ad4bea75d27e49ccae4349b801f49~300x300.image" alt="JowayYoung的头像" className="lazy avatar hero" data-src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/e62ad4bea75d27e49ccae4349b801f49~300x300.image" /> */}
                                <div className="username author-name">
                                    <span className="name" style={{ maxWidth: '128px' }}>
                                        朴灵
                                    </span>
                                    {/* <a href="/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022" target="_blank" rel="" className="rank">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDIzIDE0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0ZGQTAwMCIgZD0iTTMgMWgxN2EyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMkgzYTIgMiAwIDAgMS0yLTJWM2EyIDIgMCAwIDEgMi0yeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zIDRoMnY3SDN6TTggNmgybDIgNWgtMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQgNmgtMmwtMiA1aDJ6TTMgOWg1djJIM3pNMTggOGgydjNoLTJ6TTE1IDNoNXYyaC01ek0xNSA5aDN2MmgtM3pNMTYgNmgzdjJoLTN6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTE4IDZoMnYyaC0yek0xNSA1aDJ2M2gtMnoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" alt="lv-5" />
                                    </a> */}
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
                                {/* <span >16小节</span> */}
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
        var a = document.createElement('a');
        // var url = window.URL.createObjectURL();
        var filename = '';
        a.href = "/深入浅出Node.js-朴灵.pdf";
        a.download = filename;
        a.click();
        // window.URL.revokeObjectURL(url);
    }
    async function SendCode(value: any) {
        if (true === true) {
            download()
        }
    }
}
export default BookItem
