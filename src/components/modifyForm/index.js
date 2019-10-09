import React, { Component } from 'react'
import { Form,Input,Button,Checkbox } from "antd"
import UploadImage from "../uploadImage"

@Form.create()
class ModifyForm extends Component {
    constructor(){
        super()
        this.state = {
            plainOptions:["悬疑","灵异奇谈","阴间系列","程序员","民俗奇谈","鬼怪",
            "仙侠","脑洞","奇遇"]
        }
    }
    render() {
        let {authorIcon,authorName,name,icon,bookTags} = this.props.modifyData;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{
                span:4
            }}
            wrapperCol={{
                span:20
            }}
            onSubmit={this.handleSubmit.bind(this)}
            >
                <Form.Item label="作者头像">
                    {
                        getFieldDecorator("authorIcon",{
                            initialValue:authorIcon,
                           
                        })(
                            <UploadImage/>
                        )
                    }
                </Form.Item>
                <Form.Item label="作者笔名">
                    {
                        getFieldDecorator("authorName",{
                            initialValue:authorName,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="书籍名称">
                    {
                        getFieldDecorator("name",{
                            initialValue:name,
                        })(
                            <Input
                                type="text"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="书籍封面">
                    {
                        getFieldDecorator("icon",{
                            initialValue:icon,
                        })(
                            <UploadImage/>
                        )
                    }
                </Form.Item>
                <Form.Item label="分类">
                    {
                        getFieldDecorator("bookTags",{
                            initialValue:bookTags,
                        })(
                            <Checkbox.Group 
                                options={this.state.plainOptions} 
                               />
                        )
                    }
                </Form.Item>
                <Form.Item>
                   <Button htmlType="submit">修改</Button>
                </Form.Item>
            </Form>
        )
    }
    //修改数据
    handleSubmit(e){
        e.preventDefault();
        //获取到所有表单的数据
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            //ajax提交修改的数据
          }
        });
    }
}


export default ModifyForm;
