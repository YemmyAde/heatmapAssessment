import {
  TRANSACTION_REQUEST,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILURE
} from "./constant";

import  axios from "axios";
import { IInitialState } from "./transactionReducer";
import { Dispatch } from "redux";

const transactionRequest = () => ({
  type: TRANSACTION_REQUEST,
});

const transactionSuccess = (data: IInitialState) => ({
  type: TRANSACTION_SUCCESS,
  payload: data,
});

const transactionFailure = (error: IInitialState) => ({
  type: TRANSACTION_FAILURE,
  payload: error,
});

const transactionAsync = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(transactionRequest());
    const response = await axios.get('http://localhost:5000/transactions');
    dispatch(transactionSuccess(response.data));
    console.log(response.data)
  } catch (error: any) {
    dispatch(transactionFailure(error.response));
  }
};

export default transactionAsync;
