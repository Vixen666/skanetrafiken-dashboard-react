import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
const DeparturesDiv = styled.div`
  position: grid;
  grid-template-rows: 25% 25% 25% 25%;
  align-content: right;
  margin-right: 2vw;
  @media (max-width: 1000px) {
    grid-template-rows: 50% 50%;
    grid-template-columns: 40% 40%;
  }
`;

const Departure = styled.div``;

const DepartureFrom = styled.div`
  grid-column: 1 / 2;
  grid-row: 1;
  font-size: 3vh;
  font-weight: bold;
`;

const DepartureDestination = styled.div`
  font-size: 2vh;
  grid-column: 1 / 2;
  grid-row: 2;
`;

const TravelWay = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  transition: 0.3s;
  margin-bottom: 30px;
  grid-row: ${(props) => (props.row ? props.row : 1)};
  width: 100%;
  @media (max-width: 1000px) {
    grid-row: ${(props) => (props.row % 2 === 0 ? 1 : 2)};
    grid-column: ${(props) => (props.row < 2 ? 1 : 2)};
    display: grid;
    grid-template-columns: auto auto;
  }
`;

const Progressbar = styled.div`
  width: 4vw;
  height: 4vw;
  margin-left: 10px;
  @media (max-width: 1000px) {
    width: 8vw;
    height: 8vw;
    
  }
`;

const Progressbars = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: left;
  @media (max-width: 1000px) {
    grid-column: 2;
    justify-content: right;
    position: relative;
    top: 10px;
  }
`;

const TravelHeader = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  @media (max-width: 1000px) {
    grid-column: 1;
  }
`;

const RemoveButton = styled.button`
  grid-column: 2 / 2;
  grid-row: 1;
  width: 2vw;
  height: 2vw;
  background-color: transparent;
  border: none;
  font-size: 20px;
`;

export default {
  DeparturesDiv,
  Departure,
  DepartureFrom,
  DepartureDestination,
  TravelWay,
  Progressbars,
  Progressbar,
  RemoveButton,
  TravelHeader,
};
