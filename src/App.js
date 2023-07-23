import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

function App() {
  const [apiData, setApiData] = useState({});
  const [location, setLocation] = useState("");
  const [advice, setAdvice] = useState(
    <div className="loading-container">
      <div className="loading"></div>
      <div id="loading-text">Waiting...</div>
    </div>
  );
  const [hiddenHeader, setHeadertoHiddenClass] = useState("block");
  const [hiddenField, setHiddenBottomDetailsClass] = useState("hidden");
  const [hiddenSlider, setSliderToHiddenClass] = useState("hidden");
  const [hiddenWeather, setWeatherDetailsToHiddenClass] = useState("hidden");
  const [hiddenNext, setNextButtonToHiddenClass] = useState("block");
  const [emotion, setSliderValue] = useState(0);

  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&appid=60e9ee923c45e087f45389019a259b46`;
  const location_input = (
    <input
      value={location}
      onChange={(event) => setLocation(event.target.value)}
      placeholder="Type Zip Code"
      type="text"
    />
  );
  const save_api_data_button = (
    <Button
      className="button-effects search-button"
      onClick={() => handleSaveApiData()}
    >
      Next
    </Button>
  );
  const give_advice_button = (
    <Button
      className="button-effects search-button advice"
      onClick={() => handleMakeDecision()}
    >
      Give Me Advice
    </Button>
  );
  const emotion_range_slider = (
    <div classname="emotionSlider">
      <p>Choose How you Feel</p>
      <p className="emotionRange">( 1-Terrible | 3-Neutral | 5-Fantastic )</p>
      <RangeSlider
        className="slider"
        value={emotion}
        min={1}
        max={5}
        variant="light"
        onChange={(changeEvent) => setSliderValue(changeEvent.target.value)}
      />
    </div>
  );

  // saves Api Data and sets the state of the data
  const handleSaveApiData = () => {
    axios.get(url).then((response) => {
      // saves the api call data in state
      setApiData(response.data);
      setNextButtonToHiddenClass("hidden");
      setSliderToHiddenClass("block");
      setWeatherDetailsToHiddenClass("hidden");
    });
  };

  // takes api data and emotion data and makes decision
  const handleMakeDecision = () => {
    var weather_data = apiData.weather[0].main;
    setHeadertoHiddenClass("hidden");
    setSliderToHiddenClass("hidden");
    setWeatherDetailsToHiddenClass("block");
    setHiddenBottomDetailsClass("block");
    // weather condition constants
    const bad_weather = [
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
      "Thunderstorm",
    ];
    const great_weather = ["Clear"];
    const alright_weather = ["Fog", "Clouds"];
    const questionable_weather = ["Haze"];
    // controls verbiage based on weather type and emotions
    if (bad_weather.includes(weather_data)) {
      setAdvice(<p>Weather looks bad. You should stay inside and rest!</p>);
    } else if (questionable_weather.includes(weather_data)) {
      setAdvice(<p>Weather is questionable. Use your best judgement here!</p>);
    } else if (great_weather.includes(weather_data) && emotion == 5) {
      setAdvice(<p>It was mean to be! Bring yo water!</p>);
    } else if (great_weather.includes(weather_data) && emotion == 4) {
      setAdvice(<p>Weather looks great! You should be outside skating!</p>);
    } else if (great_weather.includes(weather_data) && emotion == 3) {
      setAdvice(<p>Weather looks great! When in doubt, go skate!</p>);
    } else if (great_weather.includes(weather_data) && emotion == 2) {
      setAdvice(<p>Weather looks great! You will feel better if you skate!</p>);
    } else if (great_weather.includes(weather_data) && emotion == 1) {
      setAdvice(<p>Weather looks good, but maybe get some rest today.</p>);
    } else if (alright_weather.includes(weather_data) && emotion == 5) {
      setAdvice(<p>It was meant to be! Bring yo water!</p>);
    } else if (alright_weather.includes(weather_data) && emotion == 4) {
      setAdvice(<p>Weather looks alright. You should be outside skating!</p>);
    } else if (alright_weather.includes(weather_data) && emotion == 3) {
      setAdvice(<p>When in doubt, go skate!</p>);
    } else if (alright_weather.includes(weather_data) && emotion == 2) {
      setAdvice(<p>Weather looks alright, but take it easy out there!</p>);
    } else if (alright_weather.includes(weather_data) && emotion == 1) {
      setAdvice(
        <p>Weather looks alright, but you should get some rest today!</p>
      );
    }
  };

  const handleStartOver = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      {/* header */}
      <div className={hiddenHeader}>
        <div className="header">
          <p className="header-text">Should I Skate Today?</p>
        </div>
      </div>
      {/* form */}
      <div className={hiddenNext}>
        <div className="location_input">
          {location_input}
          {save_api_data_button}
        </div>
      </div>
      <div className={hiddenSlider}>
        <div className="emotion">{emotion_range_slider}</div>
        <div classname="advice">{give_advice_button}</div>
      </div>
      {/* middle section */}
      <div className="container">
        <div className={hiddenWeather}>
            <div className="top">
              <div className="advice">{advice}</div>
              <div className="location">
                <h2>{apiData.name}</h2>
              </div>
              <div className="temp">
                {apiData.main ? <h1>{apiData.main.temp.toFixed()}°F</h1> : null}
              </div>
              <div className="description">
                {apiData.weather ? (
                  <p className="bold">{(apiData.weather[0].description).toUpperCase()}</p>
                ) : null}
            </div>
          </div>
        </div>
        {/* bottom details */}
        <div className={hiddenField}>
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
              {apiData.main ? (
                <p className="bold">{apiData.wind.speed.toFixed()}MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
          {/* start over/refresh button */}
          <Button
            className="button-effects refresh-button"
            onClick={() => handleStartOver()}
          >
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

// const photo = {

// }

// const rainyPhoto = {
//   "--background-photo": '/assets/rainy.png'
// }

// const snowyPhoto = {
//   "--background-photo": '/assets/snow.png'
// }

// const sunnyPhoto = {
//   "--background-photo": '/assets/sunny.png'
// }

// const overcastPhoto = {
//   "--background-photo": '/assets/overcast.png'
// }

// const setBackgroundPicture = () => {
//   if ((data.weather[0].description).contains('rain')) {
//   // set background photo to rainy one
//   "--background-photo": '/assets/rainy.png'
//   } else if ((data.weather[0].description).contains('snow')) {
//   // set background photo to snowy one

//   } else if ((data.weather[0].description).contains('sun')) {
//   // set background photo to sunny one

//   } else if ((data.weather[0].description).contains('overcast')) {
//   // set background photo to overcast one
//   }
// };
