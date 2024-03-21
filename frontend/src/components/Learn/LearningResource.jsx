/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { useHover } from "@uidotdev/usehooks";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const LearningResource = () => {
  const navigate = useNavigate();
  const { source, topic, lesson } = useParams();

  const [topicRelated, setTopicRelated] = useState({});
  const [section, setSection] = useState([]);

  const { loading, setLoading, status, setStatus } = useContext(UserContext);

  const IncrementProgress = async () => {
    try {
      const outcome = await Axios.put(
        `http://localhost:8000/resources/progress/updates`,
        {
          userId: "65f86f434b9403f9d70d8aa3", //user.id
          topic: topic,
          source: source,
          lessonName: lesson,
        }
      );

      console.log(outcome.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBtnClick = () => {
    let currentLessonIndex = null;
    let nextLesson = "";

    topicRelated.map((x, index) => {
      if (x.lessonName == lesson) {
        if (x.completed == false) {
          IncrementProgress();
        }
        currentLessonIndex = index;
      }
    });

    if (currentLessonIndex !== null) {
      if (currentLessonIndex + 1 < topicRelated.length) {
        nextLesson = topicRelated[currentLessonIndex + 1].lessonName;
      } else {
        nextLesson = topicRelated[0].lessonName;
      }
    }

    window.location.href = `/learning/${source}/${topic}/${nextLesson}`;
  };

  useEffect(() => {
    // const loggedUser = sessionStorage.getItem("loggedUser");

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Axios.post(
          "http://localhost:8000/resources/getLessonBodies",
          {
            userId: "65f86f434b9403f9d70d8aa3",
            lessonTitle: lesson,
            topic: topic,
          }
        );
        setSection(response.data.lessonBody);
        console.log(response.data);
        setTopicRelated(response.data.lessonProgressReturn.lessonProgress);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(topicRelated).length > 0) {
      if (Object.keys(section).length > 0) {
        setLoading(false);
      }
    }
  }, [topicRelated, section]);

  return loading ? (
    <TailSpin />
  ) : (
    topicRelated && Object.keys(topicRelated).length > 0 && (
      <>
        <div style={{ display: "flex", fontFamily: "poppins" }}>
          <Link to={"/learnprint"} style={{margin:"20px"}}>Go Back!</Link>
          <div
            className="sidebar"
            style={{
              width: "20%",
              marginRight: "20px",
              margin: "20px",
              padding: "20px",
              borderRight: "12px solid #17B169",
              borderWidth: "5px",
              borderRadius: "5px",
            }}
          >
            {topicRelated.map((x, index) => (
              <ul
                key={index}
                style={{
                  listStyleType: "none",
                  textDecoration: "none",
                  fontSize: 10,
                }}
              >
                <a
                  href={`/learning/${source}/${topic}/${x.lessonName}`}
                  style={{ textDecoration: "none" }}
                >
                  {x.completed == false ? (
                    <h1 style={{ color: "red" }}>{x.lessonName}</h1>
                  ) : (
                    <h1 style={{ color: "green" }}>{x.lessonName}</h1>
                  )}
                </a>
              </ul>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              border: "12px solid #17B169",
              borderWidth: "5px",
              margin: "20px",
              padding: "20px",
            }}
          >
            <h1>{lesson}</h1>
            {Object.keys(section).length > 0 && (
              <div>
                {section.lessonSection.map((sectionText, index) => (
                  <div key={index}>
                    <p>{sectionText}</p>
                    {section.sectionImgURL[index] !== "" && (
                      <img
                        src={section.sectionImgURL[index]}
                        onLoad={() => setLoading(false)}
                        alt={`Section ${index}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => {
                handleBtnClick();
              }}
            >
              Next Page!
            </button>
          </div>
          <h1>{status}</h1>
        </div>
      </>
    )
  );
};

export default LearningResource;
