import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getUsersSuccess(users) {
  return {
    type: "getUsersSuccess",
    isFetching: false,
    data: users
  };
}

function requestUsers() {
  return {
  type: Users,
  isFetching: true
};
}

function getUserSuccess(data) {
  return {type: "getUserSuccess", data: data, isFetching: true};
}

export function getUsers(params = { page: 1, per_page: 10 }) {
  return dispatch => {
    let url=API_CONFIG.host + "/admin/manage/roles";
    // let url="../../data/admin/users/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getUsersSuccess(response.jsonResult));
    });
  };
}

export function getUser(id) {
  return (dispatch) => {
    let url=API_CONFIG.host + "/admin/manage/roles/" + id;
    // let url="../../data/admin/users/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getUserSuccess(response.jsonResult));
    });
  }
};


export function deleteUsers(id ,params) {
  let url=API_CONFIG.host + "/admin/manage/roles/" + id;
  // let url="../../data/admin/users/index.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(get(response.jsonResult));
    });
  }
};

export function saveUser(params) {
  let url=API_CONFIG.host + "/admin/manage/roles";
  // let url="../../data/admin/users/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getUser());
    });
  }
};

export function updateUser(id, params) {
  let url=API_CONFIG.host + "/admin/manage/roles/" + id + "/update";
  // let url="../../data/admin/users/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getUsers());
    });
  }
};
