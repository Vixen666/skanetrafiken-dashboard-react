import { createSlice } from "@reduxjs/toolkit";

export const departureSlice = createSlice({
  name: "departure",
  initialState: {
    haveLoadedSavedDepartures: false,
    savedDepartures: [
      {
        from: "Uts%C3%A4ttaregr%C3%A4nden",
        fromId: "81750",
        to: "lund%20C",
        toId: "81216",
      },
      {
        from: "lund%20C",
        fromId: "81216",
        to: "malm%F6%20C",
        toId: "80000",
      },
    ],
    journeys: [],
    currentWeather: {},
    upcommingWeather: [],
    timeNow: null,
    gps: "55.607910,13.002608,16.84",
  },
  reducers: {
    setHaveLoaded: (state) => {
      state.haveLoadedSavedDepartures = true;
    },
    setSavedDepartures: (state, action) => {
      state.savedDepartures = action.payload;
    },
    setTimeNow: (state, action) => {
      state.timeNow = action.payload;
    },
    setAllJourneys: (state, action) => {
      state.journeys = action.payload;
    },
    addJourney: (state, action) => {
      state.journeys.push(action.payload);
      state.journeys.sort((b, a) => a.from - b.from);
    },
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setUpcommingWeather: (state, action) => {
      state.upcommingWeather = action.payload;
    },
    removeSavedTravel: (state, action) => {
      state.savedDepartures = state.savedDepartures.filter(
        (dep) =>
          dep.fromId !== action.payload.startId ||
          dep.toId !== action.payload.destinationId
      );
      state.journeys = state.journeys.filter(
        (journey) =>
          journey.startId !== action.payload.startId ||
          journey.destinationId !== action.payload.destinationId
      );
    },
    saveTempPoints: (state, action) => {
      state.savedDepartures.push(action.payload);
    },
    setGps: (state, action) => {
      state.gps = action.payload;
    },
  },
});

export const {
  setSavedDepartures,
  setHaveLoaded,
  setTimeNow,
  setAllJourneys,
  saveTempPoints,
  addJourney,
  setCurrentWeather,
  setGps,
  setUpcommingWeather,
  removeSavedTravel,
} = departureSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
*/

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSavedDepartures = (state) => state.departure.savedDepartures;
export const getTimeNow = (state) => state.departure.timeNow;
export const getAllJourneys = (state) => state.departure.journeys;
export const getCurrentWeather = (state) => state.departure.currentWeather;
export const getUpcommingWeather = (state) => state.departure.upcommingWeather;
export const getGps = (state) => state.departure.gps;

export default departureSlice.reducer;
