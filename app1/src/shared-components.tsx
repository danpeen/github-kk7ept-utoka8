import React, { useState } from "react";
import "./index.less";

export type PropsCom1 = {
  name: string;
  age: number;
};

export const Com1 = (props: PropsCom1) => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="com1">
      <h2>
        Hello {props.name}: age is {props.age}
      </h2>
      <h2>Remote app's counter: {counter}</h2>
      <button onClick={() => setCounter((counter) => counter + 1)}>
        increment
      </button>
    </div>
  );
};

export default Com1;
