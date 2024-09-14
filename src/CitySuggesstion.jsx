import React, { useEffect, useState } from "react";
import styles from "./CitySuggestion.module.css";
import cities from "./cities.json";
import { ThreeDots } from "react-loader-spinner";

const BASE_URL = "https://api.opencagedata.com/geocode/v1";
const API_KEY = "ef0a7cf762804bb38d6486f1cc231a5a";
function CitySuggesstion() {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      inputValue &&
      inputValue === inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
    ) {
      const match = cities.find((city) => city.startsWith(inputValue));
      setSuggestion(match ? match : "");
    } else {
      setSuggestion("");
    }

    if (enterPressed && suggestion) {
      fetchCoordinates(suggestion);
      setEnterPressed(false);
      setSuggestion("");
    }
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestion) {
      setInputValue(suggestion);
      setEnterPressed(true);
      setIsLoading(true);
    } else if (e.key === "Backspace") {
      setInputValue("");
      setSuggestion("");
      setCoordinates(null);
      setError(null);
    }
  };

  const fetchCoordinates = async (city) => {
    try {
      const res = await fetch(`${BASE_URL}/json?q=${city}&key=${API_KEY}`);
      const json = await res.json();
      if (json.results.length > 0) {
        const { lat, lng } = json.results[0].geometry;
        setCoordinates({ lat, lng });
      } else {
        setCoordinates(null);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setCoordinates(null);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={styles.formField}
            placeholder="Enter city name"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <label for="name" className={styles.formLabel}>
            Enter city name
          </label>
        </div>
        {suggestion && (
          <div className={styles.suggestion}>
            {inputValue}
            {suggestion.slice(inputValue.length)}
          </div>
        )}
      </div>
      <GeographicCoordinates
        isLoading={isLoading}
        error={error}
        coordinates={coordinates}
      />
    </div>
  );
}

export default CitySuggesstion;


const GeographicCoordinates = ({ isLoading, error, coordinates }) => {
  return (
    <div className={styles.coordinates}>
      <h4>Geographic coordinates</h4>
      {isLoading && (
        <ThreeDots
          color="#38caef"
          wrapperClass={styles.flex}
          width={60}
          height={60}
        />
      )}
      {error && <p className={styles.error}>{error}</p>}
      {coordinates && (
        <>
          <p>
            Latitude <span>{coordinates.lat}</span>{" "}
          </p>
          <p>
            Longitude<span>{coordinates.lng}</span>
          </p>
        </>
      )}
    </div>
  );
};
