import "./style.less"
import { useState } from "react"
import {
    Form,
    Button,
    Upload,
    Input,
    message,
    DatePicker,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { UpLoadBook } from "service/book"
import { UpLoadEvent } from "service/event"
import { useHistory } from "react-router-dom"
import queryString from "query-string"
import moment from "moment"
interface IConfig {
    [key: string]: any
}
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
const config: IConfig = {
    'event': {
        title: "eventTitle",
        desc: "eventDesc",
        cover: "eventCover",
        submit: UpLoadEvent,
    },
    'book': {
        title: "fileTitle",
        desc: "fileDesc",
        cover: "fileCover",
        submit: UpLoadBook,
    }
}
function Book() {
    const history = useHistory()
    const type: string = queryString.parse(history.location.search).type as string
    const action: any = config[type]
    const [fileList, setFileList] = useState<any>([])
    const onChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const formData = new FormData()
        formData.append(action.title, values[action.title])
        formData.append(action.desc, values[action.desc])
        formData.append(action.cover, values[action.cover][0].originFileObj)
        if (type==="book") {  // 添加book类 专有的字段
            formData.append("zipFile", values.zipFile[0].originFileObj)
        }else if(type ==="event"){  // 添加event类 专有的字段
            formData.append("eventLink", values.eventLink)
            console.log(values.eventTime,new Date());
            
            formData.append("eventTime", moment(values.eventTime).format("MM-DD"))
        }
        debugger
        const result: any = await action.submit(formData)
        message.success(result.data.msg)
    };
    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow: any = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    const beforeUpload = () => {
        return false
    }
    return (
        <div className="survey-page s-page  survey-pc">
            <div className="survey-container">
                <div className="survey-header">
                    <div className="top-tips-wrap"></div>
                    <div className="page-cover-pic"></div>
                    <div className="survey-header-title">掘金 － 活动页面合作</div>
                    <div className="survey-header-subtitle">您好！感谢您对掘金活动合作的兴趣。<strong>请仔细阅读我们的素材要求</strong>，
               并提供符合要求的页面素材和贵公司的基本资料。期待与您的合作！</div>
                </div>
                <div className="survey-main s-main ">
                    <div className="progress"></div>
                    <div className="question-list">
                        <Form
                            name="validate_other"
                            {...formItemLayout}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="标题"
                                name={action.title}
                                rules={[{ required: true, message: '请输入文件标题!' }]}
                                hasFeedback
                            >
                                <Input placeholder="请输入资料标题" />
                            </Form.Item>
                            <Form.Item
                                label="简介"
                                name={action.desc}
                                rules={[{ required: true, message: '请输入文件简介!' }]}
                            >
                                <Input.TextArea placeholder="请输入资料简介" />
                            </Form.Item>


                            <Form.Item
                                name={action.cover}
                                label="封面"
                                valuePropName={action.cover}
                                getValueFromEvent={normFile}
                                rules={[{ required: true, message: '请上传封面!' }]}
                            >
                                {/* <ImgCrop rotate> */}
                                <Upload
                                    name={action.cover}
                                    // action={UPLOAD_URL}
                                    listType="picture-card"
                                    accept="image/jpeg,image/png,image/gif"
                                    maxCount={1}
                                    onPreview={onPreview}
                                    fileList={fileList}
                                    onChange={onChange}
                                    beforeUpload={beforeUpload}
                                >
                                    {fileList.length >= 1 ? null : <UploadOutlined />}

                                </Upload>
                                {/* </ImgCrop> */}
                            </Form.Item>
                            {
                                type === "event" && (
                                    <>
                                        <Form.Item label="活动时间" name="eventTime">
                                            <DatePicker showTime />
                                        </Form.Item>
                                        <Form.Item
                                            name="eventLink"
                                            label="活动链接"
                                            rules={[{ required: true, message: '请输入活动链接!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </>
                                )
                            }
                            {
                                type === "book" &&
                                <Form.Item label="上传文件">
                                    <Form.Item
                                        name="zipFile"
                                        rules={[{ required: true, message: '请上传文件!' }]}
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                        noStyle>
                                        <Upload.Dragger name="files" action="/upload.do" accept=".zip" maxCount={1} beforeUpload={beforeUpload}>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">点击或者拖拽文件到此处</p>
                                            <p className="ant-upload-hint">仅支持上传.zip文件</p>
                                        </Upload.Dragger>
                                    </Form.Item>
                                </Form.Item>
                            }
                            <Form.Item wrapperCol={{ span: 24, offset: 10 }}>
                                <Button type="primary" htmlType="submit" style={{ width: '220px' }}>
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="page-footer  copyright">
                    <div>Copyright © 1998-2021 Tencent</div>
                    <div>
                        <a href="/xy/agreement.html"><span>用户协议</span></a><span> </span>
                        <a href="https://www.qq.com/contract.shtml"><span>服务协议</span></a>
                        <span> </span>
                        <a href="http://privacy.qq.com"><span>隐私政策</span></a>
                        <span> </span>
                        <a href="javascript:;">
                            <span>举报该问卷</span>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Book
