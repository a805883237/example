import React from 'react';
import {connect} from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import {getEditors,delete} from '../../../reducers/actions/admin/editors';
import {Input, Button, Popconfirm, Row, Col} from 'antd';
import EditorNew from './new.js';
import Search from './search.js';
import {uploadProps} from '../../../utils/helper';

const InputGroup = Input.Group;
var moment = require('moment');

export class AdminEditorsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.getEditors();
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
    this.props.getEditors(params);
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
  deleteEditors() {

  }

  render() {
    const {data} = this.props;
    const columns = [
      {title: "ID", dataIndex: "id", key: "id"},

       {title: "姓名", dataIndex: "name", key: "name"},

       {title: "角色", dataIndex: "role.name", key: "role.name"},

       {title: "创建时间", dataIndex: "created_at", key: "created_at"},

      {
        title: '操作', key: 'operation', render: (item) => (
          <div className="actions">
            <Button type="primary" onClick={this.editForm.bind(this, item)}>编辑</Button>
            <Popconfirm title="确定删除？" placement="right"
                        onConfirm={this.props.deleteEditors.bind(this, {id: item.id})}>
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
                <Popconfirm title="确定删除？" placement="right" onConfirm={this.props.deleteEditors.bind(this)}>
                  <Button type="primary">删除</Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
          <CustomTable
              columns={columns}
              dataSource={data.editors}
              pagination={pagination}
              rowKey={(record) => record.id}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
              bordered
          />
          <EditorNew ref="newForm" title="新建" formType="newForm"></EditorNew>
          <EditorNew ref="editForm" title="编辑" formType="editForm"></EditorNew>
        </div>
    );
  }
}

//redux

function mapStateToProps(state) {
  return {data: state.admin_editors.data};
}

function mapDispatchToProps(dispatch) {
  return {
    getEditors: (params) => dispatch(getEditors(params)),
    deleteEditors:  (params) =>
    {
      dispatch(deleteEditors(params)).then(() => {
        dispatch(getEditors());
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
)(AdminEditorsIndex);


