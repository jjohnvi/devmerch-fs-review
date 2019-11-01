import axios from "axios";

const initialState = {
  loading: false,
  products: []
};

const GET_PRODUCTS = "GET_PRODUCTS";

export const getAllProducts = () => {
  return {
    type: GET_PRODUCTS,
    payload: axios.get("/api/products")
  };
};

export default function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${GET_PRODUCTS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_PRODUCTS}_FULFILLED`:
      return { ...state, loading: false, products: payload.data };

    default:
      return state;
  }
}
