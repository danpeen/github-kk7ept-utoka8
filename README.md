# Module Federation with Webpack 5 in React

This repo uses Webpack5 Module Federation plugin to build a React microfrontend

## Get started

```shell
npm install
npm start
```

Host(app1) runs at http://localhost:3001 (live reload only)
Remote(app2) at http://localhost:3002

## How it works

Host(app1) is the shell app which imports Remote(app2). Host is hosted on port 3001.

Remote(app2) is hosted port 3002 and exposes 1 components button.

The exposed components are used in Host.
