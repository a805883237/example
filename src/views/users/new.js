import React from 'react';
import {Button, Checkbox, Radio, Upload, Icon, Cascader, Select, Form, message, Input, Modal} from 'antd';
import {getUser, getUsers, savePage, updatePage} from '../../reducers/actions/users';
//import {getTags} from '../../reducers/actions/tags';
import {PAGE_CATEGORY} from '../../constants/actionTypes'
import {connect} from 'react-redux';
import {API_CONFIG} from './../../config/api';
import fetch from 'isomorphic-fetch';
let regeneratorRuntime = require("babel-runtime/regenerator");
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
import _  from 'lodash';
require('es6-promise').polyfill();
import { uploadProps } from '../../utils/helper';

async function getUpToken() {
  return await fetch(API_CONFIG.host + '/admin/assets/uptoken')
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      return data.uptoken
    })
}
let MyForm = React.createClass({
  getInitialState() {
    return {
      priviewVisible: false,
      priviewImage: '',
      showUpload: '',
      imageUrl: '',
      Itemvisible: true ,
      New:false,
      fetching: false,
      visible: this.props.visible,
      dataOptions: []
    };
  },

  componentDidMount() {
    let itemId = this.props.modal.state.itemId;
    if (itemId) {
      this.props.getItemData(itemId);
    }
  },

  handleCancel() {
    this.setState({
      priviewVisible: false,
    });
  },
  handleChange(value) {
    console.log(`selected ${value}`);
  },
  handleSubmit() {
    console.log(this.props.form.getFieldsValue());
    this.props.modal.hideModal();
  },
  // 只展示最后一项
  displayRender(label) {
    return label[label.length - 1];
  },
  onCateChange(value){
    console.log(`分类选择 ${value}`);
  },
  componentWillReceiveProps(){
    if (this.props.formType == "newForm" ){
      this.setState({
        Itemvisible: true,
        NotNew:false
      })
    }else if(this.props.formType == "editForm"){
      this.setState({
        Itemvisible: true,
        NotNew:true
      })
    }else{
      this.setState({
        Itemvisible: true,
        NotNew:true
      })
    }
  },
  getImageUrl(){
    return this.state.imageUrl;
  },
  render(){
    const {getFieldProps} = this.props.form;
    const Option = Select.Option;
    let children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };
    var that = this;
    const categroyOptions = _.map(PAGE_CATEGORY, function (item) {
      return (<Option key={item.id} value={item.id}>{item.name}</Option>)
    });

    //多余：ID ,
    //缺少：邀请码，昵称，手机，收货地址，头像，地区，邮箱，金豆数，余额
    return (<Form horizontal form={this.props.form}>
      <FormItem {...formItemLayout} label="邀请码">
        <Input {...getFieldProps('user.account.phone', {})} type="text" disabled={ this.state.Itemvisible && this.state.NotNew } autoComplete="off"/>
      </FormItem>
      <FormItem {...formItemLayout} label="昵称">
        <Input {...getFieldProps('user.account.nickname', {})} type="text" autoComplete="off"/>
      </FormItem>
      <FormItem {...formItemLayout} label="手机">
        <Input {...getFieldProps('user.account.phone', {})} type="text" disabled={ this.state.Itemvisible && this.state.NotNew } autoComplete="off"/>
      </FormItem>
      <FormItem {...formItemLayout} label="收货地址">
        <Input {...getFieldProps('user.account.shipAddress', {})} type="text" autoComplete="off"/>
      </FormItem>
      <FormItem {...formItemLayout} label="头像">
        <img className="img50"  src="http://pic4.qiyipic.com/common/20161123/da71405bf699499f86f710de88ad6e3a.jpg"/>
      </FormItem>
      <FormItem {...formItemLayout} label="地区">
        <Input {...getFieldProps('user.account.locality', {})} type="text" autoComplete="off"/>
      </FormItem>
      <FormItem {...formItemLayout} label="邮箱">
        <Input {...getFieldProps('user.account.UserEmail', {})} type="text" autoComplete="off"/>
      </FormItem>
      <FormItem {...formItemLayout} label="金豆数">
        <Input {...getFieldProps('user.pic', {})}  disabled={ true } type="text" autoComplete="off"/>
      </FormItem>
      <FormItem {...formItemLayout} label="余额">
        <Input {...getFieldProps('user.pic', {})}  disabled={ true } type="text" autoComplete="off"/>
      </FormItem>
    </Form>)
  }
})

function formMapStateToProps(state) {
  return {
    itemData: state.users.itemData
  };
}
//redux动作
function mapDispatchToProps(dispatch) {
  return {
    getItemData: (params) => dispatch(getUser(params)),
    saveItemData: (params)=>{
      // dispatch(savePage(params)).then(()=> {
      //   dispatch(getUsers())
      // })
    },
    updateItemData: (id, params) => dispatch(updatePage(id, params))
  }
}
MyForm = createForm({
  mapPropsToFields(props) {
    let result = {};
    //嵌套判断。这个没写出来，根据props.formType属性，判断出要哪些控件是可以修改的，并且控制控件的显示值，
    // 如果是newForm 大部分都可以修改，result为空就好，
    // 如果是editForm的话，小部分可以修改，result为全
    // 如果是查看者模式，全部不可以修改，result为全
    // 现在是全部可以修改，


        if ( props.formType === "newForm"){

          return result ;

        }else{


    //这里控制的是，哪些数据能从数据库里读取 ，读取出来并且显示再控件中。
    //权限问题暂时没有解决

    for (let prop in props.itemData) {
      result["user." + prop] = {value: props.itemData[prop].toString()};
      if (prop == "level"){
        for (let prop in props.itemData["level"]) {
          result["user.level_"+prop] = {value: prop.itemData['user'][prop].toString()};
        }
      }
      // result["user.account.UserEmail"] = {value: props.itemData["account"]["UserEmail"].toString()};
    }
    console.log("rrrrrr",result)
    return result;
        }
  }
})(MyForm);

let NewForm = connect(formMapStateToProps, mapDispatchToProps, null, {withRef: true})(MyForm);

let UserNew = React.createClass({
  getInitialState() {
    return {visible: false, itemId: "",};
  },
  componentDidUpdate(prevProps, prevState) {
    if (this.refs.newForm) {
      let form = this.refs.newForm.getWrappedInstance()
      if (this.state.visible && this.state.visible != prevState.visible) {
        form.resetFields()
        if (this.state.itemId) {
          form.props.getItemData(this.state.itemId)
        }
      }
    }
  },
  showModal(item) {
    this.setState({visible: true, itemId: item.id});
  },
  hideModal() {
    this.setState({visible: false});
  },
  handleOk(){
    let form = this.refs.newForm.getWrappedInstance()
    let params = form.getFieldsValue();
    if (this.state.itemId) {
      form.props.updateItemData(this.state.itemId, params)
    } else {
      form.props.saveItemData(params)
    }
    this.hideModal()
  },
  render() {
    return (
      <div>
        <Modal title={this.props.title} visible={this.state.visible} onOk={this.handleOk} onCancel={this.hideModal}>
          <NewForm ref="newForm" modal={this} visible={this.state.visible} formType={this.props.formType}></NewForm>
        </Modal>
      </div>
    );
  },
});

export default UserNew;
