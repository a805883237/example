import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// 自动生成import
import users from './users';
import auth from './auth';
import notices from './notices';
import layout from './layout';
import echarts from './echarts';
import images from './images';


const rootReducer = combineReducers({
  routing: routerReducer,
  layout,
  auth,
  echarts,
  users,
  images,
  notices
});

export default rootReducer;
