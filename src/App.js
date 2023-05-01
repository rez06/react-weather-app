import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [icon, setIcon] = useState("");
  const handleCityChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleWeatherSearch = () => {
    axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd3bb6534458ba51b48c49f5155745b6&units=metric`
      )
      .then((response) => {
        setTemperature(response.data.main.temp);
        setDescription(response.data.weather[0].description);
        setHumidity(response.data.main.humidity);
        setIcon(response.data.weather[0].icon);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <input type="text" value={city} onChange={handleCityChange} />
      <button onClick={handleWeatherSearch}>Search</button>
      {temperature && (
        <ul className="temp-info">
          <li>City Name: {city} </li>
          <li>Temperature: {temperature}°C</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt="weather-icon"
          />
        </ul>
      )}
      <p className="coder">Coded by <a href='#'>Rezyl Pelobello</a></p>
    </div>
  );
}

export default App;
