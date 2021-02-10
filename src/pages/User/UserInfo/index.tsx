import "./style.less"
import { useHistory } from "react-router-dom";
import { useSetState } from "ahooks";
import { useSelector } from "react-redux"
import StateStore from "store";
import { FollowAuthor, UnFollowAuthor } from "service/user"
import FollowBtn from "components/FollowBtn"
import { message, notification } from "antd"
interface UserProps {
    authorInfo: any,
    onFollowChange: () => void
}
function UserInfo(props: UserProps) {
    let history = useHistory();
    const { authorInfo } = props
    const user = useSelector((state: StateStore) => state.userStore.user)
    return (
        <div className="user-info-block block shadow">
            <meta itemProp="url" content="https://juejin.cn/user/1204720476893064" />
            <meta itemProp="image" content="https://user-gold-cdn.xitu.io/2020/4/30/171c7ef8dbbbc1bf?w=500&amp;h=500&amp;f=png&amp;s=256890" />
            <meta itemProp="name" content="阳光是sunny" />
            <meta itemProp="jobTitle" content="公众号" />
            <div itemProp="memberOf"><meta itemProp="name" content="前端阳光" /></div>
            <img src={authorInfo?.avatar_url} alt="阳光是sunny的个人资料头像" className="lazy avatar avatar" />
            <div className="info-box info-box">
                <div className="top">
                    <h1 className="username">{authorInfo?.git_name}<a href="/book/5c90640c5188252d7941f5bb/section/5c9065385188252da6320022" target="_blank" rel="" className="rank rank">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDIzIDE0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iIzU5OURGRiIgZD0iTTMgMWgxN2EyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMkgzYTIgMiAwIDAgMS0yLTJWM2EyIDIgMCAwIDEgMi0yeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zIDRoMnY3SDN6TTggNmgybDIgNWgtMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQgNmgtMmwtMiA1aDJ6TTMgOWg1djJIM3pNMTUgM2g1djJoLTV6TTE4IDVoMnYxaC0yek0xOCA4aDJ2MWgtMnpNMTYgNmg0djJoLTR6TTE1IDloNXYyaC01eiIvPgogICAgPC9nPgo8L3N2Zz4K" alt="lv-3" />
                    </a>
                    </h1>
                </div>
                <div className="position">
                    <svg width="21" height="18" viewBox="0 0 21 18" className="icon position-icon"><g fill="none" fillRule="evenodd"><path fill="#72777B" d="M3 8.909V6.947a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1V8.92l-6 2.184v-.42c0-.436-.336-.79-.75-.79h-1.5c-.414 0-.75.354-.75.79v.409L3 8.909zm0 .7l6 2.184v.47c0 .436.336.79.75.79h1.5c.414 0 .75-.354.75-.79v-.46l6-2.183V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.609zm6.75 1.075h1.5v1.58h-1.5v-1.58z"></path> <path stroke="#72777B" d="M7.5 5.213V4A1.5 1.5 0 0 1 9 2.5h3A1.5 1.5 0 0 1 13.5 4v1.213"></path></g>
                    </svg>
                    <span className="content">
                        <span >{authorInfo.company}</span>
                        <span className="divider">
                            | </span>
                        <span >{authorInfo.location}</span>
                    </span>
                </div>
                <div className="intro">
                    <svg width="21" height="18" viewBox="0 0 21 18" className="icon intro-icon"><path fill="#72777B" fillRule="evenodd" d="M4 4h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3 3a3 3 0 0 0-6 0h6zM5 7v1h4V7H5zm0 2.5v1h4v-1H5zM5 12v1h4v-1H5z"></path>
                    </svg>
                    <span className="content">{authorInfo.bio}</span></div>
            </div>
            <div className="action-box">
                <div className="link-box link-box">
                    <a title="绑定微博" className="weibo-link link inactive" rel="nofollow noopener noreferrer" target="_blank" href="/#">
                        <svg width="21" height="18" viewBox="0 0 21 18" className="icon weibo-icon"><g fill="none" fillRule="nonzero"><path fill="#D52B2A" d="M15.343 8.474c-.268-.08-.452-.135-.311-.489.304-.767.335-1.429.005-1.9-.619-.887-2.312-.839-4.252-.025 0 0-.61.267-.454-.217.299-.961.254-1.767-.21-2.232-1.054-1.055-3.853.04-6.254 2.445-1.798 1.802-2.842 3.711-2.842 5.362 0 3.158 4.042 5.078 7.996 5.078 5.184 0 8.633-3.018 8.633-5.413 0-1.448-1.217-2.27-2.31-2.609zm-6.311 6.89c-3.156.312-5.88-1.117-6.084-3.193-.205-2.075 2.187-4.01 5.342-4.323 3.156-.313 5.88 1.117 6.085 3.191.204 2.077-2.187 4.012-5.343 4.325z"></path> <path fill="#E89213" d="M18.786 2.695a5.039 5.039 0 0 0-4.803-1.558.731.731 0 0 0 .304 1.43 3.584 3.584 0 0 1 3.415 1.108 3.6 3.6 0 0 1 .75 3.516.73.73 0 0 0 1.39.451v-.003a5.06 5.06 0 0 0-1.056-4.944"></path> <path fill="#E89213" d="M16.863 4.433a2.453 2.453 0 0 0-2.34-.758.63.63 0 0 0 .263 1.23v.002a1.202 1.202 0 0 1 1.394 1.548.629.629 0 0 0 1.195.387 2.462 2.462 0 0 0-.512-2.409"></path> <path fill="#040000" d="M9.347 9.445c-1.501-.391-3.199.359-3.85 1.684-.665 1.352-.023 2.853 1.494 3.344 1.572.507 3.424-.27 4.068-1.73.635-1.426-.158-2.895-1.712-3.298zm-1.146 3.453c-.306.488-.96.702-1.451.476-.486-.221-.629-.788-.324-1.263.302-.474.934-.685 1.422-.48.495.211.652.774.353 1.267zm1.005-1.293c-.11.189-.354.28-.545.201-.188-.077-.247-.289-.14-.474.11-.185.344-.276.531-.201.19.07.26.284.154.474z"></path></g>
                        </svg>
                    </a>
                    <a title="GitHub" className="github-link link" href="https://github.com/Sunny-lucking" rel="nofollow noopener noreferrer" target="_blank">
                        <svg width="21" height="18" viewBox="0 0 21 18" className="icon github-icon"><path fill="#161614" fillRule="nonzero" d="M1.857 9.203c0 3.624 2.456 6.698 5.862 7.782.429.076.585-.177.585-.395 0-.194-.007-.71-.012-1.395-2.384.496-2.887-1.1-2.887-1.1-.39-.947-.952-1.2-.952-1.2-.778-.508.06-.498.06-.498.86.058 1.312.846 1.312.846.765 1.253 2.007.89 2.495.68.078-.529.3-.89.544-1.095-1.903-.207-3.904-.911-3.904-4.054 0-.896.334-1.628.882-2.201-.088-.208-.383-1.042.084-2.171 0 0 .72-.22 2.357.84a8.557 8.557 0 0 1 2.146-.276 8.566 8.566 0 0 1 2.146.277c1.636-1.062 2.354-.841 2.354-.841.468 1.129.174 1.963.086 2.17.55.574.881 1.306.881 2.202 0 3.15-2.004 3.844-3.913 4.047.307.253.581.754.581 1.52 0 1.096-.01 1.98-.01 2.25 0 .219.154.474.589.394C16.546 15.898 19 12.825 19 9.203 19 4.673 15.162 1 10.428 1c-4.733 0-8.57 3.672-8.57 8.203z"></path>
                        </svg>
                    </a>
                    <a title="设置个人主页地址" className="site-link link inactive" rel="nofollow noopener noreferrer" target="_blank" href="/#">
                        <svg width="21" height="18" viewBox="0 0 21 18" className="icon site-icon"><path fill="#0062D1" fillRule="evenodd" d="M12.956 5.684l-.04.08-.472-.043.1-.432.412.395m-1.459-1.84l-.663-.29c.452-.216.55-.17.663.29m1.683.133l-.11.02-2.015-2.098 2.394 1.091c-.271.228-.428.554-.269.987M10.334 1.93l.564-.205.078.074c-.11.127-.208.269-.339.366-.025.02-.175-.133-.303-.235m.018.619c.517.025.862.358 1.221.667l-.078.14-1.209-.688.066-.119M8.885 2.42c.202.051.393.085.57.157.03.012.03.253-.013.274-.146.076-.318.101-.49.149l-.067-.58m2.267 10.777c-.182-.2-.338-.423-.5-.64-.276-.366-.293-.75-.065-1.145.07-.122.152-.253.17-.388.035-.271-.13-.335-.376-.359-.18-.018-.463-.107-.503-.23-.189-.588-.728-.62-1.152-.773-.428-.153-.745-.336-.924-.78-.129-.318-.336-.603-.508-.903l-.05.018.167.739c-.112-.174-.185-.25-.215-.34-.207-.623-.481-1.237-.576-1.878-.055-.371.183-.788.292-1.183.016-.057.079-.112.073-.163a18.42 18.42 0 0 0-.13-.918c-.072-.432-.29-.504-.633-.22-.111.093-.232.172-.348.258l-.096-.101c.225-.28.41-.608.682-.826.39-.314.724-.756 1.386-.535.344.115.715.18 1.074.291.308.095.695-.076 1.047-.13L9.95 2.88l.515.339c.045.25-.04.443-.388.46-.091.004-.188.079-.266.142-.425.343-.399.572.086.822.533.274.533.274.701.638.053-.291.102-.583.16-.873.033-.168.079-.333.119-.5.14.065.276.143.422.193.376.13.691.347.952.65.09.106.186.207.335.373l-1.124.517-.005.152c.459-.47.5.087.737.173-.026.05-.04.09-.048.09-.687-.114-.782.618-1.207.877-.035.022-.08.083-.073.112.09.337-.14.482-.34.672-.085.082-.098.266-.1.405-.003.117.057.236.09.354l-.092.05c-.055-.068-.126-.128-.162-.205-.168-.358-.384-.435-.752-.27a.495.495 0 0 1-.247.03c-.368-.04-.555.09-.624.449-.08.408.103.87.385.92.087.015.205-.061.284-.126.11-.09.198-.209.295-.315l.103.053-.142.613c.119.035.238.046.327.104.08.053.18.154.184.239.028.482.425.716.835.475.6-.353 1.192-.206 1.736.098.37.208.659.564 1.022.792.251.157.563.222.855.305.451.128.51.226.304.651-.152.314-.269.674-.5.915-.506.527-1.079.986-1.617 1.482-.458.422-1.224.548-1.254 1.382-.353-.038-.461-.232-.383-.535.109-.425.244-.844.355-1.27.111-.42.019-.79-.277-1.115m4.934-8.278l-.128.09-.47-.757.098-.07.5.737m.487 3.061c.028-.165.062-.333.055-.498a.946.946 0 0 1 .424-.863c.071-.05.24-.06.293-.01.144.137.313.3.361.482.263 1.008.355 2.031.134 3.148-.233-.259-.4-.224-.585-.023-.163.177-.298.147-.441-.085-.42-.685-.365-1.41-.24-2.15m-.288-2.535c-.02-.281-.034-.563-.056-.935.747.402.751 1.15 1.09 1.682l-.452-.537-.078 1.066c-.338-.259-.543-.46-.46-.847.028-.133-.033-.285-.044-.43M10.857 1C6.525 1 3 4.589 3 9s3.525 8 7.857 8c4.333 0 7.857-3.589 7.857-8s-3.524-8-7.857-8"></path>
                        </svg>
                    </a>
                </div>

                {
                    user?._id === authorInfo?._id ?
                        <button className="setting-btn btn" onClick={() => { history.push("/juejin/user_setting"); }}>编辑个人资料</button> :
                        <FollowBtn
                            authorInfo={authorInfo}
                            onFollowChange={props.onFollowChange}
                        />
                }
            </div>
        </div>
    )
}

export default UserInfo