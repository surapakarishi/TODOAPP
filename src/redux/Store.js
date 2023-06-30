import { legacy_createStore } from "redux";
import { rootReducer } from "./reducers/Rootreducer";

export const store = legacy_createStore(
    rootReducer
);
