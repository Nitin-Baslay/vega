import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const Slice = createSlice({
  name: "Slice",
  initialState: { imageData: "hi" },
  reducers: {
    image(state, action) {
      //   state.imageData.push(action.payload);
      state.imageData = action.payload;
      console.log(action.payload);
    },
  },
});
export const sliceAction = Slice.actions;
export default Slice.reducer;
