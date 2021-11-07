import React from "react";
import { wrapper } from "../../redux/store";
import { getAllProducts } from "../../redux/actions/productActions";
import ListProduct from "../../components/content/product/listProduct";

export default function Index() {
  return <ListProduct />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getAllProducts(process.env.TOKEN));
  }
);
