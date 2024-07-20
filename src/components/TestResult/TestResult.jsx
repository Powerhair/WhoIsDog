import React, { useEffect } from "react";

import "./TestResult.css";

const TestResult = ({
  isShowResult,
  selectedBreed,
  isLoading,
  handleShowImage,
}) => {
  useEffect(() => {
    const handleImageLoad = () => {
      console.log("Image is loaded");
      handleShowImage();
    };

    const imgElement = new Image();
    imgElement.src = selectedBreed?.imagePath;
    imgElement.onload = handleImageLoad;

    return () => {
      // Clean up
      imgElement.onload = null;
    };
  }, [selectedBreed]);

  const loader = (
    <div id="container">
      <div id="loader"></div>
    </div>
  );
  console.log(selectedBreed?.imagePath);

  return (
    <div
      className={`test__dog-container ${
        isShowResult ? "test__dog-on" : "test__dog-off"
      }`}
    >
      <h3 className="test__dog-name">
        {selectedBreed && selectedBreed.nameRu}
      </h3>
      <p className="test__dog-description">
        {selectedBreed && selectedBreed.description}
      </p>
      {isLoading ? (
        <img
          className="test__dog-img"
          src={selectedBreed && selectedBreed.imagePath}
          alt={selectedBreed && selectedBreed.nameEn}
        />
      ) : (
        loader
      )}
    </div>
  );
};

export default TestResult;
