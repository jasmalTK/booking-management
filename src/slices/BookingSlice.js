import { createSlice } from "@reduxjs/toolkit";
import * as data from "../datas";

const initialState = localStorage.getItem("booking")
  ? JSON.parse(localStorage.getItem("booking"))
  : data.booking_details;

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookingSuccess: (state, action) => {
      const index = state.findIndex((object) => {
        return object.BookingID === action.payload.BookingID;
      });
      console.log(action.payload.BookingID);
      state[index]["Status"] = action.payload.Status;
      //   let stateObject = state.filter((i) => i.BookingID === action.payload.BookingID);
      //   state = [...state, action.payload];
      localStorage.setItem("booking", JSON.stringify(state));
    },
  },
});

export const { bookingSuccess } = bookingSlice.actions;
export default bookingSlice.reducer;
