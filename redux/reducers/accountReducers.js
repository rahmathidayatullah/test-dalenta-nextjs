import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_FAIL,
} from "../constans/accountConstans";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  statusLoad: statuslist.idle,
};

export const allAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };

    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        data: action.payload.data,
      };

    case GET_ACCOUNT_FAIL:
      return {
        ...state,
        statusLoad: statuslist.error,
        error: action.payload,
      };

    default:
      return state;
  }
};
