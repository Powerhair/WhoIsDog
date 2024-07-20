import React, { useState, useEffect } from "react";

//css
import "./App.css";

//components
import Test from "../Test/Test";
import TestResult from "../TestResult/TestResult";

//dogObject
import dogData from "../../dogbreeds";

const App = () => {
  const [breedsList, setBreedsList] = useState([]);
  const [currenBreed, setCurrentBreed] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);

  const [currentBreedIndex, setCurrentBreedIndex] = useState(null);
  const [dogInfo, setDogInfo] = useState({
    image: "",
    options: [],
    correctAnswer: null,
  });

  console.log(breedsList);

  useEffect(() => {
    setBreedsList(dogData);
  }, []);

  useEffect(() => {
    if (breedsList.length > 0) {
      setCurrentBreedIndex(getRandomBreedIndex());
    }
  }, [breedsList]);

  useEffect(() => {
    if (currentBreedIndex !== null) {
      const breed = breedsList[currentBreedIndex]?.nameEn;

      const fetchCurrentDog = (breed) => {
        const dogInfo = dogData.find((dog) => dog.nameEn === breed);

        if (dogInfo) {
          return Promise.resolve({
            image: dogInfo.imagePath,
          }).then((info) => {
            setDogInfo((prevDogInfo) => ({
              ...prevDogInfo,
              image: info.image,
            }));
          });
        } else {
          console.error("Ошибка: порода с именем " + breed + " не найдена");
          return Promise.reject("Порода с таким именем не найдена");
        }
      };

      fetchCurrentDog(breed); // передача параметра breed
    }
  }, [currentBreedIndex, breedsList]);

  useEffect(() => {
    if (currentBreedIndex !== null && breedsList.length > 0) {
      const randomIndices = generateRandomIndices(breedsList.length, 4);
      const options = randomIndices.map((index) => breedsList[index]?.nameRu);
      const correctAnswer = breedsList[currentBreedIndex]?.nameRu;

      setDogInfo((prevDogInfo) => ({
        ...prevDogInfo,
        options: shuffleArray([...options, correctAnswer]),
        correctAnswer: correctAnswer,
      }));
    }
  }, [currentBreedIndex, breedsList]);

  // Генерация случайного индекса породы
  const getRandomBreedIndex = () => {
    return Math.floor(Math.random() * breedsList.length);
  };

  const generateRandomIndices = (max, count) => {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  //Test

  const handleShowImage = () => {
    setIsLoading(true);
  };

  const handleShowResult = () => {
    setIsShowResult(true);
  };

  const handleHideImage = () => {
    setIsLoading(false);
  };

  const handleChangeSelectBreed = (element) => {
    setCurrentBreed(element);
  };

  return (
    <div className="app">
      <Test
        breedList={breedsList}
        handleShowResult={handleShowResult}
        handleHideImage={handleHideImage}
        handleChangeSelectBreed={handleChangeSelectBreed}
      />
      {isShowResult && (
        <TestResult
          selectedBreed={currenBreed}
          isLoading={isLoading}
          handleShowImage={handleShowImage}
          isShowResult={isShowResult}
        />
      )}
    </div>
  );
};

export default App;
