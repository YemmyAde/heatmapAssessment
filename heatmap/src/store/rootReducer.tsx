import { combineReducers } from "redux";
import { TransactionReducer } from "./transactionReducer";

export const rootReducer = combineReducers({
  transactionReducer: TransactionReducer
});
