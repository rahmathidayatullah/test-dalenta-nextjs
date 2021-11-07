import axios from "axios";
import debounce from "debounce-promise";
import {
  GET_ALL_VARIANT_SUCCESS,
  GET_ALL_VARIANT_REQUEST,
  GET_ALL_VARIANT_FAIL,
  SET_PAGE,
  LIMIT_PAGE,
  SEARCH_KEYWORD,
} from "../constans/variantConstants";

export const getAllVariants = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_ALL_VARIANT_REQUEST });
    let keywordState = getState().allVariant.keyword;
    let limitState = getState().allVariant.limit;
    let pageState = getState().allVariant.page;

    const params = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
    };
    try {
      async function debounceFetch(params, token) {
        return await axios.get(
          `${process.env.END_POINT_API}sales/api/v1/variant`,
          {
            params,
            headers: {
              authorization: `Bearer ${token}`,
              locationId: process.env.LOCATION_ID,
            },
          }
        );
      }
      let debouncedFetchVariant = debounce(debounceFetch, 1000);
      const response = await debouncedFetchVariant(params, token);
      dispatch({
        type: GET_ALL_VARIANT_SUCCESS,
        payload: response.data.data,
        pages: response.data.pages,
        total: response.data.total,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_VARIANT_FAIL,
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
