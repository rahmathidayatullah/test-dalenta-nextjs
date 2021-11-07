import axios from "axios";
import debounce from "debounce-promise";
import {
  GET_ALL_MODIFIER_SUCCESS,
  GET_ALL_MODIFIER_REQUEST,
  GET_ALL_MODIFIER_FAIL,
  GET_ONE_MODIFIER_SUCCESS,
  GET_ONE_MODIFIER_REQUEST,
  GET_ONE_MODIFIER_FAIL,
  SET_PAGE,
  LIMIT_PAGE,
  SEARCH_KEYWORD,
} from "../constans/modifierConstans";

export const getAllModifiers = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_ALL_MODIFIER_REQUEST });
    let keywordState = getState().allModifier.keyword;
    let limitState = getState().allModifier.limit;
    let pageState = getState().allModifier.page;

    const params = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
    };
    try {
      async function debounceFetch(params, token) {
        return await axios.get(
          `${process.env.END_POINT_API}sales/api/v1/modifier`,
          {
            params,
            headers: {
              authorization: `Bearer ${token}`,
              locationId: process.env.LOCATION_ID,
            },
          }
        );
      }
      let debouncedFetchModifier = debounce(debounceFetch, 1000);
      const response = await debouncedFetchModifier(params, token);
      dispatch({
        type: GET_ALL_MODIFIER_SUCCESS,
        payload: response.data.data,
        pages: response.data.pages,
        total: response.data.total,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_MODIFIER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
export const getOneModifiers = (token, id) => {
  return async (dispatch) => {
    dispatch({ type: GET_ONE_MODIFIER_REQUEST });
    try {
      const response = await axios.get(
        `${process.env.END_POINT_API}sales/api/v1/modifier/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      dispatch({
        type: GET_ONE_MODIFIER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ONE_MODIFIER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};
export const limitPage = (limit) => {
  return {
    type: LIMIT_PAGE,
    limit,
  };
};

export const searchByKeyword = (value) => {
  return {
    type: SEARCH_KEYWORD,
    value,
  };
};
