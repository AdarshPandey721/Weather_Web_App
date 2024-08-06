import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css'

import cloudBG from '../Assets/cloudbg.jpg';
import clearBG from '../Assets/clearbg.jpg';
import rainBG from '../Assets/rainbg.png';
import drizzleBG from '../Assets/drizzlebg.jpg';
import mistBG from '../Assets/snowbg.jpg';
import hazeBG from '../Assets/hazebg.jpg';

import search_icon from "../Assets/search.png";
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import cloudImage from '../Assets/cloud.png';
import clearImage from '../Assets/clear.png';
import rainImage from '../Assets/rain.png';
import drizzleImage from '../Assets/drizzle.png';
import mistImage from '../Assets/snow.png';

function WeatherApp() {
  const[data, setData] = useState({
    celcius: 22,
    name: 'Allahabad',
    humidity: 10,
    speed: 2,
    FeelsLike: 23,
    image: cloudImage,
    BGimage: cloudBG,
    weatherCondition: 'Cloudy',
  });
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=Metric&appid=a4ed0da00513df329b5fc187df5e763e`;
      axios.get(apiUrl)
        .then(res => {
          console.log(res.data);
          let imagePath = '';
          let bgImage = '';
          if (res.data.weather[0].main === "Clouds") {
            imagePath = cloudImage;
            bgImage = cloudBG;
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = clearImage;
            bgImage = clearBG;
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = rainImage;
            bgImage = rainBG;
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = drizzleImage;
            bgImage = drizzleBG;
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = mistImage;
            bgImage = mistBG;
          } else if (res.data.weather[0].main === "Haze") {
            bgImage = hazeBG;
            imagePath = cloudImage;
          } else {
            imagePath = cloudImage;
            bgImage = cloudBG;
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
            BGimage: bgImage,
            weatherCondition: res.data.weather[0].main,
            FeelsLike: res.data.main.feels_like,
          });
          setError('');
        })
        .catch(err => {
          if (err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError('');
          }
          console.log(err);
        });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="main">
      <div className="background-container" style={{ backgroundImage: `url(${data.BGimage})` }}>
        <div className='container'>
          <div className="top-bar">
            <input
              type="text"
              className="CityInput"
              placeholder='Search'
              onChange={e => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="search_icon" onClick={handleClick}>
              <img src={search_icon} alt="" />
            </div>
          </div>
          <div className="error">{error}</div>
          <div className="weather_image">
            <img src={data.image} alt="" />
          </div>
          <div className="weather_temp">{data.celcius.toFixed(0)}°C</div>
          <div className="weather_location">{data.name} - {data.weatherCondition}</div>
          <div className="data_container">
            <div className="element">
              <img src={humidity_icon} alt="" className='icon' />
              <div className="data">
                <div className="humidity_percent">{data.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className='icon' />
              <div className="data">
                <div className="wind_rate">{data.speed.toFixed(0)} km/hr</div>
                <div className="text">Wind Speed</div>
              </div>
              <div className="element">
                <img src={humidity_icon} alt="" className='icon' />
                <div className="data">
                  <div className="wind_rate">{data.FeelsLike.toFixed(0)} °C</div>
                  <div className="text">Feels Like</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
