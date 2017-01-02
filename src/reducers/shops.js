let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, shops: []},
  itemData: {}
}
export default function shops(state = initialState, action) {
  switch (action.type) {
    case "getShopsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getShopSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveShopSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteShopsSuccess":
      return Object.assign({}, state,{}
      );
    case "updateShopsSuccess":
      return Object.assign({}, state,{}
    );
    case "openEditForm":
      return Object.assign({}, state, {
        edit_form_visible: action.visible
      });
    default:
      return state;
  }
}

