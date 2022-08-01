import { combineReducers } from "redux";

import authReducer from "./AurhReducer";
import PostReducer from "./PostReducer";

export const reducers = combineReducers({
  authReducer,
  PostReducer,
});
