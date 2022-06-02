import React, { Suspense } from "react";
import Garfish from "garfish";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./index.less";

// const RemoteButton = React.lazy(() => import("app2/button"));
// const RemoteApp = React.lazy(() => import("app2/App"));

const Home = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const app = await Garfish.loadApp("app2");
    await app.mount();
  };

  return (
    <div className="main-app">
      <div className="left">
        <div className="title" onClick={() => navigate({ pathname: "/" })}>
          <h1> Main App </h1>
        </div>
        {/* <Suspense fallback={"button loading..."}>
          <div className="remote-element">
            Remote Button(sub-app)： <RemoteButton />
          </div>
        </Suspense> */}

        {/* <Suspense fallback={"App2 loading..."}>
          <div className="remote-element">
            Remote Application(sub-app)： <RemoteApp />
          </div>
        </Suspense> */}
      </div>
      <div className="right">
        <button onClick={handleClick} className="button">
          Garfish.loadApp('app2')
        </button>

        <button
          onClick={() => navigate({ pathname: "/app2" })}
          className="button"
        >
          Router based load APP2
        </button>

        <div id="subApp"> </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app2" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
