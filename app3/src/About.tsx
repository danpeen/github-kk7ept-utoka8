import React, { Suspense } from "react";
const RemoteButtonFromApp2 = React.lazy(() => import("app2/button"));

const About = () => {
  return (
    <div>
      <h1>About page</h1>
      <Suspense fallback={"App2 loading..."}>
        <div className="remote-element">
          来自 Sub APP2 的 Button: <RemoteButtonFromApp2 />
        </div>
      </Suspense>
    </div>
  );
};

export default About;
