import { message } from 'antd';

export  function change_header_tabs(data) {
  return {
    type: "change_header_tabs",
    data: data
  };
}
