import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);

export default store;