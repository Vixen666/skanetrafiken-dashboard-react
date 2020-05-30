import React, { useEffect } from "react";
import IframeResizer from "iframe-resizer-react";
import { useSelector, useDispatch } from "react-redux";
import { getGps, setGps } from "../../features/departure/departureSlice";

export default function Map() {
  const gps = useSelector(getGps);
  const dispatch = useDispatch();
  
  useEffect(() => {
    let gps = JSON.parse(localStorage.getItem("gps"));

    if (gps !== null) {
      dispatch(setGps(gps));
    }
  }, [dispatch]);
  return (
    <>
      <IframeResizer
        src={"https://skane-karta.livemap24.com/#/@" + gps}
        style={{
          width: "1px",
          minWidth: "100%",
          height: "1px",
          minHeight: "100%",
        }}
        onChange={(e) => console.log(e)}
      />
    </>
  );
}
