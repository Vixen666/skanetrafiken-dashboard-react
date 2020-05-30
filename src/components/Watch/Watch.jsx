import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WatchStyled from "./WatchStyled";
import {
  setTimeNow,
  getTimeNow,
} from "../../features/departure/departureSlice";
import AddDepartureModal from "../Departures/AddDepartureModal";
const { DigitalWatch } = WatchStyled;

const Watch = () => {
  const timeNow = useSelector(getTimeNow);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => tick(), 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tick() {
    dispatch(setTimeNow(new Date().getTime()));
  }

  return (
    <DigitalWatch>
      {timeNow && new Date(timeNow).toLocaleTimeString()}
      
    </DigitalWatch>
  );
};

export default Watch;
