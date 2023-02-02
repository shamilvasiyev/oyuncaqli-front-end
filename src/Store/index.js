import { configureStore, createSlice } from "@reduxjs/toolkit";

const card = createSlice({
  name: "card",
  initialState: { items: [], totalQuantity: 0 },

  reducers: {
    addItemToCard(state, action) {
      const { id, price, image, title } = action.payload;
      const exitingItem = state.items.find((item) => item.id === id);
      state.totalQuantity++;

      if (!exitingItem) {
        state.items.push({
          id: id,
          price: price,
          image: image,
          quantity: 1,
          totalPrice: price,
          title: title,
        });
      } else {
        exitingItem.quantity++;
        exitingItem.totalPrice = exitingItem.totalPrice + price;
      }
    },

    removeItemFromCard(state, action) {
      const id = action.payload;
      const exitingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (exitingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        exitingItem.totalPrice -= exitingItem.price;
        exitingItem.quantity--;
      }
    },
  },
});

export const cardActions = card.actions;

const store = configureStore({
  reducer: { card: card.reducer },
});

export default store;
