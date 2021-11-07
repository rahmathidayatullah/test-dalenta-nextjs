import React from "react";
import { wrapper } from "../../redux/store";
import { getAllCategory } from "../../redux/actions/categoriesActions";
import ListCategories from "../../components/content/categories/listCategories";

export default function Index() {
  return <ListCategories />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getAllCategory(process.env.TOKEN));
  }
);
