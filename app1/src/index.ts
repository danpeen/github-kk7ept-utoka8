// You can write your own logic here to determine the actual url
window.app2Url = "http://localhost:3002";

// Use dynamic import here to allow webpack to interface with module federation code

// loadScript('http://localhost:3002/remoteEntry.js').then(() => {
//   import('./bootstrap')
// })
import Garfish from "garfish";
Garfish.run({
  basename: "/",
  domGetter: "#subApp",
  apps: [
    {
      name: "app2",
      activeWhen: "/app2",
      entry: "http://localhost:3002", // html入口
    },
  ],
});

import("./bootstrap");
