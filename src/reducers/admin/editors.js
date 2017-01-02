let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, editors: []},
  itemData:{}
}
export default function admin_editors(state = initialState, action) {
  switch (action.type) {
    case "getEditorsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getEditorSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveEditorSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteEditorsSuccess":
      return Object.assign({}, state,{}
      );
    case "updateEditorsSuccess":
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

