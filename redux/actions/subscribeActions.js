import axios from "axios";
import {
  GET_SUBSCRIBE_SUCCESS,
  GET_SUBSCRIBE_REQUEST,
  GET_SUBSCRIBE_FAIL,
} from "../constans/subscriptionConstans";

export const getAllSubscribe = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_SUBSCRIBE_REQUEST });
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API}sales/api/v1/subscription/restaurant_essentials`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      dispatch({ type: GET_SUBSCRIBE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SUBSCRIBE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
