import React, { useState } from "react";

const Test = ({
  breedList,
  handleShowResult,
  handleHideImage,
  handleChangeSelectBreed,
}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [selectedBreed, setSelectedBreed] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    let inputValue = event.target.value;
    let formattedDate = inputValue.replace(/[^\d]/g, ""); // Удаляем все, кроме цифр

    if (formattedDate.length > 8) {
      formattedDate = formattedDate.slice(0, 8);
    }

    if (formattedDate.length >= 2) {
      formattedDate = formattedDate.slice(0, 2) + "." + formattedDate.slice(2);
    }

    if (formattedDate.length >= 5) {
      formattedDate = formattedDate.slice(0, 5) + "." + formattedDate.slice(5);
    }

    setDate(formattedDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && date) {
      const dateString = date;
      const filteredString = dateString.replace(/\D/g, ""); // Удаляем все нецифровые символы
      const digitsArray = Array.from(filteredString).map(Number); // Преобразуем строку в массив цифр

      let nameSum = 0;

      for (let i = 0; i < name.length; i++) {
        nameSum += name.charCodeAt(i);
      }

      const nameArray = Array.from(nameSum.toString()).map(Number);
      const fullNameSum = nameArray.reduce((acc, num) => acc + num, 0);

      const sum = digitsArray.reduce((acc, num) => acc + num, 0); // Суммируем все цифры в массиве

      const fullSum = fullNameSum + sum;

      let month = parseInt(date.split(".")[1]);
      let selectedBreeds;

      if (month >= 1 && month <= 4) {
        selectedBreeds = breedList.slice(0, breedList.length / 3);
      } else if (month >= 5 && month <= 8) {
        selectedBreeds = breedList.slice(
          breedList.length / 3,
          (breedList.length / 3) * 2
        );
      } else {
        selectedBreeds = breedList.slice((breedList.length / 3) * 2);
      }

      let selectedBreedIndex = Math.floor(
        selectedBreeds.length * (fullSum / 100)
      );

      const chosenBreed = selectedBreeds[selectedBreedIndex];

      setSelectedBreed(chosenBreed);
      handleChangeSelectBreed(chosenBreed);
      handleShowResult();
      handleHideImage();
      setName("");
      setDate("");
    }
  };

  return (
    <div className="test">
      <h1 className="test__title">Кто ты? В мире собак</h1>
      <form className="test__form" onSubmit={handleSubmit}>
        <div className="test__container test__name">
          <label className="test__form-label" htmlFor="name">
            Имя:
          </label>
          <input
            className="test__input"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Твое имя"
            required
          />
        </div>
        <div className="test__container test__date">
          <label className="test__form-label" htmlFor="date">
            Дата рождения:
          </label>
          <input
            className="test__input"
            type="text"
            id="date"
            value={date}
            onChange={handleDateChange}
            placeholder="дд.мм.гггг"
            pattern="[0-3][0-9].[0-1][0-9].[0-9]{4}"
            required
          />
        </div>
        <button className="test__button" type="submit">
          Узнать
        </button>
      </form>
    </div>
  );
};

export default Test;
