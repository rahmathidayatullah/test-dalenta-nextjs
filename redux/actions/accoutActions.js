import axios from "axios";
import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_FAIL,
} from "../constans/accountConstans";

export const getAllAccount = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ACCOUNT_REQUEST });
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API}hub/api/v1/accounts`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      dispatch({ type: GET_ACCOUNT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ACCOUNT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
