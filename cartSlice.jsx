// cartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Stores items added to the cart
  },
  reducers: {
    // Adds an item to the cart or increments its quantity if already present
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // Removes an item entirely from the cart by matching its name
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload.name);
    },
    // Updates item quantity directly or removes it if quantity reaches zero
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        if (itemToUpdate.quantity <= 0) {
          state.items = state.items.filter((item) => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;