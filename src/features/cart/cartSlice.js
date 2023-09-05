import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],

  //just for development purpose (while we are making our state), lets have fake 1 pica object
  //   cart: [
  //     {
  //       pizzaId: 7,
  //       name: 'Napoli',
  //       quantity: 3,
  //       unitPrice: 16,
  //       totalPrice: 48,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //here payload that we need will be 'pizzaId'
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId
      //1. we need to find that item to which we need to increase quantity
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      //2. we increase quantity of that item
      item.quantity++;
      //3. we need to compute at the same time total price, because the quantity and total price are sinchronize and we shouldn`t separate them
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      //managing counter not to go below 0 item
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.unitPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  //if that pizza exist we add quantity, if not we return '0'
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
