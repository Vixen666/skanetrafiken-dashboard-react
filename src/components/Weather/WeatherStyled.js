import styled from "styled-components";

const WeatherDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto auto;
`;

const CurrentWeather = styled.div`
  margin: 15px;
  background-color: #121212;
  border-radius: 5px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
`;

const Forecasts = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
`;

const Forecast = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  justify-content: space-between;
  background-color: #121212;
  margin: 5px;
  border-radius: 5px;
`;

const TimeStamp = styled.div`
  grid-column: 1;
  color: #75bf00;
  font-size: 36px;
  grid-column: 2;
  grid-row: 1;
`;

const Temp = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 3vw;
  grid-column: 2;
  grid-row: 2;
`;

const CurrentTemp = styled.div`
  font-size: 3vw;
  color: rgba(255, 255, 255, 0.3);
  grid-column: 3;
`;

const CurrentWind = styled.div`
  font-size: 3vw;
  position: relative;
  color: rgba(255, 255, 255, 0.3);
  grid-column: 4;
`;

const CurrentPrecipitation = styled.div`
  color: rgba(255, 255, 255, 0.3);
  grid-column: 5;
  font-size: 3vw;
`;

const WeatherIcon = styled.i`
  color: #75bf00;
  font-size: 3vw;
  grid-column: 1;
  position: relative;
  top: 15%;
`;

const ForecastIcon = styled.i`
  grid-column: 1;
  grid-row: 2 / -1;
  color: #75bf00;
  font-size: 3vw;
  position: relative;
  left: 10px;
`;

export default {
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
};
