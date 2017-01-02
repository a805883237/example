import React from 'react';
import Editor from '../../components/react-umeditor/lib/editor';
// import Editor from 'react-umeditor';

class UmEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: ""
    }
  }
  handleChange(content){
    this.setState({
      content: content
    })
  }
  getIcons(){
    var icons = [
      "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
      "paragraph fontfamily fontsize | superscript subscript | ",
      "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
      "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
      "horizontal date time  | imageregion emotion spechars | inserttable  |"
    ];
    return icons;
  }
  getPlugins(){
    return {
      "image": {
        "uploader": {
          "name":"file",
          "url": "/api/upload"
        }
      }
    }
  }
  render(){
    var icons = this.getIcons();
    var plugins = this.getPlugins();
    return (<Editor ref="editor"
                    icons={icons}
                    value={this.state.content} defaultValue="<p>React Umeditor</p>"
                    onChange={this.handleChange.bind(this)}
                    plugins={plugins} />)
  }
}
export default UmEditor;
