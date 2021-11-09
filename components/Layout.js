import React, { useState } from "react";
import IconDalenta from "../components/icon/Dalenta";
import IconTransaction from "../components/icon/Transaction";
import IconArrow from "../components/icon/Arrow";
import IconSetting from "./icon/Setting";
import IconQuestionMark from "./icon/QuestionMark";
import Link from "next/link";
import LayoutItemsList from "./LayoutItemsList";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const [isSubmenu, setIsSubmenu] = useState(false);
  const [isShowSide, setisShowSide] = useState(false);
  const [isDefaultLocation, setIsDefaultLocation] = useState(false);
  // list sidebar
  const [listSide, setListSide] = useState([
    {
      name: "Product List",
      selected: false,
      link: "/product",
    },
    {
      name: "Variant Options",
      selected: false,
      link: "/variant",
    },
    {
      name: "Modifiers",
      selected: false,
      link: "/modifiers",
    },
    {
      name: "Categories",
      selected: false,
      link: "/categories",
    },
  ]);

  const activeSideMenu = (index, link) => {
    let _temp = [...listSide];

    _temp.forEach((items, i) => {
      if (i === index) {
        items.selected = true;
      } else {
        items.selected = false;
      }
    });
    setListSide(_temp);
    router.push(link);
  };
  return (
    <div className="h-screen overflow-hidden">
      {/* start header */}
      <div style={{ height: "4rem" }} className="border-b w-full flex">
        <div
          className="h-full flex items-center justify-center"
          style={{ minWidth: "4rem" }}
        >
          <IconDalenta />
        </div>
        <div
          className="h-full border-r border-l py-5 px-7 cursor-pointer"
          style={{ minWidth: "18rem" }}
        >
          <div
            className="flex items-cemter font-bold relative"
            onClick={() =>
              setIsDefaultLocation(isDefaultLocation ? false : true)
            }
          >
            default location
            {isDefaultLocation ? (
              <IconArrow fill="#707070" className="relative top-0.5 ml-4" />
            ) : (
              <IconArrow
                fill="#707070"
                className="rotate-180 relative top-0.5 ml-4"
              />
            )}
            {isDefaultLocation ? (
              <LayoutItemsList position="-left-1 right-0 top-12 z-30 bg-white">
                <li>
                  <button
                    className="p-3 flex items-center duration-500 cursor-pointer w-full"
                    // onClick={() => handleRename(items.id)}
                  >
                    {/* <IconEdit className="mr-3" /> */}
                    <span className="text-sm font-semibold">Locations</span>
                  </button>
                </li>
                <li>
                  <button
                    className="p-3 flex items-center bg-secondary duration-500 cursor-pointer w-full"
                    // onClick={() => handleRename(items.id)}
                  >
                    {/* <IconEdit className="mr-3" /> */}
                    <span className="text-sm font-semibold text-primary">
                      default location
                    </span>
                  </button>
                </li>
              </LayoutItemsList>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-between w-full p-5">
          {/* menu again */}
          <div className="flex items-center">
            <span className="font-bold text-primary border-b-4 border-blue pb-1 relative top-1 cursor-pointer">
              Sales
            </span>
            <span className="ml-8 font-bold hover:text-primary hover:border-b-4 hover:border-blue pb-1 relative top-1 cursor-pointer">
              Hardware
            </span>
          </div>
          {/* profile setting dll */}
          <div className="flex items-center">
            <IconSetting className="cursor-pointer" />
            <IconQuestionMark className="mx-5 cursor-pointer" />
            <div className="flex items-center justify-center w-8 h-8 bg-black text-white font-semibold rounded-full cursor-pointer">
              R
            </div>
          </div>
        </div>
      </div>
      {/* end header */}

      {/* start content */}
      <div className="flex">
        {/* sidebar 1 */}
        <div
          style={{ minWidth: "4rem" }}
          className="h-full flex justify-center"
        >
          <div
            className="p-2 mt-6 border rounded-md bg-secondary"
            style={{ height: "max-content" }}
          >
            <IconTransaction />
          </div>
        </div>

        {/* sidebar 2 */}
        <div
          style={{ minWidth: "18rem" }}
          className={`border-l border-r h-screen transition-all duration-500 ${
            isShowSide ? "hidden" : "block"
          }`}
        >
          <ul className="p-4">
            {/* start button sub menu */}
            <li
              className="p-3 cursor-pointer"
              onClick={() => setIsSubmenu(isSubmenu ? false : true)}
            >
              <div className="flex items-center justify-between font-bold">
                Products & Inventory
                {isSubmenu ? (
                  <IconArrow fill="#707070" className="relative top-0.5" />
                ) : (
                  <IconArrow
                    fill="#707070"
                    className="rotate-180 relative top-0.5"
                  />
                )}
              </div>
            </li>
            {/* end button sub menu */}
            {/*  start items sub menu show when needed */}
            {isSubmenu
              ? listSide.map((items, index) => {
                  return (
                    <ul key={index}>
                      <li className={`pl-5`}>
                        <div
                          className={`pr-3 pl-3 py-2 flex items-center justify-between font-bold rounded-lg text-sm my-2 hover:bg-secondary hover:text-primary duration-300 ${
                            items.selected ? "bg-secondary" : ""
                          }`}
                        >
                          <button
                            className={`font-semibold hover:text-primary duration-300 ${
                              items.selected ? "text-primary" : "text-gray2"
                            }`}
                            onClick={() => activeSideMenu(index, items.link)}
                          >
                            {items.name}
                          </button>
                        </div>
                      </li>
                    </ul>
                  );
                })
              : ""}

            {/*  end items sub menu show when needed */}
          </ul>
        </div>
        <div className="relative w-full">
          <div
            onClick={() => setisShowSide(isShowSide ? false : true)}
            className={`-left-8 ${
              isShowSide ? "bottom-56" : "bottom-36"
            } absolute p-2 z-10 mt-6 border rounded-md bg-secondary cursor-pointer`}
            style={{ height: "max-content" }}
          >
            <IconArrow
              className={`transform  ${
                isShowSide ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
          {children}
        </div>
      </div>

      {/* end content */}
    </div>
  );
}
