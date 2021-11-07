import React from "react";
import { wrapper } from "../../redux/store";
import { getAllModifiers } from "../../redux/actions/modifierActions";
import ListModifiers from "../../components/content/modifier/listModifier";

export default function Index() {
  return <ListModifiers />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getAllModifiers(process.env.TOKEN));
  }
);
