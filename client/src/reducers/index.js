import { combineReducers } from "redux";

import authReducer from "./AurhReducer";
import PostReducer from "./PostReducer";
import chatReducer from "./ChatUserReducer";

export const reducers = combineReducers({
  authReducer,
  PostReducer,
  chatReducer,
});
