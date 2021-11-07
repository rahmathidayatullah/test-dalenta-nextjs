export default function Primary({
  children,
  className,
  type,
  onClick,
  bgColor,
  colorText,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 border rounded-lg font-bold ${bgColor} ${colorText} border-transparent text-sm ${
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
  bgColor: "bg-primary",
  colorText: "text-white",
};
