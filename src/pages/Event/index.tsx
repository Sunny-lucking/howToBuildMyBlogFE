
import { useRequest, useSetState } from "ahooks";
import "./style.less"
import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import StateStore from "store"
import EventItem from "./EventItem"
import { Button, Affix, Tooltip } from "antd"
import { BulbOutlined } from "@ant-design/icons"
import "./style.less"
import { GetEventList } from "service/event"

function Event(props: any) {
  let categoryList: any = useSelector((state: StateStore) => state.categoryStore.category_list)
  let user: any = useSelector((state: StateStore) => state.userStore.user)
  const BASE_URL = '/juejin/home/'
  const [articleState, setArticleState] = useSetState({
    articleList: [],
    cateItem: categoryList[0],
    pageNum: 0,
    pageSize: 10,
  })
  const containerRef = useRef()


  const [state, setState] = useSetState({
    eventList: []
  })
  useEffect(() => {
    getEvents()
  }, [])
  return (
    <div className="view events-index-view">
      <div className="content">
        <div className="events-wrap">
          <Affix offsetTop={500} style={{ position: 'absolute', top: 100, right: -100 }}>
            <a href="/upload?type=event" target="_blank" rel="noopener noreferrer">
              <Tooltip placement="top" title={"发布广告"}>
                <button title="建议反馈" className="btn meiqia-btn">
                  <BulbOutlined className="event-icon" />
                </button>
              </Tooltip>
            </a>
          </Affix>

          <div className="events-list">
            {
              state.eventList.map((item:any,index:number)=>(
                <EventItem event={item} key={item._id}/>

              ))
            }

          </div>
        </div>
      </div>

    </div>
  )

  async function getEvents() {
    const result: any = await GetEventList({})
    if (result.data.code === 0) {
      setState({
        eventList: result.data.events
      })
    }
  }

  // 选择分类触发更新,获得 标签列表
  function onSelectCategory(cateItem: any) {
    console.log(cateItem);
    setArticleState({
      cateItem
    })
  }




}
export default Event