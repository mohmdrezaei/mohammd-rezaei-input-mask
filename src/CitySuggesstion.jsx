import React, { useEffect, useState } from "react";
import styles from "./CitySuggestion.module.css";
import cities from "./cities.json";
function CitySuggesstion() {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);

  useEffect(() => {
    if (inputValue && inputValue === inputValue.charAt(0).toUpperCase() + inputValue.slice(1)) {
      const match = cities.find((city) => city.startsWith(inputValue));
      setSuggestion(match ? match : "");
    } else {
      setSuggestion("");
    }

    if (enterPressed) {
      setSuggestion("");
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
    </div>
  );
}

export default CitySuggesstion;
