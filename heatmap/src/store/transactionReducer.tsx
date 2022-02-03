import { ITransaction } from "../interface/ITransaction";
import {
  TRANSACTION_REQUEST,
TRANSACTION_SUCCESS,
TRANSACTION_FAILURE
} from "./constant";

export interface IInitialState {
  data: ITransaction[];
  isLoading?: boolean;
  error?: string;
}

const initialState: IInitialState = {
  data: [],
  isLoading: false,
  error: ""
};

export const TransactionReducer = (
  state: IInitialState = initialState,
  action: any
): IInitialState => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case TRANSACTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};
