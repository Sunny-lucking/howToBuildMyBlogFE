import "./style.less"
import { EllipsisOutlined, SmileOutlined } from "@ant-design/icons"
import ForEditor from "./ForEditor"
import { useSetState, useClickAway } from "ahooks"
import { useHistory,useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import StateStore from "store"
import { useState, useRef ,useEffect} from "react"
import { Select, notification, message } from "antd"
import { AddArticle ,GetArticleDetail} from "service/article"
import Menu from "components/Menu"
import queryString from "query-string"

interface Article {
    title: string,
    content: string,
    category: number,
    tag: number,
}

const { Option } = Select;
function Editor() {

    let [state, setState] = useSetState({
        isShowPanel: false,
        isShowNavigator: false,
    })
    let [activeIndex, setActiveIndex] = useState<number | undefined>()
    let [currentTagList, setCurrentTagList] = useState<Array<{ label: string, _id: string }>>([])
    let [article, setArticle] = useSetState<Article>({
        title: '',
        content: '',
        category: -1,
        tag: -1,
    })
    const history = useHistory()
    const action = queryString.parse(history.location.search)._id?"modify":"create"
    let user = useSelector((state: StateStore) => state.userStore.user)
    let categoryList: any = useSelector((state: StateStore) => state.categoryStore.category_list)
    const config = {
        modify:{
            title:"add new article",
            submit:onSubmit
        },
        create:{
            title:"modify article",
            submit:onSubmit
        },
    }
    if (!user) {
        history.push("/juejin/home")
    }


    // 点击头像其他地方，隐藏MenuNav组件
    const coverRef = useRef(null);
    useClickAway(() => {
        setIsShowNavigatorFalse()
    }, coverRef);

    // 点击头像其他地方，隐藏MenuNav组件
    const publicRef = useRef(null);
    // useClickAway(() => {
    //     setIsShowPanelFalse()
    // }, publicRef);
    useEffect(()=>{
        const _id:string = queryString.parse(history.location.search)._id as string
        if (action === 'modify') { // 如果是编辑文章
            setArticleInfo(_id)
        }
    },[])
    return (
        <div className="edit-draft">
            <div className="markdown-editor">
                <div className="header editor-header">
                    <input placeholder="输入文章标题..." spellCheck={false} maxLength={80} className="title-input title-input" onChange={(e) => { setArticle({ title: e.target.value }) }} defaultValue={article?.title}/>
                    <div className="right-box">
                        <div title="最近保存于 2021/1/4 上午10:00:48" className="status-text status-text with-padding">已保存至<a href="/editor/drafts">草稿</a></div>
                        <div className="main-image-selector main-image-selector with-padding unset">
                            <div className="toggle-btn"></div>
                            <div className="panel" style={{ display: 'none' }}>
                                <div className="title">添加封面大图</div>
                                <button className="select-btn"> 点击此处添加图片 </button>
                                <div className="preview-box" style={{ display: 'none' }}>
                                    <img src="" className="preview-image" alt="图片" />
                                    <button title="移除这张图片" className="delete-btn">
                                        <i className="ion-trash-a"></i>
                                    </button>
                                </div>
                            </div>
                            <input type="file" style={{ display: "none" }} />
                        </div>
                        <div className="editor-switcher editor-switcher with-padding">
                            <div className="toggle-btn"><EllipsisOutlined /></div>
                            <div className="panel" style={{ display: 'none' }}> 切换为富文本编辑器 </div>
                        </div>
                        <div className="publish-popup publish-popup with-padding">
                            <div className="toggle-btn" ref={publicRef}>
                                <span className="title" onClick={onTogglePanelVisible}>发布</span>
                                {
                                    !state.isShowPanel && <span style={{ fontSize: 10, marginLeft: 5 }}>▼</span>

                                }
                                {
                                    state.isShowPanel && <span style={{ fontSize: 10, marginLeft: 5 }}>▲</span>
                                }
                            </div>
                            {
                                state.isShowPanel &&
                                <div className="panel" >
                                    <div className="title">发布文章</div>
                                    <div className="category-box">
                                        <div className="sub-title">分类</div>
                                        <ul className="category-list" onClick={onClickCategoty}>
                                            {
                                                categoryList.map((item: any, index: number) => (
                                                    <li key={index} data-index={index} className={["item", activeIndex === index ? "active" : ''].join(" ")}> {item.label}</li>
                                                ))
                                            }
                                        </ul></div>
                                    <div className="tag-box">
                                        <div className="sub-title">添加标签</div>
                                        <div className="category-list">
                                            {/* <div className="add-btn-item"> +添加标签 </div> */}
                                            <Select

                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="请选择标签"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                                onChange={onChangeSelect}
                                            >
                                                {
                                                    currentTagList.map((item, index) => (
                                                        <Option value={item._id} key={index}>
                                                            {item.label}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <button className="publish-btn" onClick={onSubmit}> 确定并发布 </button>
                                </div>
                            }
                        </div>
                        <nav className="navigator main-navigator with-padding active">
                            <div className="toggle-btn" style={{ backgroundImage: `url(${user.avatar_url})` }} onClick={onToggleNavigatorVisible} ref={coverRef}>
                            </div>
                            {
                                state.isShowNavigator &&
                                <Menu
                                    isHome={false}
                                />
                            }
                            <div className="article-importer" style={{ display: 'none' }}>
                                <input type="file" multiple className="file-input" />
                                <div className="text">
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="main">
                    <ForEditor onChange={onArticleChange} defaultValue={article?.content}/>
                </div>
                {/* <div className="footer"></div> */}
            </div>
        </div>
    )




    async function onSubmit() {

        // 先校验值是否有效
        const ValidateMessage = onValidate()
        if (ValidateMessage) {
            notification.open({
                message: '还未编辑完整',
                description: ValidateMessage,
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                onClick: () => {
                },
            });
            return;
        }

        // 提交信息，创建新文章
        const result: any = await AddArticle(article)
        if (result.data.code === 0) {
            message.success(result.data.msg);
            history.push("/juejin/home")
        } else {
            notification.open({
                message: '发表失败',
                description: result.data.msg,
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                onClick: () => {
                },
            });
        }

    }
    function onValidate() {
        if (!article.title) {
            return "请填写标题"
        }
        if (!article.content) {
            return "请编辑内容"
        }
        if (article.category < 0) {
            return "选择分类"
        }
        if (article.tag < 0) {
            return "选择标签"
        }
        return;
    }
    async function setArticleInfo(_id:string) {
        const result:any = await GetArticleDetail({id:_id})
        if (result.data.code ===0) {
            setArticle(result.data.article)
        }
    }

    // 标签选择器，获取文章标签值
    function onChangeSelect(tagValue: any) {
        setArticle({
            tag: tagValue
        })
    }
    // 文章内容改变，获取文章内容
    function onArticleChange(articleContent: any) {
        setArticle({
            content: articleContent
        })
    }
    // 分类点击改变，改变选择样式 & 获取文章分类值 
    function onClickCategoty(e: any) {
        const nodeName = e.target.nodeName.toUpperCase()
        let tag = e.target;

        if (nodeName === 'LI') {
            let index = parseInt(tag.getAttribute('data-index'))
            setCurrentTagList(categoryList[index].tags)
            setActiveIndex(index)
            setArticle({
                category: categoryList[index]._id
            })
        }
    }

    // 点击发布，切换隐藏显示导航板块
    function onTogglePanelVisible() {
        setState({
            isShowPanel: !state.isShowPanel
        })
    }
    // 点击头像，切换隐藏显示选择板块
    function onToggleNavigatorVisible() {
        setState({
            isShowNavigator: !state.isShowNavigator
        })
    }

    function setIsShowNavigatorFalse() {
        setState({
            isShowNavigator: false
        })
    }
    function setIsShowPanelFalse() {
        setState({
            isShowPanel: false
        })
    }
}

export default Editor
