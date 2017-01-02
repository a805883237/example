import React from 'react';
import { connect } from 'react-redux';

import CustomTable from './../../components/CustomTable';
import { getUsers } from '../../reducers/actions/users';
import { Input, Button, Popconfirm,Row, Col } from 'antd';
import UserNew from './new';
import Search from './search';

const InputGroup = Input.Group;
var moment = require('moment');



export class UsersIndex extends React.Component {
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
    const pageParams = { page: pagination.current, per_page: pagination.pageSize };
    const filtersField = {};
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }

    const params = Object.assign({}, pageParams, filtersField, sortParams);
    this.props.fetchUsers(params);
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  //编辑
  editForm(item) {
    this.refs.editForm.showModal(item)
  }

  //新建
  newForm(item) {

    console.log(this.refs , "99999999999");
    this.refs.newForm.showModal(item)
  }
  //删除
  deleteUsers(){

  }
  //交易积分 trades_point == 金豆数 ， 创建日期 created_at ==注册时间

  // 缺少 ，昵称，账号，用户类型,身份 ,余额，最后登录
  //多余, 性别 sex,折扣 percent, 等级修改时间 level_modified_at，标签 label ，备注 remark ，交易总额 trades_price_sum ，级别的ID
  render() {
    const { data } = this.props;
    const columns = [
      {title: "ID",dataIndex: "id",key: "id"},

      {title: "名称",dataIndex: "name",key: "name",render(value, record) {
        return <span>{record["name"]}</span>
      }},
      {title: "级别",dataIndex: "level.name",key: "level.name",render(value, record) {
        return <span>{record['level']["name"]}</span>
      }},
      {title: "金豆数",dataIndex: "trades_point",key: "trades_point",render(value, record) {
        return <span>{record['trades_point']}</span>
      }},
      {title: "注册时间",dataIndex: "created_at",key: "created_at",sorter: true,render(value) {
        return(<span>{ moment(value*1000).format("YYYY-MM-DD hh:mm")}
        </span>)
      }},

      {
        title: '操作', key: 'operation', render: (item) => (
        <div className="actions">
          <Button type="primary" onClick={this.editForm.bind(this, item)}>编辑</Button>
          <Popconfirm title="确定删除？" placement="right" onConfirm={this.props.deleteUser.bind(this, {id: item.id})}>
            <Button  style={{marginTop: "2px"}}>删除</Button>
          </Popconfirm>
        </div>
      )}
    ];

    const pagination = {
      showSizeChanger: true,
      total: data.meta.total_count,
      pageSize: data.meta.per_page,
      pageSizeOptions: ['1','10','20','40']
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    // CustomTable ant.design组件table ，添加滚动条scroll :{{x:1300}} 属性，
    // 因为列表项数据过多，数据单行加载不全，宽度1300 待修改
    // 另外缺点是后面的操作按钮，挤到列表的最后，不好操作
    // 考虑的方案是将操作放到列表头，方便操作
    return (
      <div>
        <Search></Search>
        <Row>
          <Col span={10}>
            <div style={{marginBottom: 16}} className="actions-control">
              <Button onClick={this.newForm.bind(this, {})}>新建</Button>
              <Popconfirm title="确定删除？" placement="right" onConfirm={this.deleteUsers.bind(this)}>
                <Button type="primary">删除</Button>
              </Popconfirm>
            </div>
          </Col>
        </Row>
        <CustomTable
          columns={columns}
          dataSource={data.users}
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
  console.log("ggggggg",state.users.data)
  return {data: state.users.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: (params) => dispatch(getUsers(params)),
    deleteUser: (params) => {
      dispatch(deleteUser(params)).then(()=> {
        dispatch(getUsers());
      });
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersIndex);
