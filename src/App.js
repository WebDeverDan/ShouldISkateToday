import React, {useState} from 'react'
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';



function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [advice, setAdvice] = useState(<div class="loading-container">
  <div class="loading"></div>
  <div id="loading-text">Advice Incoming</div>
  </div> )
  const [emotion, setEmotion] = useState('')
  const [hiddenField, setHiddenDetailsClass] = useState("hidden")
  const [hiddenForm, setHiddenFormClass] = useState("block")


  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&appid=60e9ee923c45e087f45389019a259b46`

  // const handleEmotionSelect=(selectedEmotion)=>{
  //   setEmotion(selectedEmotion)
  // };
  
  const handleLocationSearch = () => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
      console.log(response.data.weather[0])
      console.log(response.data.weather[0].main)
      makeDecision(response)
      setHiddenDetailsClass("block")
      setHiddenFormClass("hidden")
    })
  } 

  const makeDecision = (response) => {
    var weather_data = (response.data.weather[0].main).toLowerCase()
    console.log(weather_data)
    if (weather_data.includes("rain")) {
      setAdvice(<p>Probably not a good idea to skate.</p>)
    } else if (weather_data.includes("snow")) {
      setAdvice(<p>Probably not a good idea to skate.</p>)
    } else if (weather_data.includes("sun")) {
      setAdvice(<p>Get outside and skate!</p>)
    } else if (weather_data.includes("fog")) {
      setAdvice(<p>It could be foggy, but you should get out there!</p>)
    } else if (weather_data.includes("cloud")) {
      setAdvice(<p>Should be great weather to skate!</p>)
    } else if (weather_data.includes("clear")) {
      setAdvice(<p>Get outside and skate!</p>)
    }
  };

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

  

  return (
    <div className="app">
      {/* header */}
      <div className="header">
        <h2 >Should I Skate Today?</h2>
      </div>
      {/* form */}
      <div className={hiddenForm}>
        <div className="search">
            <input 
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder='Type Zip Code'
            type="text"/>
            <Button
                className="button-effects search-button"
                onClick={() => handleLocationSearch()}
              >Search
            </Button>
          </div>
        </div>
        {/* middle section */}
        <div className="container">
          <div className="top">
            <div className="advice">
              {advice}
            </div>
            <div className="location">
              <h2>{data.name}</h2>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p className="bold">{data.weather[0].description}</p> :null}
            </div>
          </div>
          {/* bottom details */}
          <div className={hiddenField}>
            <div className="bottom">
              <div className="feels">
                <p className="bold"></p>
                {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
                <p>Wind Speed</p>
              </div>
              </div>
          </div>
        </div>
    </div>
  );
}

export default App;


// api key 60e9ee923c45e087f45389019a259b46