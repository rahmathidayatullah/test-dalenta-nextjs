import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconClose from "../../icon/Close";
import ButtonPrimary from "../../button/Primary";
import IconWarning from "../../icon/Warning";
import IconArrow from "../../icon/Arrow";
import IconImage from "../../icon/Image";
import Link from "next/link";
export default function AddProduct() {
  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.allCategory);
  const allSubscript = useSelector((state) => state.allSubscript);
  const allAccount = useSelector((state) => state.allAccount);
  const allTax = useSelector((state) => state.allTax);
  const allModifier = useSelector((state) => state.allModifier);
  return (
    <div className="px-0 pt-3 w-full">
      {/* start head */}
      <div className="flex flex-wrap justify-between border-b pb-3 px-4">
        <div className="flex items-center">
          <Link href="/product">
            <a>
              <IconClose className="cursor-pointer mr-4" />
            </a>
          </Link>
          Add new product
        </div>
        <ButtonPrimary>Add new product</ButtonPrimary>
      </div>
      {/* end head */}
      {/* start content */}
      <div>
        <div style={{ maxWidth: "1080px" }} className="mx-auto mt-10">
          <h4 className="font-bold text-lg">Product information</h4>
          {/* product form */}
          <div className="mt-4">
            <div class="grid grid-cols-4 gap-2">
              <div className="col-span-1">
                <div>
                  <h7 className="font-medium">Product image</h7>
                  <div className="rounded-lg bg-gray w-full h-40 w-40 mt-2 flex items-center justify-center cursor-pointer">
                    <IconImage />
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div>
                  <div>
                    <p className="font-semibold">Product name *</p>
                    <input
                      type="text"
                      className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3"
                      placeholder="Give a name for your product"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold">Category *</p>
                    <input
                      type="text"
                      className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3"
                      placeholder="Give a name for your product"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold">Taxes and other charges</p>
                    <input
                      type="text"
                      className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3"
                      placeholder="Give a name for your product"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold">Product description</p>
                    <textarea
                      type="text"
                      rows="5"
                      className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3"
                      placeholder="Give a name for your product"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-16">
            <h4 className="font-bold text-lg mr-3">Variant options</h4>
            <IconWarning />
          </div>
          {/* Variant options form */}
          <div className="mt-4">
            {/* jika kosong */}
            <div className="p-6 border flex items-center rounded-lg">
              <button className="mr-3 text-green font-semibold">
                Add variant set
              </button>
              <IconArrow fill="#0d9b54" className="rotate-180" />
            </div>
          </div>
          <h4 className="font-bold text-lg mr-3 mt-16">
            Pricing and inventory
          </h4>
          {/* Pricing and inventory form */}
          <div className="mt-4">
            {/* jika kosong */}
            <div className="p-6 border flex items-center rounded-lg">
              <button className="mr-3">Add variant</button>
              <IconArrow className="rotate-180" />
            </div>
          </div>
          <div className="flex items-center mt-16">
            <h4 className="font-bold text-lg mr-3">Modifier</h4>
            <IconWarning />
          </div>
          {/* Pricing and inventory form */}
          <div className="mt-4">
            {/* jika kosong */}
            <div className="p-6 border flex items-center rounded-lg">
              <button className="mr-3">Add variant</button>
              <IconArrow className="rotate-180" />
            </div>
          </div>
        </div>
      </div>
      {/* end content */}
    </div>
  );
}
