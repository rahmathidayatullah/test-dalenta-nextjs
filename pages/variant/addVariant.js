import { wrapper } from "../../redux/store";
import AddVariantComponent from "../../components/content/variant/addVariant";

export default function AddVariant() {
  return <AddVariantComponent />;
}

export const getServerSideProps = wrapper.getServerSideProps(() => () => {
  return {
    props: {
      data: true,
    },
  };
});
