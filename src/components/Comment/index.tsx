import "./style.less"
import BraftEditor from "components/BraftEditor"
import CommentItem from "./CommentItem"
import { AddComment, GetComment } from "service/comment"
import { useSelector } from "react-redux"
import StateStore from "store"
import { notification, message } from "antd"
import { useSetState } from "ahooks"
import { useEffect } from "react"
interface CommentProps {
    commentTypeID: string,
    commentType: string, // 可能是文章的评论，也可能是沸点的评论,
    authorID: string, // 沸点或者文章的作者id
}
function Comment(props: CommentProps) {
    let user = useSelector((state: StateStore) => state.userStore.user)
    const [state, setState] = useSetState({
        comments: []
    })
    useEffect(() => {
        if (props.commentTypeID) {
            setComment()
        }
    }, [props.commentTypeID])
    return (
        <div className="comment-list-box" id="comment-list-box">
            <div className="comment-form comment-form focused">
                <BraftEditor
                    placeholder="来说两句吧"
                    onSumbit={(value) => SendComment(value)}
                />
            </div>
            <div className="comment-list comment-list">
                {
                    state?.comments?.map((item, index) => (
                        <CommentItem key={index} commentItem={item} onReLoadCommentList={setComment}/>
                    ))
                }

               
            </div>
            <span className="container triangle-top" style={{ display: 'block' }}><em className="triangle"></em></span>
        </div>
    )


    async function setComment() {
        const result: any = await GetComment({
            commentTypeID: props.commentTypeID,
            commentType: props.commentType
        })

        if (result.data.code !== 0) {
            notification.open({
                message: result.data.msg,
            });
        } else {
            setState({
                comments: result.data.comments
            })
        }
    }
    async function SendComment(value: any) {
        if (!user._id) {
            notification.open({
                message: '请先登录',
            });
            return;
        }
        if (!value) {
            notification.open({
                message: '评论不能为空',
            });
            return
        }
        let newDiscuss = {
            username: user.git_name,
            userId: user._id,
            inputOfComment: value,
            cover: user.avatar_url,
            subDiscuss: [],
            create_time: new Date().getTime()
        }


        const result: any = await AddComment({
            commentTypeID: props.commentTypeID,
            commentType: props.commentType,
            newDiscuss,
            authorID: props.authorID,
        })
        if (result.data.code === 0) {
            message.success('评论成功')
            setComment()
        } else {
            notification.open({
                message: '评论失败',
            });
        }
    }
}

export default Comment