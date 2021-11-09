import React from "react";
export default function Modal({ show, children }) {
  return (
    <div
      className={`z-50 transition-all duration-500 ${
        show ? "opacity-100 fixed" : "opacity-0"
      } inset-0`}
      style={{ backgroundColor: "#0000009c" }}
    >
      {children}
    </div>
  );
}

Modal.defaultProps = {
  show: false,
};
