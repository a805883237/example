import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getUsers,delete} from '../../../reducers/actions/admin/users';
import {Input, Button, Popconfirm, Row, Col} from 'antd';
import UserNew from './new.js';
import Search from './search.js';
import {uploadProps} from '../../../utils/helper';

const InputGroup = Input.Group;
var moment = require('moment');


//跑的时候，user 改成 Roles 113行

export class AdminUsersIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const pageParams = {page: pagination.current, per_page: pagination.pageSize};
    const filtersField = {};
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }

    const params = Object.assign({}, pageParams, filtersField, sortParams);
    this.props.getUsers(params);
  }

  onSelectChange(selectedRowKeys) {
    this.setState({selectedRowKeys});
  }

  //编辑
  editForm(item) {
    this.refs.editForm.showModal(item)
  }

  //新建
  newForm(item) {
    this.refs.newForm.showModal(item)
  }

  //删除
  deleteUsers() {

  }

  render() {
    const { data } = this.props;
    const columns = [
      {title: "ID", dataIndex: "id", key: "id"},

       {title: "名称", dataIndex: "name", key: "name"},

       {title: "创建时间", dataIndex: "created_at", key: "created_at"},

       {title: "更新时间", dataIndex: "updated_at", key: "updated_at"},

      {
        title: '操作', key: 'operation', render: (item) => (
          <div className="actions">
            <Button type="primary" onClick={this.editForm.bind(this, item)}>编辑</Button>
            <Popconfirm title="确定删除？" placement="right"
                        onConfirm={this.props.deleteUsers.bind(this, {id: item.id})}>
              <Button style={{marginTop: "2px"}}>删除</Button>
            </Popconfirm>
          </div>
        )
      }
  ];

    const pagination = {
      showSizeChanger: true,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      pageSizeOptions: ['1', '10', '20', '40']
    };
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
          <Search ref="search" indexPage={this}></Search>
          <Row>
            <Col span={10}>
              <div style={{marginBottom: 16}} className="actions-control">
                <Button onClick={this.newForm.bind(this, {})}>新建</Button>
                <Popconfirm title="确定删除？" placement="right" onConfirm={this.props.deleteUsers.bind(this)}>
                  <Button type="primary">删除</Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
          <CustomTable
              columns={columns}
              dataSource={data.roles}
              pagination={pagination}
              rowKey={(record) => record.id}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
              bordered
          />
          <UserNew ref="newForm" title="新建" formType="newForm"></UserNew>
          <UserNew ref="editForm" title="编辑" formType="editForm"></UserNew>
        </div>
    );
  }
}

//redux

function mapStateToProps(state) {
  return {data: state.admin_users.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: (params) => dispatch(getUsers(params)),
    deleteUsers:  (params) =>
    {
      dispatch(deleteUsers(params)).then(() => {
        dispatch(getUsers());
      })
    },
    change_header_tabs: (data) =>
    {
      dispatch({type: "change_header_tabs", data: data})
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUsersIndex);


