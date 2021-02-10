import "./style.less"
import EntryListWrap from "components/EntryList/EntryListWrap"
import { useEffect, useState } from "react"
import { throttle } from "constants/utils"
import { GetFollowersList } from "service/user"
import { useSetState } from "ahooks"
import { ArticleVO } from "models"
import { NavLink, withRouter } from "react-router-dom"
interface PostsProps {
    userId: string,
    match: any,
}
interface ArticleState {
    followersList: any[],
    pageNum: number,
    pageSize: number,
}
function Fans(props: PostsProps) {
    const userId = props.match.params.id
    const [state, setState] = useState<ArticleState>({
        followersList: [],
        pageNum: 1,
        pageSize: 2,
    })
    
    let getMoreLatestThrottle = getLatestArticle;
    // 进入，先第一次获取列表数据
    useEffect(() => {
        getMoreLatestThrottle()
    }, [])
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

        <div className="concern-list-box">
            <div className="sub-header">
                <div className="sub-header-title">关注</div>
                <div className="sub-type-box">
                    <NavLink to={`/juejin/user/${userId}/followers`} className="sub-type" activeClassName="active">
                        关注了
                    </NavLink>
                    <NavLink to={`/juejin/user/${userId}/fans`} className="sub-type" activeClassName="active">
                        关注者
                    </NavLink>
                    {/* <NavLink to={`/juejin/user/${userId}/tags`}   className="sub-type" activeClassName="active">
                        关注标签 
                    </NavLink> */}
                </div>
            </div>
            <div >
                <ul className="tag-list">
                    {
                        state.followersList.map((item, index) => (
                            <li className="item" key={item._id}>
                                <div className="user">
                                    <meta content="https://juejin.cn/user/2093076318793085" />
                                    <meta content="https://sf1-ttcdn-tos.pstatp.com/img/mosaic-legacy/3793/3114521287~300x300.image" />
                                    <meta content="用户8208211604915" />
                                    <a href={`/juejin/user/${item._id}/post`} target="_blank" rel="" className="link">
                                        <img src={item.avatar_url} alt={item.git_name + "的头像"} className="lazy avatar avatar" />
                                        <div className="info-box">
                                            <div className="username">
                                                <span className="name" style={{ maxWidth: '128px' }}>
                                                    {item.git_name}
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </a>
                                </div>
                            </li>
                        ))
                    }


                </ul>
            </div>
        </div >

    )


    async function getLatestArticle() {
        let result: any = await GetFollowersList({ pageNum: state.pageNum, pageSize: state.pageSize, user_id: userId })
        if (result.data.code === 0) {
            setState((preState: ArticleState) => {
                return {
                    ...preState,
                    pageNum: preState.pageNum + 1,
                    followersList: preState.followersList.concat(result.data.followersList)
                }
            })
        }

    }
}

export default Fans

