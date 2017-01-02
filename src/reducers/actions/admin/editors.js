import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getEditorsSuccess(editors) {
  return {
    type: "getEditorsSuccess",
    isFetching: false,
    data: editors
  };
}

function requestEditors() {
  return {
  type: Editors,
  isFetching: true
};
}

function getEditorSuccess(data) {
  return {type: "getEditorSuccess", data: data, isFetching: true};
}

export function getEditors(params = { page: 1, per_page: 10 }) {
  return dispatch => {
    let url=API_CONFIG.host + "/admin/manage/editors";
    // let url="../../data/admin/editors/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getEditorsSuccess(response.jsonResult));
    });
  };
}

export function getEditor(id) {
  return (dispatch) => {
    let url=API_CONFIG.host + "/admin/manage/editors/" +id;
    // let url="../../data/admin/editors/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getEditorSuccess(response.jsonResult));
    });
  }
};


export function deleteEditors(id ,params) {
  let url=API_CONFIG.host + "/admin/manage/editors/" + id;
  // let url="../../data/admin/editors/index.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(get(response.jsonResult));
    });
  }
};

export function saveEditor(params) {
  let url=API_CONFIG.host + "/admin/manage/editors";
  // let url="../../data/admin/editors/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getEditor());
    });
  }
};

export function updateEditor(id, params) {
  let url=API_CONFIG.host + "/admin/manage/editors/" + id + "/update";
  // let url="../../data/admin/editors/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getEditors());
    });
  }
};
