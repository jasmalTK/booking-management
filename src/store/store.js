import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import BookingReducer from "../slices/BookingSlice";

export default configureStore({
  reducer: {
    BookingDetails: BookingReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  // devTools: false,
});
