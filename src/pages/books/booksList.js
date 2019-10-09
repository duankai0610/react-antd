import React, { Component, Fragment } from "react"
import { Table, Tag, Modal, Button, Form, Select } from 'antd';
import { booksListApi } from "@api/books"
import ModifyForm from "@components/modifyForm"
const { Option } = Select;
const booksInfo = {
    page: 1,
    pageSize: 10,
    free: 0,
    group: 1,
    finish: 0,
    sortId: "",
}

export default class BooksList extends Component {
    constructor() {
        super()
        this.state = {
            booksList: [],
            visible: false,
            modifyData: {},
            columns: [
                {
                    title: '作者头像',
                    dataIndex: 'authorIcon',
                    key: 'authorIcon',
                    render: url => <img src={url} style={{ width: '30px', height: '30px' }} />,
                },
                {
                    title: '作者笔名',
                    dataIndex: 'authorName',
                    key: 'authorName',
                },
                {
                    title: '书籍名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: "书籍封面",
                    dataIndex: "icon",
                    key: "icon",
                    render: url => <img src={url} style={{ width: '50px', height: '70px' }} />
                },
                {
                    title: 'Tags',
                    key: 'bookTags',
                    dataIndex: 'bookTags',
                    render: tags => (
                        <span>
                            {tags.map(tag => {
                                return (
                                    <Tag color='volcano' key={tag}>
                                        {tag.toUpperCase()}
                                    </Tag>
                                );
                            })}
                        </span>
                    ),
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Button type="link"
                                onClick={this.handleShowModal.bind(this, record)}>操作</Button>

                            <Button type="link"
                                onClick={this.handleDel.bind(this, record)}>删除</Button>
                        </span>
                    ),
                },
            ]
        }
    }
    render() {
        let { booksList, columns, modifyData } = this.state;
        return (
            <Fragment>
                <Form layout="inline">
                    <Form.Item label="价格">
                        <Select defaultValue="全部" onChange={this.handleFree.bind(this)}>
                            <Option value="0">全部</Option>
                            <Option value="1">付费</Option>
                            <Option value="2">免费</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="频道">
                        <Select defaultValue="男频" onChange={this.handleGroup.bind(this)}>
                            <Option value="1">男频</Option>
                            <Option value="2">女频</Option>
                            <Option value="3">出版</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="状态">
                        <Select defaultValue="全部" onChange={this.handleFinish.bind(this)}>
                            <Option value="0">全部</Option>
                            <Option value="1">完结</Option>
                            <Option value="2">连载</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="分类">
                        <Select defaultValue="全部" 
                            style={{width:'120px'}} onChange={this.handleSortId.bind(this)}>
                            <Option value="">全部</Option>
                            <Option value="1000010">现代都市</Option>
                            <Option value="1000012">仙侠武侠</Option>
                            <Option value="1000011">奇幻修真</Option>
                            <Option value="1000013">科幻游戏</Option>
                            <Option value="1000014">悬疑推理</Option>
                            <Option value="1000015">军事战争</Option>
                        </Select>
                    </Form.Item>



                </Form>
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={booksList}
                    pagination={{
                        showQuickJumper: true,
                        pageSize: 10,
                        total: 1000,
                        onChange: this.handlepaginatioChange.bind(this)
                    }}
                />
                <Modal
                    title="修改数据信息"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <ModifyForm modifyData={modifyData} />
                </Modal>
            </Fragment>
        )
    }
    //价格筛选
    handleFree(value){
        booksInfo.free = value;
        this.handleAsyncBooksList(booksInfo);
    }
    //频道筛选
    handleGroup(value){
        booksInfo.group = value;
        this.handleAsyncBooksList(booksInfo);
    }
    //状态筛选
    handleFinish(value){
        booksInfo.finish = value;
        this.handleAsyncBooksList(booksInfo);
    }
    //分类筛选
    handleSortId(value){
        booksInfo.sortId = value;
        this.handleAsyncBooksList(booksInfo);
    }
    //分页逻辑
    handlepaginatioChange(page) {
        booksInfo.page = page;
        this.handleAsyncBooksList(booksInfo);
    }
    //关闭模态框
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    //删除书籍
    handleDel(record) {
        Modal.info({
            title: "删除",
            content: `您确定要删除《${record.name}》书吗？`,
            onOk: () => {
                //ajax删除数据
            }
        })
    }
    //显示模态框
    handleShowModal(record) {
        this.setState({
            visible: true,
            modifyData: record
        })
    }
    componentDidMount() {
        this.handleAsyncBooksList(booksInfo);
    }
    async handleAsyncBooksList(booksInfo) {
        let { page, pageSize, free, group, finish, sortId } = booksInfo;
        let data = await booksListApi(page, pageSize, free, group, finish, sortId);
        this.setState({
            booksList: data.data.bookList
        })
    }

}