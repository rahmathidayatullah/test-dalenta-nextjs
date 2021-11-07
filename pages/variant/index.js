import React from "react";
import { wrapper } from "../../redux/store";
import { getAllVariants } from "../../redux/actions/variantActions";
import ListVariant from "../../components/content/variant/listVariant";

export default function Index() {
  return <ListVariant />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getAllVariants(process.env.TOKEN));
  }
);
