import "./style.less"
import BookItem from "./BookItem"
import BookAside from "./BookAside"
import {GetBookList } from "service/book"
import {useEffect} from "react"
import {useSetState} from "ahooks"
function Book() {
    const navList = [
        {label:"推荐",href: "/home/recommend"},
        {label:"关注",href:"/home/following"},
        {label:"后端",href:"/home/backend"},
        {label:"前端",href:"/home/frontend"},
        {label:"安卓",href:"/home/android"},
        {label:"苹果",href:"/home/ios"},
        {label:"标签管理",href:"/subscribe/subscribed"},
    ]
    const [state,setState] = useSetState({
        bookList:[]
    })
    useEffect(() => {
        getBooks()
    }, [])
    return (
        <div className="view books-index-view">
            {/* <Navigation navList={navList} /> */}
            <div className="list-wrap">
                <div className="books-list">
                    {
                        state.bookList.map((item:any,index:number)=>(
                            <BookItem
                                key={item._id}
                                book={item}
                            />
                        ))
                    }
                </div>
            </div>
            <BookAside/>
        </div >
    )

    async function getBooks(){
        const result:any =  await GetBookList({})
        if ( result.data.code === 0){
            setState({
                bookList:result.data.books
            })
        } 
    }
}
export default Book
