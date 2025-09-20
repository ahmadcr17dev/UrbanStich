import { createSlice } from "@reduxjs/toolkit";

// load wishlist from LocalStorage
const LoadWishlist = () => {
    const wish = localStorage.getItem("wishlist");
    return wish ? JSON.parse(wish) : [];
};

// save to local storage
const SaveWishlist = (wish) => {
    localStorage.setItem("wishlist", JSON.stringify(wish));
};

const WishSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: LoadWishlist(),
    },
    reducers: {
        AddToWishlist: (state, action) => {
            const product = action.payload;
            const ExistProduct = state.items.find(
                (item) => item._id === product._id && item.variation.color === product.variation.color && item.variation.size === product.variation.size
            );
            if (ExistProduct) {
                action.payload.error = true;
            } else {
                state.items.push({ ...product, quantity: 1, stock: product.variation.stock });
                SaveWishlist(state.items);
                action.payload.error = false;
            }
        },
    }
});

export const { AddToWishlist } = WishSlice.actions;
export default WishSlice.reducer;