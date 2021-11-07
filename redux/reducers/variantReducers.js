import {
  GET_ALL_VARIANT_SUCCESS,
  GET_ALL_VARIANT_REQUEST,
  GET_ALL_VARIANT_FAIL,
  SET_PAGE,
  LIMIT_PAGE,
  SEARCH_KEYWORD,
} from "../constans/variantConstants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  statusLoad: statuslist.idle,
  page: 1,
  pages: 1,
  limit: 10,
  total: 0,
  keyword: "",
  allVariant: [],
};

export const allVariantReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VARIANT_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };

    case GET_ALL_VARIANT_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        allVariant: action.payload,
        pages: action.pages,
        total: action.total,
      };

    case GET_ALL_VARIANT_FAIL:
      return {
        ...state,
        statusLoad: statuslist.error,
        error: action.payload,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case LIMIT_PAGE:
      return {
        ...state,
        page: 1,
        keyword: "",
        limit: action.limit,
      };
    case SEARCH_KEYWORD:
      return {
        ...state,
        page: 1,
        keyword: action.value,
        limit: 10,
      };

    default:
      return state;
  }
};
