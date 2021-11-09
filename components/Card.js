import React from "react";
import IconCeklist from "../components/icon/Ceklist";
import ButtonPrimary from "../components/button/Primary";
export default function Card({ className, show, title, text, onClick }) {
  return (
    <div
      className={`bg-green text-white rounded-lg p-4 flex items-start max-w-sm transition-all duration-500 fixed bottom-10 ${
        show ? "left-10" : "-left-full"
      }  ${className ? className : ""}`}
    >
      <IconCeklist className="mr-3" width="30" height="30" />
      <div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm mt-2">{text}</p>
        </div>
        <div className="flex justify-end mt-2">
          <ButtonPrimary onClick={onClick} bgColor="bg-green2">
            Dismiss
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  title: "Modal",
  text: "modal content",
};
