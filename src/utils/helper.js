var moment = require('moment');
import cFetch from '../utils/cFetch';
import { API_CONFIG } from '../config/api';
export function formatDateTime(value) {
  return moment(value * 1000).format("YYYY-MM-DD hh:mm")
}
export const formItemLayout4_8 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
export const formItemLayout4_16 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export function formatDate(value) {
  return moment(value * 1000).format("YYYY-MM-DD")
}

export function requiredConf() {
  return {rules: [{required: true, message: '不能为空!'}]}
}
export  async function getUpToken() {
  return await fetch(API_CONFIG.host + '/admin/assets/uptoken')
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      console.log("eeeee",data)
      return data.uptoken
    })
}

export function uploadProps() {

  return {
    action: 'http://upload.qiniu.com',
    showUploadList: false,
    listType: 'picture-card',
    defaultFileList: [],
    data: (file) => {
      return file.postData;
    },
    onChange: (info) => {
      var that = this;
      if (info.file.status === 'done') {
        let imageUrl = "http://ogl8q7hrr.bkt.clouddn.com/" + info.file.response.key + "-thumb";
        that.setState({
          fileList: [
            { url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'},
            { url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
          ]
        });

        // that.props.form.setFieldsValue({"page.pic": imageUrl})
      }
    },
    beforeUpload(file) {
      return new Promise(function (resolve) {
        let reader = new FileReader(file);
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          getUpToken().then(function (token) {
            let data = Object.assign(file, {
              postData: {token: token}
            });
            resolve(data)
          })
        }
      })
    },
    onPreview: (file) => {
      this.setState({
        priviewImage: file.url,
        priviewVisible: true,
      });
    }
  }
};

