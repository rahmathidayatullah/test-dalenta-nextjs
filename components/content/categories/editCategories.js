import React from "react";
import ButtonPrimary from "../../../components/button/Primary";
import IconClose from "../../../components/icon/Close";
export default function editCategories({
  onClickClose,
  show,
  handleSubmitEdit,
  nameUpdate,
  onChangeNameUpdate,
}) {
  return (
    <div
      className={`rounded-lg absolute transform left-1/2  ${
        show ? "top-1/2" : "-top-full"
      } -translate-x-1/2 -translate-y-1/2 bg-white h-80 transition-all duration-500`}
      style={{ width: "35rem" }}
    >
      {/* head */}
      <div className="flex justify-center border-b py-3 relative">
        <h4 className="font-bold text-lg text-xl">
          Rename {nameUpdate && nameUpdate}
        </h4>
        <IconClose
          className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={onClickClose}
        />
      </div>
      {/* content */}
      <div className="p-3 mt-3">
        <p className="font-semibold text-sm">Category name</p>
        <input
          value={nameUpdate && nameUpdate}
          type="text"
          className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3 text-sm"
          placeholder="Type here .."
          onChange={onChangeNameUpdate}
        />
      </div>

      {/* footer */}
      <div className="w-full absolute bottom-0 flex justify-end p-3 border-t">
        <ButtonPrimary type="button" onClick={handleSubmitEdit}>
          Save category
        </ButtonPrimary>
      </div>
    </div>
  );
}
