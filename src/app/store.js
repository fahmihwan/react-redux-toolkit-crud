import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../futures/productSlice";

export const store = configureStore({
    reducer: {
        product: productSlice,
    },
});
