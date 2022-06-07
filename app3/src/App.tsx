import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import add, { sayHello } from "app1/shared-utils";
import Button from "app2/button";
import { Com1 } from "app1/shared-components";
import "./index.less";

const Index = () => {
  return <h1>Home page</h1>;
};

const About = () => {
  return <h1>About page</h1>;
};

const App = ({ basename }) => {
  console.log("basename", basename);

  sayHello();
  return (
    <BrowserRouter basename={basename || ""}>
      <div className="sub-app">
        <div className="title">
          <h1> Sub App 3</h1>
        </div>
        <div className="remote-element">
          <div> 来自基座的 add 方法：add(1, 2): {add(1, 2)}</div>
          <div>
            来自基座组件: <Com1 name="hello zhangsan" age={18} />
          </div>
          <br />
        </div>

        <div className="remote-element">
          来自 Sub APP2 的 Button: <Button />
          <br />
        </div>

        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/home" element={<Index />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
