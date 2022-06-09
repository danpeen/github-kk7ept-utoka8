import React from "react";

export const Home = () => {
  return (
    <div className="home">
      <h2> welcome, </h2>
      <h3>
        This is a demo mirco frontend projects using Garfish with Module
        federation.
      </h3>
      <h4> 1、click `Sub-APP-2`, Garfish will load Sub-APP-2</h4>
      <h4> 2、click `Sub-APP-3`, Garfish will load Sub-APP-3</h4>

      <h4 className="block">
        3、Main App's feature: <br />
        1) An Micro frontend app with Garfish; <br />
        2) Load Sub App when browser router changed,which Garfish will load the
        sub app according to `activeWhen` option; <br />
        3) show the exposed component from Sub-App-2 and Sub-App-3; <br />
        4) share the common libraries for sub APPs; <br />
        5) expose common common utils func and components for sub APPs; <br />
        6) hmr works fine in devServer (by react-fast-refresh); <br />
      </h4>

      <h4 className="block">
        3、Sub-APP-2's feature: <br />
        1) share common utils func and components from main-App; <br />
        2) show the exposed component from Sub-App-3; <br />
        3) hmr works fine in devServer (by react-fast-refresh); <br />
        4) share the common libraries from main App.(such as
        React、React-dom、React-router-dom); [check the `Network` in console
        panel] <br />
      </h4>

      <h4 className="block">
        3、Sub-APP-3's feature: <br />
        1) share common utils func and components from main-App; <br />
        2) show the exposed component from Sub-App-2; (click `about` link and
        you will see this component.) <br />
        3) hmr works fine in devServer (by react-fast-refresh); <br />
        4) share the common libraries from main App.(such as
        React、React-dom、React-router-dom); [check the `Network` in console
        panel] <br />
        5) it has own independent routes, which can test whether the sub-app
        routes is normal in Garfish; <br />
        6) load remote component async when router changed to `about`.
      </h4>
    </div>
  );
};
