import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
  Outlet,
} from "react-router-dom";
import "./index.less";
import { Home } from "./Home";
const PageNotFound = () => <h2>404...</h2>;
const SubAPP = () => <div id="subApp"> </div>;
const RemoteButtonFromApp2 = React.lazy(() => import("app2/button"));
const RemoteButtonFromApp3 = React.lazy(() => import("app3/shared-button"));
const RemoteApp = React.lazy(() => import("app2/App"));

const App = () => {
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
          <h1 className="logo"> Main App </h1>
        </div>
        <ul>
          <li>
            <NavLink to="/app2">Sub-APP-2</NavLink>
          </li>
          <li>
            <NavLink to="/app3">Sub-APP-3</NavLink>
          </li>
        </ul>
        <Suspense fallback={"button loading..."}>
          <div className="remote-element">
            Remote Button from sub-app-2： <RemoteButtonFromApp2 />
          </div>
          <div className="remote-element">
            Remote Button from sub-app-3： <RemoteButtonFromApp3 />
          </div>
        </Suspense>

        {/* <Suspense fallback={"App2 loading..."}>
          <div className="remote-element">
            Remote Application(sub-app)： <RemoteApp />
          </div>
        </Suspense> */}
      </div>

      <div className="right">
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
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
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
