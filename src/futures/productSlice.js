import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// createAyncThunk : bermain dgn async function api
// memanipulasi state, format array obj & menormalisasi data jika bermain dgn nested data
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        const response = await axios.get("http://localhost:3001/products");
        return response.data;
    }
);

export const saveProduct = createAsyncThunk(
    "products/saveProduct",
    async (data) => {
        const response = await axios.post(
            "http://localhost:3001/products",
            data
        );
        return response.data;
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, title, price }) => {
        const response = await axios.patch(
            `http://localhost:3001/products/${id}`,
            {
                title,
                price,
            }
        );
        return response.data;
    }
);
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
        await axios.delete(`http://localhost:3001/products/${id}`);
        return id;
    }
);

const productEntity = createEntityAdapter({
    selectId: (product) => product.id,
});

const productSlice = createSlice({
    name: "product",
    initialState: productEntity.getInitialState(),
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            productEntity.setAll(state, action.payload);
        },
        [saveProduct.fulfilled]: (state, action) => {
            productEntity.addOne(state, action.payload);
        },
        [deleteProduct.fulfilled]: (state, action) => {
            productEntity.removeOne(state, action.payload);
        },
        [updateProduct.fulfilled]: (state, action) => {
            productEntity.updateOne(state, {
                id: action.payload.id,
                updates: action.payload,
            });
        },
    },
    // initialState: {
    //     title: "Product 1",
    //     price: "123",
    // },
    // reducers: {
    //     updateProduct: (state, action) => {
    //         state.title = action.payload.title;
    //         state.price = action.payload.price;
    //     },
    // },
});

export const productSelectors = productEntity.getSelectors(
    (state) => state.product
);
export default productSlice.reducer;
// export const { updateProduct } = productSlice.actions;
