import React from "react";
import IconClose from "./icon/Close";

export default function MessageRequired({ message }) {
  return (
    <div className="flex items-center mt-2">
      <IconClose fill="#ff1f26" className="mr-2" />
      <p className="text-red">{message}</p>
    </div>
  );
}

MessageRequired.defaultProps = {
  message: "This field is required",
};
