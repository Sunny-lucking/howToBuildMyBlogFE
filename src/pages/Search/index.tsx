import Navigation from "components/Navigation"
import TagNavigator from "./TagNavigator"
import EntryListWrap from "components/EntryList/EntryListWrap"
import Aside from "./Aside"
import { useRequest, useSetState } from "ahooks";
import "./style.less"
import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import StateStore from "store"
import "./style.less"
import { throttle } from "constants/utils"
import { GetArticleList } from "service/article"
import { ArticleVO } from "models"
import { useHistory } from "react-router-dom"
import queryString from "query-string"
import { notification } from "antd"
interface ArticleState {
  articleList: any[],
  pageNum: number,
  pageSize: number,
}
function Home(props: any) {
  const history = useHistory()
  let categoryList: any = [

  ]
  // const commonNavList: navItem[] = [
  //   { label: "文章", category_url: type="", _id: "recommend", tags: [] },
  //   ...user._id ? [{ label: "关注", category_url: "following", _id: "following", tags: [] }] : [],
  // ]
  const BASE_URL = '/juejin/home/'
  const [articleState, setArticleState] = useSetState<ArticleState>({
    articleList: [],
    pageNum: 0,
    pageSize: 10,
  })
  const containerRef = useRef()


  let getMoreLatestThrottle = throttle(getLatestArticle);


  //  目前去除前綴的url
  const currentUrl = history.location.pathname.replace(BASE_URL, '')
  const { keyWord } = queryString.parse(history.location.search)
  // 监听到url变化了，就发起请求，此时的请求一般会带上cateId和tagId 。也要支持带上sort
  useEffect(() => {
    setArticleList()
  }, [currentUrl, keyWord])

  useEffect(() => {
    function getMoreListListener() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
        getMoreLatestThrottle();
      }
    }
    window.addEventListener('scroll', getMoreListListener)
    return function () {
      window.removeEventListener('scroll', getMoreListListener)
    }
  })

  return (
    <div className="view timeline-index-view">
      <Navigation baseUrl={BASE_URL} commonNavList={[]} navList={categoryList} onChange={(value) => onSelectCategory(value)} />
      <div className="timeline-container">
        <div className="timeline-content">
          <div className="timeline-entry-list">
            <EntryListWrap articleList={articleState.articleList} onArticleListChange={onArticleListChange} />
          </div>
        </div>
      </div>
    </div>
  )

  // // 选择分类触发更新,获得 标签列表
  function onSelectCategory(cateItem: any) {
    console.log(cateItem);
    // setArticleState({
    //   cateItem
    // })
  }
  function setArticleList() {
    let params = {
      pageNum: 1,
      keyWord
    }
    getMoreLatestThrottle(params)
  }
  function onArticleListChange() {
    getMoreLatestThrottle({
      pageNum: 1,
      pageSize: (articleState.pageNum - 1) * articleState.pageSize,
    })
  }
  async function getLatestArticle(config?: any) {
    setArticleState({
      articleList: undefined
    })
    let params = {
      pageNum: articleState.pageNum,
      pageSize: articleState.pageSize,
      ...config
    }
    let  result:any = await GetArticleList(params)
    if (result.data.code === 0) {

      // 将返回的文章的标题进行关键字高亮显示
      let articleList = result.data.articleList.filter((article:any,index:number)=>{
        var re =new RegExp(keyWord as string,"g"); //定义正则
        article.title=article.title.replace(re, `<span class="keyword">${keyWord}</span>`); //进行替换，并定义高亮的样式
        return article
      })
      setArticleState({
        pageNum: articleState.pageNum + 1,
        articleList: config?.pageNum === 1 ? [].concat(articleList) : articleState.articleList?.concat(articleList)
      })
    } else {

      notification.open({ message: result.data.msg })
    }
  }
}



export default Home