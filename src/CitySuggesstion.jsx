import React, { useEffect, useState } from "react";
import styles from "./CitySuggestion.module.css";
import cities from "./cities.json";

const BASE_URL = "https://api.opencagedata.com/geocode/v1";
const API_KEY = "ef0a7cf762804bb38d6486f1cc231a5a";
function CitySuggesstion() {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

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
    }
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestion) {
      setInputValue(suggestion);
      setEnterPressed(true);
    } else if (e.key === "Backspace") {
      setInputValue("");
      setSuggestion("");
      setCoordinates(null);
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
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
        />
        <div className={styles.underline}></div>
        {suggestion && (
          <div className={styles.suggestion}>
            {inputValue}
            {suggestion.slice(inputValue.length)}
          </div>
        )}
        
      </div>
      {coordinates && (
          <div className={styles.coordinates}>
            Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
          </div>
        )}
    </div>
  );
}

export default CitySuggesstion;
