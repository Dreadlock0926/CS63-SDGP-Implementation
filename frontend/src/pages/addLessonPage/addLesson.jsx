import React, { useEffect, useState, useReducer } from "react";
import Axios from "axios";

const AddLesson = () => {
  const [section, setSection] = useState([]);
  const [enteredSection, setEnteredSection] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Use null for no image
  const [resImgUrl, setResImgUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);

  const initialState = {
    sources: [],
    selectedSource: null,
    topics: [],
    selectedTopic: null,
    lessons: [],
    selectedLesson: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SOURCES":
        return { ...state, sources: action.payload };
      case "SET_SELECTED_SOURCE":
        return { ...state, selectedSource: action.payload };
      case "SET_TOPICS":
        return { ...state, topics: action.payload };
      case "SET_SELECTED_TOPIC":
        return { ...state, selectedTopic: action.payload };
      case "SET_LESSONS":
        return { ...state, lessons: action.payload };
      case "SET_SELECTED_LESSON":
        return { ...state, selectedLesson: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLesson = () => {
    if (state.selectedSource != null) {
      if (state.selectedSource == "Pure Mathematics I") {
        setLessons("p1");
      } else {
        setLessons("s1");
      }
    }
  };

  const setLessons = async (source) => {
    if (section.length > 0 && imageUrl.length > 0) {
      try {
        const response = await Axios.post(
          "http://localhost:8000/addLesson/setLessons",
          {
            source: source,
            topic: state.selectedTopic,
            lessonTitle: state.selectedLesson,
            lessonBody: {
              lessonSection: section,
              sectionImgURL: imageUrl,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Add sections to the lesson!");
    }
  };

  const fetchLessons = async (sourceKey, topic) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/getTopics/getLessons",
        {
          sourceKey: sourceKey,
          topic: topic,
        }
      );
      dispatch({ type: "SET_LESSONS", payload: response.data.lessons });
      dispatch({
        type: "SET_SELECTED_LESSON",
        payload: response.data.lessons[0],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopics = async (sourceKey) => {
    try {
      const response = await Axios.post("http://localhost:8000/getTopics", {
        sourceKey: sourceKey,
      });
      dispatch({ type: "SET_TOPICS", payload: response.data.topics });
      dispatch({
        type: "SET_SELECTED_TOPIC",
        payload: response.data.topics[0],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSources = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/addQuestion/getModules"
      );
      dispatch({ type: "SET_SOURCES", payload: response.data });
      dispatch({ type: "SET_SELECTED_SOURCE", payload: response.data[0] });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state.selectedSource != null) {
      if (state.selectedSource == "Pure Mathematics I") {
        fetchTopics("p1");
      } else {
        fetchTopics("s1");
      }
    }
  }, [state.selectedSource]);

  useEffect(() => {
    if (state.selectedSource != null && state.selectedTopic != null) {
      if (state.selectedSource == "Pure Mathematics I") {
        fetchLessons("p1", state.selectedTopic);
      } else {
        fetchLessons("s1", state.selectedTopic);
      }
    }
  }, [state.selectedTopic]);

  useEffect(() => {
    fetchSources();
  }, []);

  const updateStates = () => {
    setSection((prevSection) => [...prevSection, enteredSection]); // Avoid mutating state
    if (resImgUrl != null) {
      setImageUrl((prevImageUrl) => [...prevImageUrl, resImgUrl]);
      setResImgUrl(null);
    } else {
      setImageUrl((prevImageUrl) => [...prevImageUrl, ""]);
    }
    setEnteredSection("");
    const sectionInput = document.getElementById("section");
    sectionInput.value = "";
    const fileInput = document.getElementById("file");
    fileInput.value = "";

    setSelectedImage(null);

    // Clear selected image after upload
  };

  useEffect(() => {
    if (section.length > 0 && imageUrl.length > 0) {
      console.log("section", section);
      console.log("imageUrl", imageUrl);
    }
  }, [section, imageUrl]);

  useEffect(() => {
    if (selectedImage != null && selectedImage.length != 0) {
      console.log("Image selected");
      console.log(selectedImage);
    } else {
      console.log("No image selected");
    }
  }, [selectedImage]);

  useEffect(() => {
    if (resImgUrl != null) {
      console.log("Image uploaded");
      console.log(resImgUrl);
      updateStates();
    }
  }, [resImgUrl]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const uploadFigure = async () => {
    try {
      if (selectedImage != null) {
        console.log("lol");
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", "xpr9hqrv");

        const response = await Axios.post(
          "https://api.cloudinary.com/v1_1/dl13hpmzu/upload",
          formData,
          {
            // Add headers for Cloudinary upload
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setResImgUrl(response.data.secure_url);
        // Add section with image
      } else if (!enteredSection) {
        alert("Enter a section!");
      } else {
        // Handle the case where there's a section but no image
        updateStates(); // Add section without image
      }
    } catch (error) {
      console.error(error);
      // Handle upload errors gracefully, e.g., display an error message
    }
  };

  return (
    <div>
      <input
        type="text"
        id="section"
        placeholder="Enter Lesson Section"
        onChange={(e) => setEnteredSection(e.target.value)}
      />
      <input
        type="file"
        id="file"
        name="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleImageChange}
      />
      <button onClick={uploadFigure}>Add Section</button>

      <div>
        {state.sources && state.sources.length > 0 ? (
          <select
            onChange={(e) =>
              dispatch({ type: "SET_SELECTED_SOURCE", payload: e.target.value })
            }
          >
            {state.sources.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        ) : null}

        {state.topics && state.topics.length > 0 ? (
          <select
            onChange={(e) =>
              dispatch({ type: "SET_SELECTED_TOPIC", payload: e.target.value })
            }
          >
            {state.topics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        ) : null}

        {state.lessons && state.lessons.length > 0 ? (
          <select
            onChange={(e) =>
              dispatch({ type: "SET_SELECTED_LESSON", payload: e.target.value })
            }
          >
            {state.lessons.map((lesson, index) => (
              <option key={index} value={lesson}>
                {lesson.lessonTitle}
              </option>
            ))}
          </select>
        ) : null}

        <button onClick={() => handleLesson()}>Set Lessons</button>
      </div>

      {section.length > 0 && (
        <div>
          {section.map((sectionText, index) => (
            <>
              <p key={index}>{sectionText}</p>
              {imageUrl[index] !== "" && <img src={imageUrl[index]} />}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddLesson;
