import styled from "styled-components";

const RootDiv = styled.div`
  background-color: #000000;

  height: 100vh;
  width: 100vw;
  display: grid;

  grid-template-columns: 65% 33%;
  grid-template-rows: 70% 25%;
  grid-column-gap: 1%;
  grid-row-gap: 1%;
  overflow: auto;

  @media (max-width: 1000px) {
    height: auto;
    overflow: visible;
    grid-template-columns: auto;
    grid-template-rows: 60vh 35vh 60vh 25vh;
    grid-column-gap: 1%;
    grid-row-gap: 1%;
    background-color: #121212;
    min-width: 600px;
  }
`;

const MapDiv = styled.div`
  grid-row: 1;
  @media (max-width: 1000px) {
    grid-row: 3;
  }
`;

const WatchDiv = styled.div`
  grid-row: 2;
  grid-column: 2;
  @media (max-width: 1000px) {
    grid-row: 4;
    grid-column: 1;
  }
`;

const DeparturesDiv = styled.div`
  grid-row: 1;
  @media (max-width: 1000px) {
    grid-row: 1;
  }
`;

const WeatherDiv = styled.div`
  grid-column: 1;
  grid-row: 2;
  @media (max-width: 1000px) {
    grid-row:2;
  }
`;

export default {
  RootDiv,
  MapDiv,
  WatchDiv,
  DeparturesDiv,
  WeatherDiv,
};
