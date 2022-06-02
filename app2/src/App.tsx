import React, { useState, useEffect } from "react";
import Button from "./button";
import { BrowserRouter } from "react-router-dom";
import "./index.less";

const App = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    import("app1/shared-utils").then((m) => {
      setCount(m.add(1, 2));
    });
  }, []);

  return (
    <BrowserRouter basename={props.basename || ""}>
      <div className="sub-app">
        <div className="title">
          <h1> Sub App </h1>
        </div>
        <Button />

        <div className="remote-element">
          <div>来自基座方法 add(1+2) res：{count}</div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
