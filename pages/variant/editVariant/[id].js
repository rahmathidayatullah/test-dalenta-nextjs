import { wrapper } from "../../../redux/store";
import EditVariantComponent from "../../../components/content/variant/editVariant";
import { getOneVariant } from "../../../redux/actions/variantActions";

export default function EditModifier() {
  return <EditVariantComponent />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getOneVariant(process.env.TOKEN, params.id));
      return {
        props: {
          data: true,
        },
      };
    }
);
