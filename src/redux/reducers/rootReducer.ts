import { combineReducers, Reducer } from "redux";

import userReducer from "./userReducer";
import { IStore } from "../../interfaces/store";

const rootReducer: Reducer<IStore> = combineReducers({
  user: userReducer,
});
export default rootReducer;
