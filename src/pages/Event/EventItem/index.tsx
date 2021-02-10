
import { useRequest, useSetState } from "ahooks";
import "./style.less"

import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import StateStore from "store"
interface EventItemProps {
  event: any
}
function Home(props: EventItemProps) {
  let categoryList: any = useSelector((state: StateStore) => state.categoryStore.category_list)
  let user: any = useSelector((state: StateStore) => state.userStore.user)
  const BASE_URL = '/juejin/home/'
  const [articleState, setArticleState] = useSetState({
    articleList: [],
    cateItem: categoryList[0],
    pageNum: 0,
    pageSize: 10,
  })
  const { event } = props
  return (


    <a className="events" href={event.eventLink} target="_blank" >
      <div className="events-inner">
        <div className="banner" >
          <img src={window.location.host.includes("localhost") ? `http://localhost:5001/${event.eventCoverUrl}` : event.eventCoverUrl} alt="" />
        </div>
        <div className="message">
          <div className="title">{event.eventTitle}</div>
          <div className="date"><span className="icon icon-calendar"></span> <span>{event.eventTime}</span></div>
          <div className="bottom">
            <div className="address">
              <span className="icon icon-location"></span>
              <span>{event.eventLocation}</span>
            </div>
            <div className="btn-join">报名参加</div></div></div>
      </div>
    </a>
  )

  // 选择分类触发更新,获得 标签列表
  function onSelectCategory(cateItem: any) {
    console.log(cateItem);
    setArticleState({
      cateItem
    })
  }


}
export default Home