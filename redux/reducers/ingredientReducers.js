import {
  GET_LIST_INGREDIENT_SUCCESS,
  GET_LIST_INGREDIENT_REQUEST,
  GET_LIST_INGREDIENT_FAIL,
} from "../constans/ingredientConstants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  statusLoad: statuslist.idle,
  listIngredient: [],
};

export const allIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_INGREDIENT_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };

    case GET_LIST_INGREDIENT_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        allCategory: action.payload.data,
      };

    case GET_LIST_INGREDIENT_FAIL:
      return {
        ...state,
        statusLoad: statuslist.error,
        error: action.payload,
      };

    default:
      return state;
  }
};
