import Histogram from "./Histogram";

const Statistical = () => {
  return (
    <div>
      <Histogram
        width={300}
        height={450}
        numXMarkers={6}
        numYMarkers={5}
        scaleX={5}
        scaleY={10}
        maxBoxes={5}
      />
    </div>
  );
};

export default Statistical;
