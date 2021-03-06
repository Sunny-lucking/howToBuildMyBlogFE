import "./style.less"
import UserItem from "./UserItem"

interface IProps {
    authorInfoList: any,
    // onReLoadPinList: () => void // 当点击删除沸点的时候，触发该事件导致重新请求
}
function List(props: IProps) {
    return (
        <div className="user-list-block shadow">
            <ul className="user-list">
                {
                    props.authorInfoList && props.authorInfoList.map((item:any, index:number) => (
                        <li className="item shadow" key={index}>
                            <UserItem userItem={item} 
                            //    onReLoadPinList={props.onReLoadPinList}
                               />
                        </li>
                    ))
                }
                <li className="item" >
                    {/* <UserItem
                        // onReLoadPinList={props.onReLoadPinList}
                    /> */}
                </li>
            </ul>
        </div>
    )

}

export default List;