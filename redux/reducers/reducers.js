import { combineReducers } from "redux";
import { allProductReducer } from "../reducers/productReducers";
import { allVariantReducer } from "../reducers/variantReducers";
import { allCategoryReducer } from "../reducers/categoriesReducers";
import { allModifierReducer } from "../reducers/modifierReducers";
import { allTaxReducer } from "../reducers/taxReducers";
import { allSubscribeReducer } from "../reducers/subscriptionReducers";
import { allAccountReducer } from "../reducers/accountReducers";
import { allIngredientReducer } from "../reducers/ingredientReducers";
const reducer = combineReducers({
  allProduct: allProductReducer,
  allVariant: allVariantReducer,
  allCategory: allCategoryReducer,
  allModifier: allModifierReducer,
  allTax: allTaxReducer,
  allSubscript: allSubscribeReducer,
  allAccount: allAccountReducer,
  allIngredient: allIngredientReducer,
});

export default reducer;
