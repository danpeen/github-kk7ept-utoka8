// You can write your own logic here to determine the actual url
window.app2Url = "http://localhost:3002";

import Garfish from "garfish";
Garfish.run({
  basename: "/",
  domGetter: "#subApp",
  apps: [
    {
      name: "app2",
      activeWhen: "/app2",
      entry: "http://localhost:3002",
    },
    {
      name: "app3",
      activeWhen: "/app3",
      entry: "http://localhost:3003",
    },
  ],
});

import("./bootstrap");
