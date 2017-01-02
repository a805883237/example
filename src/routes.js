import React from 'react';
import {Route, IndexRoute} from 'react-router';

// ruby自动生成
 import  ShopsIndex from './views/shops/index';


import App from './views/layouts/App/App.js';
import HomePage from './views/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import UsersIndex from './views/users/index.js';
import  NoticesIndex from './views/notices/index';
import  ImageManagesIndex from './views/image_manages/index';
import  UmEditor from './views/editor/UMEditor';

export default (
  <Route name="home" breadcrumbName="首页" path="/manage" component={App}>
    <IndexRoute component={HomePage}/>
 <Route breadcrumbName="位置暂定" path="/shops"  components={ShopsIndex}/>
    <Route name="user" breadcrumbName="用户列表" path="users" components={UsersIndex}/>
    <Route breadcrumbName="图片管理" path="image" components={ImageManagesIndex}/>
    <Route breadcrumbName="消息管理" path="notices" components={NoticesIndex}/>
    <Route breadcrumbName="编辑器editor" path="editor"  components={UmEditor}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
