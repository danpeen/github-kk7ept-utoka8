import React from "react";
import Button from "./button";
import { BrowserRouter } from "react-router-dom";
import add, { sayHello } from "app1/shared-utils";
import "./index.less";

const App = (props) => {
  sayHello();
  return (
    <BrowserRouter basename={props.basename || ""}>
      <div className="sub-app">
        <div className="title">
          <h1> Sub App </h1>
        </div>
        <Button />

        <div className="remote-element">
          <div>来自基座的 add 方法：{add(1, 2)}</div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
