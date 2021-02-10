import Editor from 'for-editor'
import "./style.less"
import { useEffect } from "react"
import { useSetState } from "ahooks"
import { UploadImage } from "service/article"
interface Iprops {
    defaultValue:string,
    onChange:(value:any)=>void
}
function ForEditor(props:Iprops) {
    let [state, setState] = useSetState({
        editorValue: props.defaultValue ,
        imageUrl: '',
    })
    const toolbar = {
        subfield: true, // 单双栏模式
        
        preview: true, // 预览
        expand: true, // 全屏
        code: true, // 代码块
        img: true, // 图片
    }
    function handleChange(value: any) {
        
        setState({
            editorValue: value
        })
    }
    async function uploadHandler(params: File) {
        let imageFile = params
       
        let form_data =new FormData();
        form_data.append('image',imageFile);
        form_data.append('imageName',imageFile.name);
        
        let result:any = await UploadImage( form_data)
        
        setState({
            editorValue: state.editorValue+'![alt]('+ result.data.cover+')'
        })
    }
    // useEffect(()=>{
    //     setState({
    //         editorValue:localStorage.getItem('editorValue') as string
    //     })
    // },[])
    useEffect(()=>{
        getDefaultValueFromProps()
    },[props.defaultValue])
    useEffect(()=>{
        localStorage.setItem("editorValue",state.editorValue)
        props.onChange(state.editorValue)
    },[state.editorValue])
    return (
        <>
            <Editor
                style={{ width: '100%', height: '100%', display: "flex", flexDirection: 'column-reverse' }}
                toolbar={toolbar}
                subfield={true}
                preview={true}
                addImg={(file) => {
                    uploadHandler(file)
                }}
                value={state.editorValue} 
                onChange={(value) => handleChange(value)} />
        </>

    )
    function getDefaultValueFromProps(){
        setState({
            editorValue:props.defaultValue
        })
    }
}


export default ForEditor