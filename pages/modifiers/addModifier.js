import { wrapper } from "../../redux/store";
import AddModifierComponent from "../../components/content/modifier/addModifier";

export default function AddModifier() {
  return <AddModifierComponent />;
}

export const getServerSideProps = wrapper.getServerSideProps(() => () => {
  return {
    props: {
      data: true,
    },
  };
});
