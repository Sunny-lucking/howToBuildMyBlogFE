import EntryItem from "./EntryItem"
import "./style.less"
import { Empty, Skeleton } from "antd"
interface EntryListWrapProps {
    articleList: any[],
    onArticleListChange?:()=>void
}
function EntryListWrap(props: EntryListWrapProps) {
    // debugger
    return (
        <div className="entry-list-wrap">
            <ul className="entry-list">
                {
                    props.articleList === undefined &&

                    <div style={{ padding: '20px' }}>
                        <Skeleton active />
                    </div>
                }

                {

                    props.articleList?.map((item: any, index: number) => (
                        <li className="item" key={index}>
                            <EntryItem article={item} onArticleListChange={props?.onArticleListChange}/>
                        </li>
                    ))
                }
                {
                    props.articleList?.length === 0 &&
                    // <Empty description="没有数据呢"/>
                    <div style={{ padding: '20px' }}>
                        <Empty description="没有数据呢" />
                    </div>
                }

            </ul >
        </div >
    )
}

export default EntryListWrap