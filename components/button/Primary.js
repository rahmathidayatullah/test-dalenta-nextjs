export default function Primary({ children, className, type, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 border rounded-lg bg-primary text-white border-transparent text-sm font-semibold ${
        className ? className : ""
      } `}
    >
      {children}
    </button>
  );
}

Primary.defaultProps = {
  children: "Button",
  type: "button",
  bgColor: "",
};
