let initialState={data: []}
export default function layout(state = initialState, action) {
  switch (action.type) {
    case 'change_header_tabs':
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}
