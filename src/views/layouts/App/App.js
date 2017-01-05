import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Login from '../../Login/Login';
import {Link} from 'react-router';
import './App.scss';
import {Menu, Row, Breadcrumb, Icon} from 'antd';
import Header from '../../../components/Header';
//import Bread from '../../../components/bread.jsx';

const SubMenu = Menu.SubMenu;

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: React.PropTypes.bool,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);

    this.state = {
      collapse: false
    };
  }

  componentDidMount() {
  }

  _linkRender(route, params, routes, paths) {
    // console.log(route,params,routes,paths,window.location.pathname ,"66666666666666666666666666666");
    //判断paths是不是product/new 不是就直接二级目录

    if (paths[0] === "product/new") {
      return (
        <span className="product_new">
          <Link to="/products">产品列表</Link>
              /
          <Link to="/product/new">新建产品列表</Link>
        </span>
      )
    } else if (paths[0] === "product/edit") {
      return (
        <span className="product_new">
          <Link to="/products">产品列表</Link>
              /
          <Link to="/product/1/edit">修改产品列表</Link>
        </span>
      )
    } else if (/^.*children$/.test(paths[1])) {
      return (
        <span className="product_new">
          <Link to="/fx/users">全部分销商</Link>
              /
          <Link to="/fx/users/:id/children">下级分销商</Link>
        </span>
      )
    } else if (/^.*detail*/.test(paths[1])) {
      return (
        <span className="product_new">
          <Link to="/trade">订单列表</Link>
              /
          <Link to="/trade/details/:id">订单详情</Link>
        </span>
      )
    }
    return <Link to={"/" + paths.join('/')}>{route.breadcrumbName}</Link>
  }

  renderAuthenticatedPage() {
    const {auth} = this.props;
    return (
      <div className="ant-layout-aside">
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"/>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']}>
            <SubMenu key="user" title={<span><Icon type="/user"/>用户管理</span>}>
              <Menu.Item key="1"><Link to={'/users'}>用户管理</Link></Menu.Item>
              <Menu.Item key="3"><Link to={'/notices'}>消息管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="automake" title={<span><Icon type="user"/>自动生成页面</span>}>




              <Menu.Item key="image"><Link to="/image">图片管理</Link></Menu.Item>
              <Menu.Item key="u_editor"><Link to="/editor">UmEditor</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </aside>
        <div className="ant-layout-main">
          <Header  />
          <div className="ant-layout-breadcrumb">
            <Breadcrumb {...this.props} itemRender={this._linkRender.bind(this)}/>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div>
                {this.props.children}
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
            版权所有 © 2017 富熊电商
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {isAuthenticated} = this.props;
    return (
      <div>
        {isAuthenticated ? this.renderAuthenticatedPage() : <Login/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {routing, auth: {isAuthenticated, user}} = state;
  return {
    isAuthenticated, user, routing
  };
}

export default connect(mapStateToProps)(App);
