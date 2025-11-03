import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

// Weather condition constants
const BAD_WEATHER = [
  "Rain",
  "Snow",
  "Mist",
  "Smoke",
  "Dust",
  "Sand",
  "Ash",
  "Squall",
  "Tornado",
  "Drizzle",
  "Thunderstorm"
];
const GREAT_WEATHER = ["Clear"];
const ALRIGHT_WEATHER = ["Fog", "Clouds"];
const QUESTIONABLE_WEATHER = ["Haze"];

// Decision logic extracted into a pure function
const getSkatingAdvice = (weatherCondition, emotionLevel) => {
  if (BAD_WEATHER.includes(weatherCondition)) {
    return "Weather looks bad. You should stay inside and rest!";
  }

  if (QUESTIONABLE_WEATHER.includes(weatherCondition)) {
    return "Weather is questionable. Use your best judgement here!";
  }

  if (GREAT_WEATHER.includes(weatherCondition)) {
    switch (emotionLevel) {
      case 5:
        return "It was meant to be! Bring yo water!";
      case 4:
        return "Weather looks great! You should be outside skating!";
      case 3:
        return "Weather looks great! When in doubt, go skate!";
      case 2:
        return "Weather looks great! You will feel better if you skate!";
      case 1:
        return "Weather looks good, but maybe get some rest today.";
      default:
        return "Weather looks great! Go skate!";
    }
  }

  if (ALRIGHT_WEATHER.includes(weatherCondition)) {
    switch (emotionLevel) {
      case 5:
        return "It was meant to be! Bring yo water!";
      case 4:
        return "Weather looks alright. You should be outside skating!";
      case 3:
        return "When in doubt, go skate!";
      case 2:
        return "Weather looks alright, but take it easy out there!";
      case 1:
        return "Weather looks alright, but you should get some rest today!";
      default:
        return "Weather looks alright. Go skate!";
    }
  }

  return "Weather conditions are unclear. Use your best judgement!";
};

// Validate zip code format (5 digits)
const isValidZipCode = (zip) => {
  return /^\d{5}$/.test(zip);
};

function App() {
  const [apiData, setApiData] = useState({});
  const [location, setLocation] = useState("");
  const [advice, setAdvice] = useState("");
  const [emotion, setSliderValue] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State management simplified - using a single view state
  const [viewState, setViewState] = useState("input"); // "input", "emotion", "results"

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY || '60e9ee923c45e087f45389019a259b46';
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&appid=${apiKey}`;

  // Handle API data fetching with error handling
  const handleSaveApiData = async () => {
    // Clear previous errors
    setError("");

    // Validate zip code
    if (!location.trim()) {
      setError("Please enter a zip code");
      return;
    }

    if (!isValidZipCode(location)) {
      setError("Please enter a valid 5-digit zip code");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(url);
      setApiData(response.data);
      setViewState("emotion");
      setError("");
    } catch (err) {
      if (err.response) {
        // API responded with an error
        switch (err.response.status) {
          case 404:
            setError("Zip code not found. Please check and try again.");
            break;
          case 401:
            setError("Invalid API key. Please check your configuration.");
            break;
          default:
            setError("Unable to fetch weather data. Please try again.");
        }
      } else if (err.request) {
        // Request made but no response
        setError("Network error. Please check your internet connection.");
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission with Enter key
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSaveApiData();
    }
  };

  // Make decision based on weather and emotion
  const handleMakeDecision = () => {
    const weatherCondition = apiData.weather[0].main;
    const adviceText = getSkatingAdvice(weatherCondition, emotion);
    setAdvice(adviceText);
    setViewState("results");
  };

  // Reset to initial state without page reload
  const handleStartOver = () => {
    setApiData({});
    setLocation("");
    setAdvice("");
    setSliderValue(1);
    setError("");
    setIsLoading(false);
    setViewState("input");
  };

  // Render input view
  const renderInputView = () => (
    <>
      <div className="header">
        <p className="header-text">Should I Skate Today?</p>
      </div>
      <div className="location_input">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type Zip Code"
          type="text"
          aria-label="Zip code input"
          disabled={isLoading}
        />
        <Button
          className="button-effects search-button"
          onClick={handleSaveApiData}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Next"}
        </Button>
      </div>
      {error && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </>
  );

  // Render emotion slider view
  const renderEmotionView = () => (
    <>
      <div className="emotion">
        <div className="emotionSlider">
          <p>Choose How you Feel</p>
          <p className="emotionRange">( 1-Terrible | 3-Neutral | 5-Fantastic )</p>
          <RangeSlider
            className="slider"
            value={emotion}
            min={1}
            max={5}
            variant="light"
            onChange={(changeEvent) => setSliderValue(Number(changeEvent.target.value))}
            aria-label="Emotion slider"
          />
        </div>
      </div>
      <div className="advice">
        <Button
          className="button-effects search-button advice"
          onClick={handleMakeDecision}
        >
          Give Me Advice
        </Button>
      </div>
    </>
  );

  // Render results view
  const renderResultsView = () => (
    <>
      <div className="container">
        <div className="top">
          <div className="advice">
            <p>{advice}</p>
          </div>
          <div className="location">
            <h2>{apiData.name}</h2>
          </div>
          <div className="temp">
            {apiData.main ? <h1>{apiData.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {apiData.weather ? (
              <p className="bold">{apiData.weather[0].description.toUpperCase()}</p>
            ) : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold"></p>
            {apiData.main ? (
              <p className="bold">{apiData.main.feels_like.toFixed()}°F</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {apiData.main ? (
              <p className="bold">{apiData.main.humidity}%</p>
            ) : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {apiData.wind ? (
              <p className="bold">{apiData.wind.speed.toFixed()}MPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
        <Button
          className="button-effects refresh-button"
          onClick={handleStartOver}
        >
          Start Over
        </Button>
      </div>
    </>
  );

  return (
    <div className="app">
      {viewState === "input" && renderInputView()}
      {viewState === "emotion" && renderEmotionView()}
      {viewState === "results" && renderResultsView()}
    </div>
  );
}

export default App;
