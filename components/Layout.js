import React, { useState } from "react";
import IconDalenta from "../components/icon/Dalenta";
import IconTransaction from "../components/icon/Transaction";
import IconArrow from "../components/icon/Arrow";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Layout({ children }) {
  const router = useRouter();
  const [isSubmenu, setIsSubmenu] = useState(false);
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
          className="h-full border-r border-l"
          style={{ minWidth: "18rem" }}
        ></div>
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
          className="border-l border-r  h-screen"
        >
          <ul className="p-4">
            {/* start button sub menu */}
            <li
              className="p-3 cursor-pointer"
              onClick={(e) => setIsSubmenu(isSubmenu ? false : true)}
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
                          className={`pr-3 pl-3 py-2 flex items-center justify-between font-bold rounded-lg text-sm my-2 ${
                            items.selected ? "bg-secondary" : ""
                          }`}
                        >
                          <button
                            className={`font-semibold ${
                              items.selected ? "text-primary" : "text-gray2"
                            }`}
                            onClick={() => activeSideMenu(index, items.link)}
                          >
                            {items.name}
                          </button>
                          {/* <Link href={items.link}>{items.name}</Link> */}
                        </div>
                      </li>
                    </ul>
                  );
                })
              : // <ul>
                //   <li className="pr-3 py-3 pl-8">
                //     <div className="flex items-center justify-between font-semibold">
                //       <Link href="/product">Product List</Link>
                //     </div>
                //   </li>
                //   <li className="pr-3 py-3 pl-8">
                //     <div className="flex items-center justify-between font-semibold">
                //       <Link href="/variant">Variant Options</Link>
                //     </div>
                //   </li>
                //   <li className="pr-3 py-3 pl-8">
                //     <div className="flex items-center justify-between font-semibold">
                //       <Link href="/modifiers">Modifiers</Link>
                //     </div>
                //   </li>
                //   <li className="pr-3 py-3 pl-8">
                //     <div className="flex items-center justify-between font-semibold">
                //       <Link href="/categories">Categories</Link>
                //     </div>
                //   </li>
                // </ul>
                ""}

            {/*  end items sub menu show when needed */}
          </ul>
        </div>
        {children}
      </div>

      {/* end content */}
    </div>
  );
}
