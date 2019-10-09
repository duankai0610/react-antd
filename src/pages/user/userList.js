import React, { Component } from "react"
import { Table, Tag, Switch } from "antd";
import { UserListApi } from "@api/user"
import moment from "moment";
export default class UserList extends Component {
    constructor() {
        super()
        this.state = {
            columns: [
                {
                    title: '用户账号',
                    dataIndex: 'userId',
                    key: 'userId'
                },
                {
                    title: '用户名称',
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: '用户头像',
                    dataIndex: 'userPic',
                    key: 'userPic',
                    render: url => <img src={url} alt="" style={{ width: '100px', height: '50px' }} />
                },
                {
                    title: "注册时间",
                    dataIndex: "registerTime",
                    key: "registerTime",
                    render:time=><p>{moment(time).format('YYYY-MM-DD')}</p>

                },
                {
                    title: '用户状态',
                    key: 'status',
                    dataIndex: 'status',
                    render: status => <Switch defaultChecked={status} onChange={this.handleUserChange.bind(this)} />
                }
            ],
            data: []
        }
    }
    render() {
        let { data, columns } = this.state;
        return (
            <Table rowKey={info=>info._id} columns={columns} dataSource={data} />
        )
    }
    handleUserChange(value) {
        //将用户的Id和状态传递到后端  将用户的状态值发生改变
    }
    componentDidMount() {
        this.handleAsyncUserList();
    }
    async handleAsyncUserList() {
        let data = await UserListApi();
        this.setState({
            data: data.data.list
        })
    }
}