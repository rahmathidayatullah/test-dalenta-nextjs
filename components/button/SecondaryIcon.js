import IconArrow from "../../components/icon/Arrow";
export default function SecondaryIcon({ children }) {
  return (
    <button className="px-4 py-2 border rounded-lg bg-secondary text-primary border-transparent text-sm font-semibold flex items-center">
      {children}
      <IconArrow fill="#1f4bff" className="rotate-180 ml-2" />
    </button>
  );
}

SecondaryIcon.defaultProps = {
  children: "Button",
};
