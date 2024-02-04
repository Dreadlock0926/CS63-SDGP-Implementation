/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const Materials = (props) => {
    const { key, data } = props;
  
    return (
      <div key={key}>
        <h1>Topic - {data.topic}</h1>
        <h2>Title - {data.title}</h2>
        <h3>About - {data.about}</h3>
        <h4>Under subtopic - {data.subtopic}</h4>
      </div>
    );
  };
  
  export default Materials;
  