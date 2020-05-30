import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "axios";
import {
  saveTempPoints,
  selectSavedDepartures,
  setGps,
  getGps,
} from "../../features/departure/departureSlice";
import AddDepartureModalStyled from "./AddDepartureModalStyled";

const { AddJourneyButton } = AddDepartureModalStyled;
var convert = require("xml-js");

const AddDepartureModal = () => {
  const [show, setShow] = useState(false);
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const dispatch = useDispatch();
  const gps = useSelector(getGps);
  const allSavedSearches = useSelector(selectSavedDepartures);

  const [temp, setTemp] = useState({
    from: "",
    fromId: null,
    to: "",
    toId: null,
    gps: gps,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const searchAPI = (event, direction) => {
    let urlValue = event.target.value;
    let points = [];
    setFrom([]);
    axios
      .get(
        "http://www.labs.skanetrafiken.se/v2.2/querystation.asp?inpPointfr=" +
          urlValue
      )
      .then((res) => {
        var result = convert.xml2js(res.data, {
          compact: true,
          spaces: 4,
        });
        if (
          result["soap:Envelope"]["soap:Body"].GetStartEndPointResponse
            .GetStartEndPointResult.StartPoints
        ) {
          result["soap:Envelope"][
            "soap:Body"
          ].GetStartEndPointResponse.GetStartEndPointResult.StartPoints.Point.map(
            (point) => {
              points.push({ id: point.Id._text, name: point.Name._text });
              return null;
            }
          );
        }
        if (direction === 0) {
          setFrom(points);
        } else {
          setTo(points);
        }
      });
  };

  const addToTemp = (point, toOrFrom) => {
    if (toOrFrom === 0) {
      setTemp({ ...temp, from: point.name, fromId: point.id });
    } else {
      setTemp({ ...temp, to: point.name, toId: point.id });
    }
  };

  const handleSave = () => {
    if (temp.fromId !== null && temp.toId !== null) {
      dispatch(saveTempPoints(temp));
    }
    localStorage.setItem("savedSearches", JSON.stringify([...allSavedSearches, temp]));
  };

  const saveGps = (e) => {
    dispatch(setGps(e.target.value))
    localStorage.setItem("gps", JSON.stringify(e.target.value));
  };

  return (
    <>
      <AddJourneyButton variant="primary" onClick={handleShow}>
        Add more journeys
      </AddJourneyButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a journey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Set Map Location:
          <input type="text" onChange={(e) => saveGps(e)}></input>
          From:
          <input type="text" onChange={(e) => searchAPI(e, 0)}></input>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>From</th>
              </tr>
            </thead>
            <tbody>
              {from.map((point, index) => (
                <tr
                  key={"to_" + from}
                  onClick={() => addToTemp(point, 0)}
                  style={{
                    backgroundColor:
                      point.id === temp.fromId ? "lightblue" : "",
                  }}
                >
                  <td>{point.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          To:
          <input type="text" onChange={(e) => searchAPI(e, 1)}></input>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>From</th>
              </tr>
            </thead>
            <tbody>
              {to.map((point, index) => (
                <tr
                  key={"to_" + index}
                  onClick={() => addToTemp(point, 1)}
                  style={{
                    backgroundColor: point.id === temp.toId ? "lightblue" : "",
                  }}
                >
                  <td>{point.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add journey
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddDepartureModal;
