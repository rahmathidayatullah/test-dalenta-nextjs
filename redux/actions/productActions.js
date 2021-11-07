import axios from "axios";
import debounce from "debounce-promise";
import {
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_FAIL,
  SET_PAGE,
  LIMIT_PAGE,
  SEARCH_KEYWORD,
} from "../constans/productConstans";

export const getAllProducts = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_ALL_PRODUCT_REQUEST });
    let keywordState = getState().allProduct.keyword;
    let limitState = getState().allProduct.limit;
    let pageState = getState().allProduct.page;
    let categoryIdState = getState().allProduct.categoryId;

    const params = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
      categoryId: categoryIdState,
    };
    try {
      async function debounceFetch(params, token) {
        return await axios.get(
          `${process.env.END_POINT_API}sales/api/v1/product`,
          {
            params,
            headers: {
              authorization: `Bearer ${token}`,
              locationId: process.env.LOCATION_ID,
            },
          }
        );
      }
      let debouncedFetchProduct = debounce(debounceFetch, 1000);
      const response = await debouncedFetchProduct(params, token);
      dispatch({
        type: GET_ALL_PRODUCT_SUCCESS,
        payload: response.data.data,
        pages: response.data.pages,
        total: response.data.total,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCT_FAIL,
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
