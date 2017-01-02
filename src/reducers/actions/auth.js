import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_SUCCESS, LOGOUT_REQUEST
} from '../../constants/actionTypes';
import cFetch from '../../utils/cFetch';
import cookie from 'js-cookie';
import {API_CONFIG} from '../../config/api';
import { message } from 'antd';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

export function loginUser(creds, cbk) {
  return dispatch => {
    dispatch(requestLogin(creds));
    cookie.set('access_token', "test");
    // let url=API_CONFIG.host + "/admin/manage/sessions.json"
    let url="../../../data/auth/login.json";
    cFetch(url, {method: "GET", params: creds}).then((response) => {
      // if(response.status==200){
        cookie.set('access_token', response.jsonResult.access_token);
        dispatch(receiveLogin(response.jsonResult));
      // }else{
      //   message.error('用户名或密码错误');
      // }
    });
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    cFetch(API_CONFIG.host + "/admin/manage/sessions/destroy", {method: "GET"}).then((response) => {
      cookie.remove('access_token');
      dispatch(receiveLogout(response.jsonResult));
    });
  };
}
