/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeparturesStyled from "./DeparturesStyled";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AddDepartureModal from "./AddDepartureModal";
import {
  getTimeNow,
  selectSavedDepartures,
  setAllJourneys,
  getAllJourneys,
  addJourney,
  removeSavedTravel,
  setSavedDepartures,
} from "../../features/departure/departureSlice";

const axios = require("axios");
var convert = require("xml-js");
const {
  DeparturesDiv,
  Departure,
  DepartureFrom,
  DepartureDestination,
  TravelWay,
  Progressbars,
  Progressbar,
  RemoveButton,
  TravelHeader,
} = DeparturesStyled;

const Departures = () => {
  const preconfiguredSearches = useSelector(selectSavedDepartures);
  const timeNow = useSelector(getTimeNow);
  const dispatch = useDispatch();
  const customResor = useSelector(getAllJourneys);

  useEffect(() => {
    let newTime = new Date(timeNow);
    let seconds = newTime.getSeconds();
    if (seconds % 60 === 0) {
      loadContent();
    }
  }, [timeNow]);

  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("savedSearches"));
    console.log(temp);

    if (temp && temp.length > 0) {
      dispatch(setSavedDepartures(temp));
    }
  }, []);

  useEffect(() => {
    dispatch(setAllJourneys([]));
    loadContent();
  }, [preconfiguredSearches]);

  const loadContent = () => {
    dispatch(setAllJourneys([]));
    for (let i = 0; i < preconfiguredSearches.length; i++) {
      axios
        .get(
          "http://www.labs.skanetrafiken.se/v2.2/resultspage.asp?cmdaction=next&selPointFr=" +
            preconfiguredSearches[i].from +
            "" +
            (preconfiguredSearches[i].fromId
              ? "|" + preconfiguredSearches[i].fromId
              : "") +
            "|0&selPointTo=" +
            preconfiguredSearches[i].to +
            "" +
            (preconfiguredSearches[i].toId
              ? "|" + preconfiguredSearches[i].toId
              : "") +
            "|0"
          //"http://www.labs.skanetrafiken.se/v2.2/resultspage.asp?cmdaction=next&selPointFr=malm%F6%20C|80000|0&selPointTo=landskrona|82000|0"
        )

        .then(function (response) {
          // handle success
          var result1 = convert.xml2js(response.data, {
            compact: true,
            spaces: 4,
          });

          let start = "";
          let end = "";
          let journeys =
            result1["soap:Envelope"]["soap:Body"].GetJourneyResponse
              .GetJourneyResult.Journeys;

          if (!journeys.Journey[0].RouteLinks.RouteLink[0]) {
            start = journeys.Journey[0].RouteLinks.RouteLink.From.Name._text;
            end = journeys.Journey[0].RouteLinks.RouteLink.To.Name._text;
          }

          if (journeys.Journey[0].RouteLinks.RouteLink.length > 0) {
            start = journeys.Journey[0].RouteLinks.RouteLink[0].From.Name._text;
            end =
              journeys.Journey[0].RouteLinks.RouteLink[
                journeys.Journey[0].RouteLinks.RouteLink.length - 1
              ].To.Name._text;
          }

          let travel = {
            start: start,
            destination: end,
            startId: preconfiguredSearches[i].fromId,
            destinationId: preconfiguredSearches[i].toId,
            departures: [],
          };

          journeys.Journey.map((resa) => {
            let DepDateTime = new Date(resa.DepDateTime._text).getTime();
            let effect = "";
            let delay = 0;
            let RouteLinkRoot = resa.RouteLinks.RouteLink[0]
              ? resa.RouteLinks.RouteLink[0]
              : resa.RouteLinks.RouteLink;
            let canceled = false;
            let RealTimeInfo = RouteLinkRoot.RealTime.RealTimeInfo;

            if (RealTimeInfo) {
              if (RealTimeInfo.DepDeviationAffect) {
                effect = RealTimeInfo.DepDeviationAffect._text;
              }
              if (RealTimeInfo.Canceled) {
                canceled = true;
              }
              if (RealTimeInfo.DepTimeDeviation) {
                delay = RealTimeInfo.DepTimeDeviation._text;
              }
            }
            if (!canceled) {
              travel.departures.push({
                time: DepDateTime,
                delay: delay,
                effect: effect,
              });
            }
            return null;
          });

          dispatch(addJourney(travel));
        })
        .catch(function (error) {
          // handle error
          new Error(error);
        })
        .finally(function () {});
    }
  };

  return (
    <DeparturesDiv>
      {customResor &&
        customResor.length > 0 &&
        customResor.slice(0, 4).map((resa, index) => {
          return (
            <TravelWay row={"TW_" + index}>
              <TravelHeader row={"TH_" + index}>
                <DepartureFrom row={"TH_DF_" + index}>
                  {resa.start}
                </DepartureFrom>
                <RemoveButton
                  row={"TH_RB_" + index}
                  onClick={() => dispatch(removeSavedTravel(resa))}
                >
                  {" "}
                  x{" "}
                </RemoveButton>
                <DepartureDestination row={"TH_DD_" + index}>
                  {resa.destination}
                </DepartureDestination>
              </TravelHeader>

              <Progressbars>
                {resa.departures.map((departure, i) => {
                  return (
                    <Departure key={index + "_" + departure.time}>
                      <Progressbar row={"Progressbar" + index + "_" + i}>
                        <CircularProgressbar
                          value={
                            timeNow &&
                            (
                              (departure.time -
                                timeNow +
                                departure.delay * 6000) /
                              1000 /
                              60
                            )
                              .toString()
                              .split(".")[0]
                          }
                          maxValue={20}
                          text={
                            timeNow &&
                            (
                              (departure.time -
                                timeNow +
                                departure.delay * 6000) /
                              1000 /
                              60
                            )
                              .toString()
                              .split(".")[0]
                          }
                          styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.0,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: "butt",

                            // Text size
                            textSize: "48px",

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            pathColor: `#75bf00`,
                            textColor: "#75bf00",
                            trailColor: "transparent",
                            backgroundColor: "#000000",
                          })}
                        />
                      </Progressbar>
                    </Departure>
                  );
                })}
              </Progressbars>
            </TravelWay>
          );
        })}

      {AddDepartureModal()}
    </DeparturesDiv>
  );
};

export default Departures;
