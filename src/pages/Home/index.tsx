import Navigation from "components/Navigation"
import TagNavigator from "./TagNavigator"
import EntryList from "components/EntryList"
import Aside from "./Aside"
import { useRequest, useSetState } from "ahooks";
import "./style.less"
import { GetArticleList } from "service/article"
import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import StateStore from "store"
import {navItem} from "models"
interface ArticleState {
  articleList: any[],
  cateItem: any,
  pageNum: number,
  pageSize: number,
}
function Home(props: any) {
  let categoryList: any = useSelector((state: StateStore) => state.categoryStore.category_list)
  let user: any = useSelector((state: StateStore) => state.userStore.user)
  const BASE_URL = '/juejin/home/'
  const [articleState, setArticleState] = useSetState<ArticleState>({
    articleList: [],
    cateItem: categoryList[0],
    pageNum: 0,
    pageSize: 10,
  })
  const containerRef = useRef()

  const commonNavList: navItem[] = [
    { label: "推荐", category_url: "recommend", _id: "recommend", tags: [] },
    ...user._id ? [{ label: "关注", category_url: "following", _id: "following", tags: [] }] : [],
  ]


  return (
    <div className="view timeline-index-view">
      <Navigation commonNavList={commonNavList} baseUrl={BASE_URL} navList={categoryList} onChange={(value) => onSelectCategory(value)} />
      <div className="timeline-container">
        <TagNavigator baseUrl={BASE_URL} cateItem={articleState.cateItem} />
        <div className="timeline-content">
          <div className="timeline-entry-list">
            <EntryList isShowListHeader={true} containerRef={containerRef} />
          </div>
          <Aside />
        </div>
      </div>
    </div>
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