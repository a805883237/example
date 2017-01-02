'use strict';


var React = require('react');
var ReactDOM = require('react-dom');

var Dialog = require('../base/Dialog.react');
var TabGroup = require('../base/TabGroup.react');
var Uploader = require('../../utils/FileUpload');
import ImageCheck from '../../../../../views/shared/image_check'

class ImageLibDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [[], []],
      handle: function handle() {
      }
    };
  }

  open(handle) {
    this.setState({
      handle: handle
    });
    this.refs.modal.open();
  }

  toggle(handle) {
    this.refs.region.getWrappedInstance().setState({visible: true})
    this.setState({
      handle: handle
    });
    // this.refs.modal.toggle();
  }

  onConfirm(e, images) {
    var strImgs = "";
    if (images.length > 0 && this.state.handle) {
      for (var i = 0; i < images.length; i++) {
        var src = images[i].src;
        var str = "<img src='" + src + "' />";
        strImgs += str;
      }
      if (this.state.handle) {
        this.state.handle(e, strImgs);
      }
    }
  }

  render() {
    return (<ImageCheck ref="region" onConfirm={this.onConfirm.bind(this)}/>)
  }
}
;

module.exports = ImageLibDialog;
