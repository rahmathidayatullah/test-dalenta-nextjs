import axios from "axios";
import {
  GET_TAX_SUCCESS,
  GET_TAX_REQUEST,
  GET_TAX_FAIL,
} from "../constans/taxConstans";

export const getAllTax = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_TAX_REQUEST });
    let keywordState = getState().allTax.keyword;
    let limitState = getState().allTax.limit;
    let pageState = getState().allTax.page;

    const params = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
    };
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API}sales/api/v1/tax`,
        {
          params,
          headers: {
            authorization: `Bearer ${token}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      dispatch({ type: GET_TAX_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_TAX_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
