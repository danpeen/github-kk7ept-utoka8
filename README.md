# Module Federation with Webpack 5 in React

This repo uses Webpack5 Module Federation plugin to build a React microfrontend

## Get started

```shell
npm install
npm start
```

Host(main-app) runs at http://localhost:3001 (live reload only)
Remote(sub-app-2) at http://localhost:3002
Remote(sub-app-3)) at http://localhost:3003

## How it works

Host(app1) is the shell app which imports Remote(app2). Host is hosted on port 3001.

Remote(app2) is hosted port 3002 and exposes 1 components button.

Remote(app3) is hosted port 3003 and exposes 1 components button.

The exposed components are used in Host.

### Usage

- click `Sub-APP-2`, Garfish will load Sub-APP-2
- click `Sub-APP-3`, Garfish will load Sub-APP-3

### Main App's feature:
  -  1) An Micro frontend app with Garfish;
  -  2) Load Sub App when browser router changed,which Garfish will load the sub app according to `activeWhen` param;
  -  3) show the exposed component from Sub-App-2 and Sub-App-3;
  -  4) share the common libraries for sub APPs;
  -  5) expose common common utils func and components for sub APPs;
  -  6) hmr works fine in devServer (by react-fast-refresh);

### Sub-APP-2's feature:
  - 1) share common utils func and components from main-App;
  - 2) show the exposed component from Sub-App-3;
  - 3) hmr works fine in devServer (by react-fast-refresh);
  - 4) share the common libraries from main App.(such as React、React-dom、React-router-dom); [check the `Network` in console panel]

### Sub-APP-3's feature:
  - 1) share common utils func and components from main-App;
  - 2) show the exposed component from Sub-App-2; (click `about` link and you will see this component.)
  - 3) hmr works fine in devServer (by react-fast-refresh);
  - 4) share the common libraries from main App.(such as React、React-dom、React-router-dom); [check the `Network` in console panel]
  - 5) it has own independent routes, which can test whether the sub-app routes is normal in Garfish;
  - 6) load remote component async when router changed to `about`.
