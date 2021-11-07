import {
  GET_SUBSCRIBE_SUCCESS,
  GET_SUBSCRIBE_REQUEST,
  GET_SUBSCRIBE_FAIL,
} from "../constans/subscriptionConstans";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  statusLoad: statuslist.idle,
};

export const allSubscribeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBSCRIBE_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };

    case GET_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        data: action.payload.data,
      };

    case GET_SUBSCRIBE_FAIL:
      return {
        ...state,
        statusLoad: statuslist.error,
        error: action.payload,
      };

    default:
      return state;
  }
};
