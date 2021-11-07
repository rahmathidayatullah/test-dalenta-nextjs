import React, { useState } from "react";
import IconClose from "../../components/icon/Close";
import ButtonPrimary from "../../components/button/Primary";
export default function Index() {
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0" style={{ backgroundColor: "#0000009c" }}>
      <div
        className="rounded-lg absolute transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-80 transition-all duration-300"
        style={{ width: "35rem" }}
      >
        {/* head */}
        <div className="flex justify-center border-b py-3 relative">
          <h4 className="font-bold text-lg text-xl">Add new category</h4>
          <IconClose
            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setIsModal(false)}
          />
        </div>
        {/* content */}
        <div className="p-3 mt-3">
          <p className="font-semibold text-sm">Category name</p>
          <input
            value={name}
            type="text"
            className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3 text-sm"
            placeholder="Type here .."
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* footer */}
        <div className="w-full absolute bottom-0 flex justify-end p-3 border-t">
          <ButtonPrimary className="">Save category</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
