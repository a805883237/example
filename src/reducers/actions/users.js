import { USERS_QERUEST, USERS_SUCCESS, USERS_FAILURE} from '../../constants/actionTypes';
import cFetch from '../../utils/cFetch';
import { API_CONFIG } from '../../config/api';
import { message } from 'antd';

function requestUsers() {
  return {
    type: USERS_QERUEST,
    isFetching: true
  };
}

function getUsersSuccess(users) {
  return {
    type: "getUsersSuccess",
    isFetching: false,
    data: users
  };
}

function usersError(message) {
  return {
    type: USERS_FAILURE,
    isFetching: false,
    message
  };
}

export function getUsers(params = { page: 1, per_page: 10 }) {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/shop/users";
    let url="../../data/users/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getUsersSuccess(response.jsonResult));
    });
  };
}

function getUserSuccess(data) {
  return {type: "getUserSuccess", data: data, isFetching: true};
}
export function getUser(id) {
  return (dispatch) => {
    // let url=API_CONFIG.host + "/admin/shop/users/" + id ;
    let url="../../data/users/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getUserSuccess(response.jsonResult));
    });
  }
};

export function updateUser(id, params) {
  // let url=API_CONFIG.host + "/admin/shop/users/" + id + "/update";
  let url="../../data/users/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getUsers());
    });
  }
};
