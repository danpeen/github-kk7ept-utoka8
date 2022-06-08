import React, { useState, useEffect, Suspense } from "react";
// import Garfish from "garfish";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
  Outlet,
} from "react-router-dom";
import "./index.less";

const PageNotFound = () => <h2>404...</h2>;
const MainHome = () => {
  return (
    <div className="home">
      <h2> welcome, </h2>
      <h2>
        Hello, This is a demo mirco frontend projects using Garfish with Module
        federation.
      </h2>
      <h4> 1、click `Sub-APP-2`, Garfish will load Sub-APP-2</h4>
      <h4> 2、click `Sub-APP-3`, Garfish will load Sub-APP-3</h4>
      <h4> 3、Sub-APP-2：</h4>
    </div>
  );
};
const SubAPP = () => <div id="subApp"> </div>;

// const RemoteButtonFromApp2 = React.lazy(() => import("app2/button"));
// const RemoteButtonFromApp3 = React.lazy(() => import("app3/shared-button"));
// const RemoteApp = React.lazy(() => import("app2/App"));

const Home = () => {
  const navigate = useNavigate();

  // const handleClick = async () => {
  //   const app = await Garfish.loadApp("app2");
  //   app.mounted ? await app.mount() : app?.show();
  //   app && !app.mounted ? await app.mount() : app?.show();
  // };

  return (
    <div className="main-app">
      <div className="left">
        <div className="title" onClick={() => navigate({ pathname: "/home" })}>
          <h1> Main App </h1>
        </div>

        {/* <Suspense fallback={"button loading..."}>
          <div className="remote-element">
            Remote Button from sub-app-2： <RemoteButtonFromApp2 />
          </div>
          <div className="remote-element">
            Remote Button from sub-app-3： <RemoteButtonFromApp3 />
          </div>
        </Suspense> */}

        {/* <Suspense fallback={"App2 loading..."}>
          <div className="remote-element">
            Remote Application(sub-app)： <RemoteApp />
          </div>
        </Suspense> */}

        <ul>
          <li>
            <NavLink to="/app2">Sub-APP-2</NavLink>
          </li>
          <li>
            <NavLink to="/app3">Sub-APP-3</NavLink>
          </li>
        </ul>
      </div>

      <div className="right">
        {/* <button onClick={handleClick} className="button">
          Garfish.loadApp('app2')
        </button> */}

        {/* <button
          onClick={() => navigate({ pathname: "/app2" })}
          className="button"
        >
          Router based load Sub APP 2
        </button>
        <button
          onClick={() => navigate({ pathname: "/app3" })}
          className="button"
        >
          Router based load Sub APP 3
        </button> */}

        <Outlet></Outlet>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<MainHome />} />
            <Route path="/home" element={<MainHome />} />
            <Route path="/app2/*" element={<SubAPP />} />
            <Route path="/app3/*" element={<SubAPP />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Index;
