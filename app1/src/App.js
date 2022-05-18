import React, {Suspense} from "react";
const RemoteButton = React.lazy(() => import("app2/button"));
const RemoteApp = React.lazy(() => import("app2/App"));
import Garfish from "garfish";

const App = () => {
  const handleClick = async () => {
    const app = await Garfish.loadApp('app2');
    await app.mount();
  }

  return (
    <div>
      <div style={{
        margin:"10px",
        padding:"10px",
        textAlign:"center",
        backgroundColor: "greenyellow"
      }}>
        <h1>App 1 </h1>
      </div>

      <button
        onClick={handleClick}
        style={{
        margin: "10px",
        padding:"10px 20px",
        borderRadius: '4px',
        textAlign:"center",
        backgroundColor: "aquamarine",
        cursor: "pointer"
      }}> load App 2 </button>


      <div id="subApp"></div>

      <Suspense fallback={"button loading..."}>
        <div style={{
        margin:"10px",
        padding:"10px",
        // textAlign:"center",
        // backgroundColor: "cyan"
      }}>
          from remote module button ： <RemoteButton />
        </div>
      </Suspense>

      <Suspense fallback={"App2 loading..."}>
        <div style={{
        margin:"10px",
        padding:"10px",

      }}>
          from remote module button ： <RemoteApp />
        </div>
      </Suspense>
    </div>)
}


export default App;
