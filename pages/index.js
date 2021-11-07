import Head from "next/head";
import IconArrow from "../components/icon/Arrow";
import IconDalenta from "../components/icon/Dalenta";
import IconFilter from "../components/icon/Filter";
import IconSearch from "../components/icon/Search";
import IconToggle from "../components/icon/Toggle";
import IconPlus from "../components/icon/Plus";
import IconImage from "../components/icon/Image";
import IconWarning from "../components/icon/Warning";
import IconDelete from "../components/icon/Delete";
import IconEdit from "../components/icon/Edit";
import IconDuplicate from "../components/icon/Duplicate";
import IconTransaction from "../components/icon/Transaction";
import IconClose from "../components/icon/Close";
import ButtonPrimary from "../components/button/Primary";
import ButtonSecondaryIcon from "../components/button/SecondaryIcon";
import FieldSearch from "../components/Search";
import FieldFilter from "../components/Filter";
import Table from "../components/Table";
import LayoutItemsList from "../components/LayoutItemsList";

// import { wrapper } from "../redux/store";
// import { getAllProducts } from "../redux/actions/productActions";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10 border m-10">
        <Table />
      </div>
      <LayoutItemsList />

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
      <FieldFilter />
    </div>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, query }) => {
//       await store.dispatch(getAllProducts(process.env.TOKEN));
//     }
// );
