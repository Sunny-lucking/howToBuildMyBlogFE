import "./style.less"
import 'braft-editor/dist/index.css'
import BraftEditor, { ControlType } from 'braft-editor'
import {useState} from "react"
import {notification} from "antd"
interface IProps {
    placeholder: string,
    onSumbit:(value:any)=>{},
}

function BraftEditorContainer(props: IProps) {

    const [editorValue,setComment ] = useState(BraftEditor.createEditorState(null))
    const controls = [
        'emoji', 'media', 'link',
        {
            key: 'my-button', // 控件唯一标识，必传
            type: 'button',
            title: '发送评论', // 指定鼠标悬停提示文案
            className: 'edit-submit-button', // 指定按钮的样式名
            html: null, // 指定在按钮中渲染的html字符串
            text: '提交', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
            onClick: () => {
                if (editorValue.toHTML() === `<p></p>`){
                    notification.open({
                        message: '评论不能为空',
                    });
                    return
                }
                props.onSumbit(editorValue.toHTML())
            },
        }
    ]

    const handleEditorChange = (editorState: any) => {
        setComment(editorState)
    }
    return (

        <div className="editor-container">
            <BraftEditor
                imageResizable={true}
                className="content"
                contentClassName="editor-content"
                style={{ display: "flex", flexDirection: 'column-reverse' }}
                onChange={(editorState) => { handleEditorChange(editorState) }}
                value={editorValue}
                placeholder={props.placeholder}
                controls={controls as ControlType[]}
                contentStyle={{ height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)',fontSize: '1.15rem',backgroundColor:"transparent"}}
            />
        </div>

    )

    // function  clickForSendComment(){
    //     if (!commentValue){
    //         alert('评论不能为空');
    //         return
    //     }
    //     let newDiscuss  = {
    //         username:user.git_name,
    //         userId:user._id,
    //         inputOfComment:commentValue,
    //         cover:user.avatar_url,
    //         subDiscuss:[]
    //     }

      
    //     const result  = await AddComment({
    //         articleID: props.articleId,
    //         newDiscuss
    //     })
    //     this.$http.post(BASE_URL+'/api/comment/addComment',{
            
    //     })
    //         .then(({status,data})=>{
    //             console.log('添加评论');
    //             console.log(status);
    //             if (status===200){
    //                 this.$emit('updateComment')
    //             }
    //         })
    // }


}

export default BraftEditorContainer;