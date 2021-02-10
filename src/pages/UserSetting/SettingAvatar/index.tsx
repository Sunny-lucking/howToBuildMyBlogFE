
function SettingAvatar(){
    return (
        <li className="item">
        <span className="title">头像</span>
        <div className="avatar-uploader avatar-uploader">
            <input type="file" className="input" />
            <img src="/avatar.png" className="lazy avatar avatar" data-src="https://user-gold-cdn.xitu.io/2020/4/30/171c7ef8dbbbc1bf?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="1"/>
            <div className="action-box">
                <div className="hint">支持 jpg、png、jpeg 格式大小 5M 以内的图片</div>
                <button className="upload-btn">点击上传</button>
            </div>
        </div>
    </li>
    )
}

export default SettingAvatar