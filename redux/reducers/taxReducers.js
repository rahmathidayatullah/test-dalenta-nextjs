import {
  GET_TAX_SUCCESS,
  GET_TAX_REQUEST,
  GET_TAX_FAIL,
} from "../constans/taxConstans";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};
const initialState = {
  statusLoad: statuslist.idle,
  page: 1,
  limit: 5,
  keyword: "",
  allTax: [],
};

export const allTaxReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAX_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };

    case GET_TAX_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        allTax: action.payload.data,
      };

    case GET_TAX_FAIL:
      return {
        ...state,
        statusLoad: statuslist.error,
        error: action.payload,
      };

    default:
      return state;
  }
};
