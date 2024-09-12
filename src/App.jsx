import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import cities from "./cities.json";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);

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

    if (enterPressed) {
      setSuggestion("");
      setEnterPressed(false);
    }
  }, [inputValue]);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestion) {
      setInputValue(suggestion);
      setEnterPressed(true);
      setSuggestion('');
    } else if (e.key === 'Backspace') {
      setInputValue('');
      setSuggestion('');
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
          style={{ position: "relative" }}
        />
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

export default App;
