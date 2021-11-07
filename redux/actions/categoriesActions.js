import axios from "axios";
import debounce from "debounce-promise";
import {
  GET_ALL_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_FAIL,
  GET_ONE_CATEGORY_SUCCESS,
  GET_ONE_CATEGORY_REQUEST,
  GET_ONE_CATEGORY_FAIL,
  SET_PAGE,
  LIMIT_PAGE,
  SEARCH_KEYWORD,
} from "../constans/categoriesConstansts";

export const getAllCategory = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_ALL_CATEGORY_REQUEST });
    let keywordState = getState().allCategory.keyword;
    let limitState = getState().allCategory.limit;
    let pageState = getState().allCategory.page;

    const params = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
    };
    try {
      async function debounceFetch(params, token) {
        return await axios.get(
          `${process.env.END_POINT_API}sales/api/v1/category`,
          {
            params,
            headers: {
              authorization: `Bearer ${token}`,
              locationId: process.env.LOCATION_ID,
            },
          }
        );
      }
      let debouncedFetchCategory = debounce(debounceFetch, 1000);
      const response = await debouncedFetchCategory(params, token);
      dispatch({
        type: GET_ALL_CATEGORY_SUCCESS,
        payload: response.data.data,
        pages: response.data.pages,
        total: response.data.total,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
export const getOneCategory = (token, id) => {
  return async (dispatch) => {
    dispatch({ type: GET_ONE_CATEGORY_REQUEST });

    try {
      const response = await axios.get(
        `${process.env.END_POINT_API}sales/api/v1/category/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      dispatch({
        type: GET_ONE_CATEGORY_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ONE_CATEGORY_FAIL,
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
