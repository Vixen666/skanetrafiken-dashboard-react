import React from "react";
import Map from "./Map/Map";
import Watch from "./Watch/Watch";
import Departures from "./Departures/Departures";
import RootPageStyled from "./RootPageStyled";
import Weather from "./Weather/Weather";
//import SpeechFinder from "./SpeechFinder/SpeechFinder";

const { RootDiv, MapDiv, DeparturesDiv, WatchDiv, WeatherDiv } = RootPageStyled;

const RootPage = () => {
  return (
    <RootDiv>
      <MapDiv>
        <Map />
      </MapDiv>
      <WatchDiv>
        <Watch />
      </WatchDiv>

      <DeparturesDiv>
        <Departures time={new Date()} />
      </DeparturesDiv>
      <WeatherDiv>
        <Weather />
      </WeatherDiv>
    </RootDiv>
  );
};

export default RootPage;
