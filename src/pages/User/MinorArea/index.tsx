import "./style.less"
import moment from "moment"

interface Iprops {
    authorInfo: any
}
function MinorArea(props: Iprops) {
    const { authorInfo } = props
    return (

        <div className="minor-area">
            <div className="sticky-wrap sticky">
                <div className="stat-block block shadow">
                    <div className="block-title">个人成就</div>
                    <div className="block-body">
                        <div className="stat-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" className="zan"><g fill="none" fillRule="evenodd" transform="translate(0 .57)"><ellipse cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5" ry="12.57"></ellipse> <path fill="#7BB9FF" d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"></path></g>
                            </svg>
                            <span className="content">获得点赞
                                <span className="count">{authorInfo.praiseCount}</span>
                            </span>
                        </div>
                        <div className="stat-item">
                            <svg width="25" height="25" viewBox="0 0 25 25" className="icon stat-view-icon"><g fill="none" fillRule="evenodd"><circle cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle> <path fill="#7BB9FF" d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"></path></g>
                            </svg>
                            <span className="content">文章被阅读
                                     <span className="count">{authorInfo.pvCount}</span>
                            </span>
                        </div>
                        {/* <div className="stat-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" className="icon stat-jp-icon"><g fill="none" fillRule="evenodd"><circle cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle> <path fill="#7BB9FF" d="M16.694 13.516l-3.719 3.055a1.1 1.1 0 0 1-1.412-.013l-2.77-2.362-3.597 2.437a.693.693 0 0 1-.895-.101.649.649 0 0 1-.008-.876l3.68-4.096a1.1 1.1 0 0 1 1.507-.122l2.653 2.135 2.248-2.4-1.34-1.358a.5.5 0 0 1 .327-.85l5.438-.313a.5.5 0 0 1 .528.533l-.368 5.449a.5.5 0 0 1-.855.317l-1.417-1.435z"></path></g>
                                </svg>
                                <span className="content">掘力值
                                        <span className="count">2,389</span>
                                </span>
                            </div> */}
                    </div>
                </div>
                <div className="follow-block block shadow">
                    <a href={`/juejin/user/${authorInfo._id}/followers`} className="follow-item">
                        <div className="item-title">关注了</div>
                        <div className="item-count">{props.authorInfo?.followers?.length}</div></a>
                    <a href={`/juejin/user/${authorInfo._id}/fans`} className="follow-item">
                        <div className="item-title">关注者</div>
                        <div className="item-count">{props.authorInfo?.fans?.length}</div>
                    </a>
                </div>
                <div className="more-block block">
                    <a href={`/juejin/user/${props.authorInfo?._id}/collects`} className="more-item"><div className="item-title">收藏集</div><div className="item-count">{props.authorInfo?.favorites?.length}</div>
                    </a>
                    {/* <a href="/user/1204720476893064/tags" className="more-item">
                            <div className="item-title">关注标签</div>
                            <div className="item-count">5</div>
                        </a> */}
                    <div className="more-item">
                        <div className="item-title">加入于</div>
                        <div className="item-count">
                            <time dateTime="2019-12-03T16:15:43.000Z" title="2019-12-04 00:15:43" className="time">{moment(props.authorInfo?.createTime).format('YYYY-MM-DD')}</time>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MinorArea