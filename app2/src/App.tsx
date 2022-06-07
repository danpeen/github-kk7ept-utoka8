import React from "react";
import { BrowserRouter } from "react-router-dom";
import add, { sayHello } from "app1/shared-utils";
import { Com1 } from "app1/shared-components";
import Button from "app3/shared-button";
import "./index.less";

const App = ({ basename }) => {
  sayHello();
  return (
    <BrowserRouter basename={basename || ""}>
      <div className="sub-app">
        <div className="title">
          <h1> Sub App 2</h1>
        </div>
        <div className="remote-element">
          <div> 来自基座的共享方法 add 方法：add(1, 2): {add(1, 2)}</div>
          <div>
            来自基座组件: <Com1 name="danpeen" age={12} />
          </div>
          <br />
          {/* <button onClick={() => store.increment()}>
            来自基座的store，store.increment(): {store.counter}
            【只共享代码，不共享状态】
          </button> */}
        </div>
        <div className="remote-element">
          <div>
            来自 Remote Sub App 3 的组件 : <Button />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
