import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const LoadCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Save to localStorage
const SaveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: LoadCart(),
  },
  reducers: {
    AddToCart: (state, action) => {
      const product = action.payload;

      const existing = state.items.find(
        (item) =>
          item._id === product._id &&
          item.variation.color === product.variation.color &&
          item.variation.size === product.variation.size
      );

      if (existing) {
        existing.quantity += 1; // ✅ increase qty
      } else {
        state.items.push({ ...product, quantity: 1 }); // ✅ first time
      }

      SaveCart(state.items);
    },
    RemoveFromCart: (state, action) => {
      state.items = state.items.filter((item, index) => index !== action.payload);
      SaveCart(state.items);
    },
    ClearCart: (state) => {
      state.items = [];
      SaveCart([]);
    },
  },
});

export const { AddToCart, RemoveFromCart, ClearCart } = CartSlice.actions;
export default CartSlice.reducer;