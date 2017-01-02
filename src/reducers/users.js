let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, users: []},
  itemData: {}
}
export default function users(state = initialState, action) {
  switch (action.type) {
    case "getUsersSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getUserSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveUserSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteUserSuccess":
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

