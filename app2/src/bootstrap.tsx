import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "app1/shared-store";
import { injectIntoGlobalHook } from "react-refresh/cjs/react-refresh-runtime.development";

// 需要重新注入 ReactDOM, 否则热更新不会生效
export const injectBaseReactRefresh = () => {
  // Injects the react refresh replacing the one from the base app
  injectIntoGlobalHook(window);
  // Injects the react-dom instance again
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject(ReactDOM);
};

if (process.env.NODE_ENV === "development") {
  injectBaseReactRefresh();
}

export const provider = () => ({
  // render 渲染函数，必须提供
  render: ({ dom, basename }) => {
    // 和子应用独立运行时一样，将子应用渲染至对应的容器节点，根据不同的框架使用不同的渲染方式
    ReactDOM.render(
      <App basename={basename} store={store} />,
      dom.querySelector("#root")
    );
  },
  // destroy 应用销毁函数，必须提供
  destroy: ({ dom }) => {
    // 使用框架提供的销毁函数销毁整个应用，已达到销毁框架中可能存在得副作用，并触发应用中的一些组件销毁函数
    // 需要注意的时一定要保证对应框架得销毁函数使用正确，否则可能导致子应用未正常卸载影响其他子应用
    ReactDOM.unmountComponentAtNode(
      dom ? dom.querySelector("#root") : document.querySelector("#root")
    );
  },
});

if (!window.__GARFISH__) {
  ReactDOM.render(
    <App basename="/" store={store} />,
    document.getElementById("root")
  );
}
