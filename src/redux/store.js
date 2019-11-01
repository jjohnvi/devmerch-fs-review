import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promise from "redux-promise-middleware";
import authReducer from "./AuthReducer/AuthReducer";
import productReducer from "./ProductReducer/ProductReducer";

const root = combineReducers({
  authReducer,
  productReducer
});

export default createStore(root, applyMiddleware(promise));
