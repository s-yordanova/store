import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },

        incQuantity: (state, action) => {
            const product = state.products.find((product) => product._id === action.payload);
            product.quantity++;
            state.total += product.price;
        },

        decQuantity: (state, { payload }) => {
            const product = state.products.find((product) => product._id === payload);
            if (product.quantity > 1) {
                product.quantity--;
                state.total -= product.price;
            }
        },

        removeProduct: (state, { payload }) => {
            const index = state.products.findIndex(
                (product) => product._id === payload
            );
            const product = state.products.find((product) => product._id === payload);
            state.products.splice(index, 1);
            state.quantity--;
            state.total -= product.price * product.quantity;
        },

    },
});

export const { addProduct, removeCart, incQuantity, decQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;