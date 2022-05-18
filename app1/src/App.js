import React, {Suspense} from "react";
import Garfish from "garfish";
const RemoteButton = React.lazy(() => import("app2/button"));
const RemoteApp = React.lazy(() => import("app2/App"));


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
      }}> Garfish.loadApp('app2') </button>


      <div id="subApp"></div>

      <Suspense fallback={"button loading..."}>
        <div style={{
        margin:"10px",
        padding:"10px",
      }}>
         加载一个 Button（from remote）： <RemoteButton />
        </div>
      </Suspense>

      <Suspense fallback={"App2 loading..."}>
        <div style={{
        margin:"10px",
        padding:"10px",

      }}>
          加载一个应用（from remote) ： <RemoteApp />
        </div>
      </Suspense>
    </div>)
}


export default App;
