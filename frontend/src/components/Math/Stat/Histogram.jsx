/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./histogram.css";

const Marker = ({ position, axis, scale }) => {
  const markerRef = useRef(null);
  const markerTextRef = useRef(null);

  useEffect(() => {
    const marker = markerRef.current;
    const markerText = markerTextRef.current;

    if (axis === "x") {
      marker.style.height = "20px";
      marker.style.width = "0px";
      marker.style.bottom = "-10px";
      marker.style.left = `${position}px`;

      markerText.style.bottom = "-25px";
      markerText.style.left = `-5px`;
      markerText.innerText = scale;
    } else {
      marker.style.height = "0px";
      marker.style.width = "20px";
      marker.style.left = "-10px";
      marker.style.bottom = `${position}px`;

      markerText.style.left = "-25px";
      markerText.style.bottom = `-10px`;
      markerText.innerText = scale;
    }
  }, [position, axis]);

  return (
    <div className="marker" ref={markerRef}>
      <div className="marker-text" ref={markerTextRef}></div>
    </div>
  );
};

const Axis = ({ numMarkers, size, dim, updateGraphSize, scale }) => {
  const AxisRef = useRef(null);

  useEffect(() => {
    while ((size - 40) % numMarkers !== 0) {
      size += 10;
    }

    updateGraphSize(
      dim === "x" ? size : undefined,
      dim === "y" ? size : undefined
    );
  }, [size, numMarkers, dim, updateGraphSize]);

  if (dim === "x") {
    return (
      <div className="x-axis" ref={AxisRef}>
        {Array.from({ length: numMarkers }).map((_, index) => (
          <Marker
            key={index}
            position={(index + 1) * ((size - 40) / numMarkers)}
            axis={"x"}
            scale={(index + 1) * scale}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="y-axis" ref={AxisRef}>
        {Array.from({ length: numMarkers }).map((_, index) => (
          <Marker
            key={index}
            position={(index + 1) * ((size - 40) / numMarkers)}
            axis={"y"}
            scale={(index + 1) * scale}
          />
        ))}
      </div>
    );
  }
};

const Box = ({ width, height, position }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;

    box.style.width = `${width}px`;
    box.style.height = `${height}px`;
    box.style.left = `${position}px`;
  });

  return <div ref={boxRef} className="box"></div>;
};

const Histogram = ({
  width,
  height,
  numXMarkers,
  numYMarkers,
  scaleX,
  scaleY,
  maxBoxes,
}) => {
  const graphRef = useRef(null);
  const [graphWidth, setGraphWidth] = useState(width);
  const [graphHeight, setGraphHeight] = useState(height);
  const [addedComponents, setAddedComponents] = useState([]);
  const [lastPosition, setLastPosition] = useState([]);
  const [enteredBoxWidth, setEnteredBoxWidth] = useState(0);
  const [enteredBoxHeight, setEnteredBoxHeight] = useState(0);

  const [answerData, setAnswerData] = useState([]);

  useEffect(() => {
    const graph = graphRef.current;
    graph.style.width = `${graphWidth}px`;
    graph.style.height = `${graphHeight}px`;
  }, [graphWidth, graphHeight]);

  useEffect(() => {
    console.log(answerData);
  }, [answerData]);

  const updateGraphSize = (newWidth, newHeight) => {
    if (newWidth !== undefined) {
      setGraphWidth(newWidth);
    }
    if (newHeight !== undefined) {
      setGraphHeight(newHeight);
    }
  };

  const addBox = (boxWidth, boxHeight) => {
    if (addedComponents.length >= maxBoxes) {
      return;
    }

    const unitWidth = (graphWidth - 40) / (numXMarkers * scaleX);
    const unitHeight = (graphHeight - 40) / (numYMarkers * scaleY);

    setAnswerData((prevAnswerData) => [
      ...prevAnswerData,
      [parseInt(boxWidth), parseInt(boxHeight)],
    ]);

    boxWidth = boxWidth * unitWidth;
    boxHeight = boxHeight * unitHeight;

    boxWidth = Math.round(boxWidth * 100) / 100;
    boxHeight = Math.round(boxHeight * 100) / 100;

    if (lastPosition.length === 0) {
      setLastPosition((prevLastPosition) => [
        ...prevLastPosition,
        parseInt(boxWidth),
      ]);
    } else {
      const newPosition =
        parseInt(lastPosition[lastPosition.length - 1]) + parseInt(boxWidth);
      setLastPosition((prevLastPosition) => [...prevLastPosition, newPosition]);
    }

    const newComponent = (
      <Box
        key={addedComponents.length}
        width={boxWidth}
        height={boxHeight}
        position={lastPosition[lastPosition.length - 1]}
      />
    );
    setAddedComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const deleteBox = () => {
    if (addedComponents.length > 0) {
      setAddedComponents((prevComponents) => prevComponents.slice(0, -1));
      setLastPosition((prevLastPosition) => prevLastPosition.slice(0, -1));
      setAnswerData((prevAnswerData) => prevAnswerData.slice(0, -1));
    }
  };

  return (
    <div className="graph-container">
      <div className="graph" ref={graphRef}>
        <Axis
          numMarkers={numXMarkers}
          dim={"x"}
          size={graphWidth}
          updateGraphSize={updateGraphSize}
          scale={scaleX}
        />
        <Axis
          numMarkers={numYMarkers}
          dim={"y"}
          size={graphHeight}
          updateGraphSize={updateGraphSize}
          scale={scaleY}
        />

        {addedComponents.map((component) => component)}
      </div>
      <form>
        <label>
          Enter width of box:
          <input
            type="text"
            name="width"
            value={enteredBoxWidth}
            onChange={(e) => setEnteredBoxWidth(e.target.value)}
          />
        </label>
        <label>
          Enter height of box:
          <input
            type="text"
            name="height"
            value={enteredBoxHeight}
            onChange={(e) => setEnteredBoxHeight(e.target.value)}
          />
        </label>
      </form>
      <button
        onClick={() => addBox(enteredBoxWidth, enteredBoxHeight)}
        className="add-box"
      >
        Add Box
      </button>
      <button onClick={() => deleteBox()} className="add-box">
        Delete Box
      </button>
    </div>
  );
};

export default Histogram;
