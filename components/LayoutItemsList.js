import React from "react";
import IconDelete from "./icon/Delete";
import IconEdit from "./icon/Edit";
import Link from "next/link";
export default function LayoutItemsList({ children }) {
  return (
    <ul className="bg-white absolute right-0 rounded-lg border shadow z-10">
      {children}
    </ul>
  );
}

LayoutItemsList.defaultProps = {
  children: (
    <li>
      <Link href="">
        <a className="p-3 flex items-center hover:bg-secondary duration-500 cursor-pointer">
          <IconEdit className="mr-3" />
          <span>Rename Category</span>
        </a>
      </Link>
    </li>
  ),
};
