import {
  GET_ALL_CATEGORY_SUCCESS,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_FAIL,
  GET_LIST_CATEGORY_SUCCESS,
  GET_LIST_CATEGORY_REQUEST,
  GET_LIST_CATEGORY_FAIL,
  GET_ONE_CATEGORY_SUCCESS,
  GET_ONE_CATEGORY_REQUEST,
  GET_ONE_CATEGORY_FAIL,
  SET_PAGE,
  LIMIT_PAGE,
  SEARCH_KEYWORD,
} from "../constans/categoriesConstansts";

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
  allCategory: [],
  listCategory: [],
  detailCategory: [],
};

export const allCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };
    case GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        allCategory: action.payload,
        pages: action.pages,
        total: action.total,
      };
    case GET_ALL_CATEGORY_FAIL:
      return {
        ...state,
        statusLoad: statuslist.error,
        error: action.payload,
      };

    case GET_ONE_CATEGORY_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };
    case GET_ONE_CATEGORY_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        detailCategory: action.payload,
      };
    case GET_ONE_CATEGORY_FAIL:
      return {
        ...state,
        statusLoad: statuslist.error,
        error: action.payload,
      };

    case GET_LIST_CATEGORY_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };

    case GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        listCategory: action.payload.data,
      };

    case GET_LIST_CATEGORY_FAIL:
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
