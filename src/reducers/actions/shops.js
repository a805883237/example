import cFetch from '../../utils/cFetch';
import { API_CONFIG } from '../../config/api';
import { message } from 'antd';

function getShopsSuccess(shops) {
  return {
    type: "getShopsSuccess",
    isFetching: false,
    data: shops
  };
}

function requestShops() {
  return {
  type: Shops,
  isFetching: true
};
}

function getShopSuccess(data) {
  return {type: "getShopSuccess", data: data, isFetching: true};
}

export function getShops(params = { page: 1, per_page: 10 }) {
  return dispatch => {
    // let url=API_CONFIG.host + "";
    let url="../../data/shops/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getShopsSuccess(response.jsonResult));
    });
  };
}

export function getShop(id) {
  return (dispatch) => {
    let url="../../data/shops/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getShopSuccess(response.jsonResult));
    });
  }
};


export function deleteShops(params) {
  let url="../../data/shops/index.json";
  return (dispatch) => {
    return cFetch(API_CONFIG.host + "/admin/explore/pages/", {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(get(response.jsonResult));
    });
  }
};

export function saveShop(params) {
  let url="../../data/shops/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getShop());
    });
  }
};

export function updateShop(id, params) {
  let url="../../data/shops/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getShops());
    });
  }
};
