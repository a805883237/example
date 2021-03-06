import { USERS_QERUEST, USERS_SUCCESS, USERS_FAILURE} from '../../constants/actionTypes';
import cFetch from '../../utils/cFetch';
import { API_CONFIG } from '../../config/api';
import { message } from 'antd';

function requestNotices() {
  return {
    type: USERS_QERUEST,
    isFetching: true
  };
}

function getNoticesSuccess(notices) {
  return {
    type: "getNoticesSuccess",
    isFetching: false,
    data: notices
  };
}
function getNoticeShowSuccess(notices) {
  return {
    type: "getNoticeShowSuccess",
    isFetching: false,
    data: notices
  };
}

function noticesError(message) {
  return {
    type: USERS_FAILURE,
    isFetching: false,
    message
  };
}

export function getNotices(params = { page: 1, per_page: 10 }) {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/explore/finance/notices";
    console.log(params ,"22222222222222222222params");
    let url="../../data/notices/index.json";
    //这里不知道为什么，反着来，是正的，正着来，是反的
    if (params=="unread"){
      url="../../data/notices/unread.json";
    }else if(params=="read"){
      url="../../data/notices/read.json";
    }
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getNoticesSuccess(response.jsonResult));
    });
  };
}

export function getNoticeShow() {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/explore/finance/notices";
    let url="../../data/notices/show.json";
    return cFetch(url, {
      method: "GET",
      params: []
    }).then((response) => {
      dispatch(getNoticeShowSuccess(response.jsonResult));
    });
  };
}

function getNoticeSuccess(data) {
  return {type: "getNoticeSuccess", data: data, isFetching: true};
}
export function getNotice(id) {
  return (dispatch) => {
    // let url=API_CONFIG.host + "/admin/explore/pages/" + id + "/edit";
    let url="../../data/notices/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getNoticeSuccess(response.jsonResult));
    });
  }
};

export function updateNotice(id, params) {
  // let url=API_CONFIG.host + "/admin/fx/trades/" + id ;
  let url="../../data/notices/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getNotices());
    });
  }
};
