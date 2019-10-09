import React, { Component } from 'react'
import { Upload, Icon} from "antd";

export default class UploadImage extends Component {
    state = {
        loading: false,
    };

    handleChange = info => {
      
       this.props.onChange(info.file)
    };

    render() {
        
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        const  imageUrl  = this.props.value;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        )
    }
}
