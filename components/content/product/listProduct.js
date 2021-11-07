import React, { useState, useEffect } from "react";
import FieldSearch from "../../../components/Search";
import IconToggle from "../../../components/icon/Toggle";
import FieldFilter from "../../../components/Filter";
import ButtonPrimary from "../../../components/button/Primary";
import IconArrow from "../../../components/icon/Arrow";
import ButtonSecondaryIcon from "../../../components/button/SecondaryIcon";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Pagination from "react-js-pagination";
import {
  getAllProducts,
  setPage,
  limitPage,
  searchByKeyword,
} from "../../../redux/actions/productActions";
export default function ListProduct() {
  const dispatch = useDispatch();

  const allProduct = useSelector((state) => state.allProduct);

  const handleChangeLimit = (e) => {
    dispatch(limitPage(e.target.value));
  };
  const changePages = (page, totalPage) => {
    if (totalPage < page) {
      dispatch(setPage(totalPage));
    } else {
      dispatch(setPage(page));
    }
  };

  useEffect(() => {
    dispatch(getAllProducts(process.env.TOKEN));
  }, [allProduct.page, allProduct.limit, allProduct.keyword, dispatch]);
  return (
    <div
      className="px-5 pt-4 w-full relative z-20 overflow-scroll"
      style={{ height: "93vh" }}
    >
      <h4 className="font-bold text-base mt-3">Product</h4>
      {/* head */}
      <div className="flex flex-wrap items-center justify-between mt-3">
        <div className="flex items-center mt-2">
          <FieldSearch
            className="mr-2"
            placeholder="Find products"
            onChange={(e) => dispatch(searchByKeyword(e.target.value))}
          />
          <FieldFilter />
        </div>
        <div className="flex items-center mt-2">
          <Link href="/product/addProduct">
            <a>
              <ButtonPrimary className="mr-2">Add new product</ButtonPrimary>
            </a>
          </Link>
          <ButtonSecondaryIcon>More actions</ButtonSecondaryIcon>
        </div>
      </div>
      {/* table */}
      <div className="mt-4">
        <table className="border">
          <thead>
            <tr className="border">
              <th>Product name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Selling price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allProduct.statusLoad === "process"
              ? "Loading"
              : allProduct.allProduct.map((items, index) => {
                  return (
                    <tr key={index} className="border">
                      <td>{items.name}</td>
                      <td>body 1</td>
                      <td>body 2</td>
                      <td>body 3</td>
                      <td>body 3</td>
                      <td>
                        <div className="flex justify-end">
                          <IconToggle className="cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {/*start pagination */}
      <div>
        <Pagination
          activePage={allProduct.page}
          itemsCountPerPage={allProduct?.pages}
          totalItemsCount={allProduct?.total}
          pageRangeDisplayed={allProduct?.pages - 1}
          onChange={(page) => changePages(page, allProduct.pages)}
          nextPageText={<IconArrow className="rotate-90" />}
          prevPageText={<IconArrow className="-rotate-90" />}
          firstPageText={""}
          lastPageText={""}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>

      <div className="flex justify-center mb-10 mt-4 text-gray text-sm font-semibold">
        Showing
        <select
          className="mx-4 text-primary font-bold focus:outline-none cursor-pointer"
          onChange={(e) => handleChangeLimit(e)}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        product per page
      </div>
    </div>
  );
}
