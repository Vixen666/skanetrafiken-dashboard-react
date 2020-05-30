/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WeatherStyled from "./WeatherStyled";
import {
  getTimeNow,
  setCurrentWeather,
  setUpcommingWeather,
  getCurrentWeather,
  getUpcommingWeather,
} from "../../features/departure/departureSlice";
import '../../css/weather-icons.min.css'
const axios = require("axios");

const {
  WeatherDiv,
  CurrentWeather,
  Forecasts,
  Forecast,
  TimeStamp,
  Temp,
  CurrentTemp,
  CurrentWind,
  WeatherIcon,
  ForecastIcon,
  CurrentPrecipitation,
} = WeatherStyled;

const Weather = () => {
 
  const timeNow = useSelector(getTimeNow);
  const dispatch = useDispatch();
  const forecast = useSelector(getUpcommingWeather);
  const current = useSelector(getCurrentWeather);

  const [icons] = useState([
    { wsymb2: 1, tag: "wi-day-sunny", name: "Clear sky" },
    { wsymb2: 2, tag: "wi-day-sunny", name: "Nearly clear sky" },
    { wsymb2: 3, tag: "wi-day-cloudy", name: "Variable cloudiness" },
    { wsymb2: 4, tag: "wi-day-cloudy", name: "Halfclear sky" },
    { wsymb2: 5, tag: "wi-day-cloudy", name: "Cloudy sky" },

    { wsymb2: 6, tag: "wi-day-sunny-overcast", name: "Overcast" },
    { wsymb2: 7, tag: "wi-day-fog", name: "Fog" },
    { wsymb2: 8, tag: "wi-day-rain", name: "Light rain showers" },
    { wsymb2: 9, tag: "wi-day-rain", name: "Moderate rain showers" },
    { wsymb2: 10, tag: "wi-day-rain", name: "Heavy rain showers" },

    { wsymb2: 11, tag: "wi-day-thunderstorm", name: "Thunderstorm" },
    { wsymb2: 12, tag: "wi-day-hail", name: "Light sleet showers" },
    { wsymb2: 13, tag: "wi-day-hail", name: "Moderate sleet showers" },
    { wsymb2: 14, tag: "wi-day-hail", name: "Heavy sleet showers" },

    { wsymb2: 15, tag: "wi-day-snow", name: "Light snow showers" },
    { wsymb2: 16, tag: "wi-day-snow", name: "Moderate snow showers" },
    { wsymb2: 17, tag: "wi-day-snow", name: "Heavy snow showers" },

    { wsymb2: 18, tag: "wi-day-rain", name: "Light rain" },
    { wsymb2: 19, tag: "wi-day-rain", name: "Moderate rain" },
    { wsymb2: 20, tag: "wi-day-rain", name: "Heavy rain" },

    { wsymb2: 21, tag: "wi-day-thunderstorm", name: "Thunder" },

    { wsymb2: 22, tag: "wi-day-hail", name: "Light sleet" },
    { wsymb2: 23, tag: "wi-day-hail", name: "Moderate sleet" },
    { wsymb2: 24, tag: "wi-day-hail", name: "Heavy sleet" },

    { wsymb2: 25, tag: "wi-day-snow", name: "Light snowfall" },
    { wsymb2: 26, tag: "wi-day-snow", name: "Moderate snowfall" },
    { wsymb2: 27, tag: "wi-day-snow", name: "Heavy snowfall" },
  ]);

  useEffect(() => {
    let newTime = new Date(timeNow);
    let seconds = newTime.getSeconds();
    let minutes  = newTime.getMinutes();

    if (seconds % 60 === 0 && minutes % 15 === 0) {
      fetchWeather();
    }
  }, [timeNow]);

  const fetchWeather = () => {
    axios
      .get(
        "http://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/13.194710/lat/55.702888/data.json"
      )
      .then(function (response) {
        dispatch(setCurrentWeather(response.data.timeSeries[0]));
        let arr = [];
        for (let i = 1; i < 6; i++) {
          arr.push(response.data.timeSeries[i * 3]);
        }
        dispatch(setUpcommingWeather(arr));
      })
      .catch(function (error) {
        console.Error(new Error(error));
      });
  }

  return (
    <div>
      {current &&
        current.parameters &&
        current.parameters.length > 0 &&
        forecast &&
        forecast.length > 0 && (
          <WeatherDiv>
            <CurrentWeather>
              
              <WeatherIcon
                className={
                  "wi " +
                  icons[
                    current.parameters.find((para) => para.name === "Wsymb2")
                      .values[0] - 1
                  ].tag
                }
              ></WeatherIcon>
              <TimeStamp>{current.validTime.substring(11, 16)}</TimeStamp>
              <CurrentTemp>
                {current.parameters.find((para) => para.name === "t").values[0]}
                <p style={{ display: "inline-block", fontSize: "15px" }}>°C</p>
              </CurrentTemp>
              <CurrentWind>
                {
                  current.parameters.find((para) => para.name === "ws")
                    .values[0]
                }
                <p style={{ display: "inline-block", fontSize: "15px" }}>
                  {current.parameters.find((para) => para.name === "ws").unit}
                </p>
              </CurrentWind>
              <CurrentPrecipitation>
                {current.parameters.find((para) => para.name === "pmax")
                  .values[0] > 0
                  ? current.parameters.find((para) => para.name === "pmin")
                      .values[0] +
                    "-" +
                    current.parameters.find((para) => para.name === "pmax")
                      .values[0]
                  : "0"}

                <p style={{ display: "inline-block", fontSize: "15px" }}>
                  mm/h
                </p>
              </CurrentPrecipitation>
            </CurrentWeather>
            <Forecasts>
              {forecast.map((timestamp) => (
                <Forecast key={"fc_"+timestamp.validTime}>
                  <TimeStamp>{timestamp.validTime.substring(11, 16)}</TimeStamp>{" "}
                  <Temp>
                    {
                      timestamp.parameters.find((para) => para.name === "t")
                        .values[0]
                    }
                    <p style={{ display: "inline-block", fontSize: "15px" }}>
                      °C
                    </p>
                  </Temp>
                  <ForecastIcon
                    className={
                      "wi " +
                      icons[
                        timestamp.parameters.find(
                          (para) => para.name === "Wsymb2"
                        ).values[0] - 1
                      ].tag
                    }
                  ></ForecastIcon>
                </Forecast>
              ))}
            </Forecasts>
          </WeatherDiv>
        )}
    </div>
  );
};

export default Weather;
