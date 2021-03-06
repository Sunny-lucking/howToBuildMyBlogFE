import Profile from "components/Profile"
import Advertisement from "components/Advertisement"
import RelatedPin from "components/RelatedPin"
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import "./style.less"
import {onWatchScroll} from "constants/utils"
import {useEffect, useRef} from "react"
interface SlideProps{
    authorInfo:any,
    relatedArticle: any,
}
function SideBar(props:SlideProps) {

    useEffect(()=>{
        let removeWacther = onWatchScroll(900,addStikyClass,removeStickyClass)
        return removeWacther
    },[])
    
    const sliderRef:any = useRef()
    console.log(props);
    return (
        <div className="sidebar sidebar" ref={sliderRef}>
            <Profile authorInfo={props.authorInfo}/>
            <Advertisement />
            <RelatedPin
                relatedList={props.relatedArticle}
                title="相关文章"
            />
            <div className="sticky-block-box">
                <div className="sidebar-block catalog-block pure">
                    <div className="article-catalog">
                        <div className="catalog-title">目录</div>
                        <MarkNav
                            className="article-menu"
                            source={localStorage.getItem('editorValue')}
                            headingTopOffset={80}
                        />
                    </div>
                </div>
            </div>

        </div>
    )

    function addStikyClass(){
        sliderRef.current.classList.add("top")
        sliderRef.current.classList.add("sticky")
    }
    function removeStickyClass(){
        sliderRef.current.classList.remove("top")
        sliderRef.current.classList.remove("sticky")
    }
}

export default SideBar