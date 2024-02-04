// import "./App.css";
import "//unpkg.com/mathlive";
import { useState } from "react";

function MathLive() {
  const [value, setValue] = useState("");

  return (
    <div className="MathLive">
      <math-field onInput={(evt) => setValue(evt.target.value)}>
        {value}
      </math-field>
      <p>Value: {value} Latex</p>
    </div>
  );
}

export default MathLive;
