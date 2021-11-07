import { getAllAccount } from "../../redux/actions/accoutActions";
import { getAllTax } from "../../redux/actions/taxActions";
import { getAllCategory } from "../../redux/actions/categoriesActions";
import { getAllSubscribe } from "../../redux/actions/subscribeActions";
import { getAllModifiers } from "../../redux/actions/modifierActions";
import AddProductComponent from "../../components/content/product/addProduct";
import { wrapper } from "../../redux/store";

export default function AddProduct() {
  return <AddProductComponent />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getAllModifiers(process.env.TOKEN));
    await store.dispatch(getAllSubscribe(process.env.TOKEN));
    await store.dispatch(getAllCategory(process.env.TOKEN));
    await store.dispatch(getAllTax(process.env.TOKEN));
    await store.dispatch(getAllAccount(process.env.TOKEN));
    return {
      props: {
        data: true,
      },
    };
  }
);
