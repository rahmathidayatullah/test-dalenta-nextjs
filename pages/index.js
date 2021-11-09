import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// import IconArrow from "../components/icon/Arrow";
// import IconDalenta from "../components/icon/Dalenta";
// import IconFilter from "../components/icon/Filter";
// import IconSearch from "../components/icon/Search";
// import IconToggle from "../components/icon/Toggle";
// import IconPlus from "../components/icon/Plus";
// import IconImage from "../components/icon/Image";
// import IconWarning from "../components/icon/Warning";
// import IconDelete from "../components/icon/Delete";
// import IconEdit from "../components/icon/Edit";
// import IconDuplicate from "../components/icon/Duplicate";
// import IconTransaction from "../components/icon/Transaction";
// import IconClose from "../components/icon/Close";
// import Card from "../components/Card";
// import ButtonPrimary from "../components/button/Primary";
// import ButtonSecondaryIcon from "../components/button/SecondaryIcon";
// import FieldSearch from "../components/Search";
// import FieldFilter from "../components/Filter";
// import Table from "../components/Table";
// import LayoutItemsList from "../components/LayoutItemsList";
// import MessageRequired from "../components/messageRequired";

// import { wrapper } from "../redux/store";
// import { getAllProducts } from "../redux/actions/productActions";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/product");
  }, []);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Dalenta</div>
      {/* <div className="p-10 border m-10">
        <Table />
      </div>
      <LayoutItemsList />

      <div className="p-10 border">
        <div>
          <input
            type="text"
            className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3 text-sm border-red border"
            placeholder="Type here .."
          />
          <MessageRequired />
        </div>
      </div>

      <Card />
      <IconArrow />
      <IconDalenta />
      <IconImage />
      <IconFilter />
      <IconSearch />
      <IconDelete />
      <IconToggle />
      <IconDuplicate />
      <IconWarning />
      <IconPlus />
      <IconEdit />
      <IconTransaction />
      <IconClose />
      <ButtonPrimary>Add new product</ButtonPrimary>
      <ButtonSecondaryIcon>More actions</ButtonSecondaryIcon>
      <FieldSearch />
      <FieldFilter /> */}
    </div>
  );
}
