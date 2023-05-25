import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";

const Store = configureStore({
  reducer: Slice,
});

export default Store;
