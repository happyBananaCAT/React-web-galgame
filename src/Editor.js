import React, { createRef, useRef } from "react"; //继承react
import "./App.css";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "../node_modules/codemirror/lib/codemirror.css";
import "./codemirror.css";
import "codemirror/theme/yonce.css";
// 代码模式，clike是包含java,c++等模式的
import "codemirror/mode/clike/clike";
import "codemirror/mode/javascript/javascript"; //js
import "codemirror/mode/python/python.js"; //python
//代码高亮
import "codemirror/addon/selection/active-line";

// 代码折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
//代码滚动
import "codemirror/addon/scroll/simplescrollbars.js";
import "codemirror/addon/scroll/simplescrollbars.css";
const answer = [
  {
    id: 0,
    answerText: `using System;
namespace HelloWorldApplication
{
  class HelloWorld
    {
      static void Main(string[] args)
      {
        Console.WriteLine("Thank you for your playing.");
      }
    }
}`,
  },
  { id: 1, answerText: "1919810" },
];
var value = `using System;
namespace HelloWorldApplication
{
  class HelloWorld
    {
      static void Main(string[] args)
      {
        Console.WriteLine();
      }
    }
}`;
var answerId = 0;
var EditorObject;
class Editor extends React.Component {
  state = {
    text: "114514",
  };
  changeCode = (CodeMirror, changeObj, value) => {
    EditorObject = CodeMirror;
    console.log(EditorObject);
    if (!value) {
      return;
    }
    this.setState({ text: CodeMirror.doc.getValue() });
    console.log(this.state.text);
  };

  onClick = () => {
    //返回值为-1，0，1时分别表示：-1：此处不需要使用编辑器，0：需要使用编辑器但答案错误，1：需要使用编辑器且答案正确
    if (this.props.problemSet === false) {
      //不需要使用右侧编辑器
      this.props.getAnswer(-1);
    } else if (this.props.problemSet === true) {
      if (this.state.text === answer[answerId].answerText) {
        //答对
        //todo:继续下个对话
        this.props.getAnswer(1);
        if (answerId < answer.length - 1) {
          answerId++;
        }
        this.props.getClickEvent(true);
      } else if (this.state.text !== answer[answerId].answerText) {
        //答错
        //todo：不继续对话，
        this.props.getAnswer(0);
      }
    }
    console.log(
      this.state.text,
      answer[answerId],
      this.state.text === answer[answerId]
    );
  };
  render() {
    return (
      <div className="EditorStyle">
        <CodeMirror
          className="CodeMirror"
          id="Editor"
          editorDidMount={(editor) => {
            this.instance = editor;
          }}
          value={value}
          onChange={this.changeCode}
          ref={(c) => (this.myCodeMirror = c)} // 添加ref属性获取dom节点
          options={{
            lineNumbers: true, // 显示行号
            mode: { name: "text/x-java" || "javascript" }, // 语言
            autofocus: true, // 自动获取焦点
            styleActiveLine: true, // 光标代码高亮
            theme: "yonce", // 主题
            scrollbarStyle: "overlay",
            lineWrapping: true, // 代码自动换行
            foldGutter: true,
            matchBrackets: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirrorfoldgutter"], // end
          }}
        />
        {console.log(EditorObject)}
        <button onClick={this.onClick} className="Button">
          <span>SUBMIT</span>
        </button>
      </div>
    );
  }
}
export default Editor;

// using System;
// namespace HelloWorldApplication
// {
//     class HelloWorld
//     {
//         static void Main(string[] args)
//         {
//             Console.WriteLine("Hello World!");
//             Console.ReadKey();
//         }
//     }
// }
