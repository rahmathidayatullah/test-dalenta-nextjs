import React from "react";
import IconSearch from "../components/icon/Search";
import IconClose from "../components/icon/Close";
export default function Search({
  className,
  placeholder,
  onChange,
  show,
  onClick,
  value,
}) {
  return show ? (
    <div
      className={`relative flex items-center border border-transparent bg-secondary rounded-lg px-4 py-2 ${
        className ? className : ""
      }`}
    >
      <IconSearch />
      <input
        type="text"
        onChange={onChange}
        // placeholder="Find products"
        placeholder={placeholder}
        className="ml-3 focus:outline-none placeholder-gray font-semibold focus:bg-transparent bg-transparent text-sm"
      />
      <IconClose
        className="cursor-pointer absolute z-10 right-4"
        onClick={onClick}
      />
    </div>
  ) : (
    <div
      className={`relative flex items-center border border-black rounded-lg px-4 py-2 ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      <IconSearch />
      <input
        value={value}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className="ml-3 focus:outline-none placeholder-gray font-semibold focus:bg-transparent bg-transparent text-sm"
      />
    </div>
  );
}
