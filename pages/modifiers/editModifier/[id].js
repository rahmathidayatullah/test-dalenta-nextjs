import { wrapper } from "../../../redux/store";
import EditModifierComponent from "../../../components/content/modifier/editModifier";
import { getOneModifiers } from "../../../redux/actions/modifierActions";

export default function EditModifier() {
  return <EditModifierComponent />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getOneModifiers(process.env.TOKEN, params.id));
      return {
        props: {
          data: true,
        },
      };
    }
);
