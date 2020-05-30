import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import departureReducer from '../features/departure/departureSlice'

export default configureStore({
  reducer: {
    departure: departureReducer
  },
  middleware: [...getDefaultMiddleware()]
});
