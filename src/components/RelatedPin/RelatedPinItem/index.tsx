import "./style.less"
function RelatedPinItem(props: any) {
    const { relatedItem,title } = props
    return (
        <div className="pin-item-container">
            <a href={title === "相关文章"?`/juejin/post?id=${relatedItem._id}`:`/juejin/pin/${relatedItem._id}`} target="_blank" rel="" title={relatedItem.title || relatedItem.content} className="pin">
                <div className="content-box">
                    <div className="content with-picture" dangerouslySetInnerHTML={{ __html: relatedItem.title || relatedItem.content }}>

                    </div>
                    <div className="stat item" style={{ marginTop: 'auto' }} >
                        <span>{relatedItem?.praiseList?.length} 赞 ·</span>
                        <span>{relatedItem?.commentCount} 评论</span>
                    </div>
                </div>
                {/* <div className="image-box" style={{ backgroundImage: 'url("https://tpc.googlesyndication.com/simgad/11123356258384329839?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qkNjeYFQQtX6f_hzVFyjvyUGLo_bg")' }}>
            </div> */}
            </a>
        </div>
    )
}

export default RelatedPinItem;