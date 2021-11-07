import axios from "axios";
import {
  GET_LIST_INGREDIENT_SUCCESS,
  GET_LIST_INGREDIENT_REQUEST,
  GET_LIST_INGREDIENT_FAIL,
} from "../constans/ingredientConstants";

export const getAllIngredient = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_LIST_INGREDIENT_REQUEST });
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API}sales/api/v1/variant`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      dispatch({ type: GET_LIST_INGREDIENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LIST_INGREDIENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
