import React, { useEffect, useState } from "react";
import FieldSearch from "../../../components/Search";
import ButtonPrimary from "../../../components/button/Primary";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import IconArrow from "../../../components/icon/Arrow";
import {
  getAllVariants,
  setPage,
  limitPage,
  searchByKeyword,
} from "../../../redux/actions/variantActions";
import Pagination from "react-js-pagination";
import Card from "../../Card";
export default function ListVariant() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { success } = router.query;
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const allVariant = useSelector((state) => state.allVariant);
  const handleChangeLimit = (e) => {
    dispatch(limitPage(e.target.value));
  };
  const editVariant = (id) => {
    router.push(`/variant/editVariant/${id}`);
  };
  const clearKeyWord = () => {
    setIsSearch(isSearch ? false : true);
    dispatch(searchByKeyword(""));
    setKeyword("");
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.replace("/variant", undefined, { shallow: true });
      }, 3000);
    }
    dispatch(getAllVariants(process.env.TOKEN));
  }, [
    success,
    dispatch,
    allVariant.page,
    allVariant.limit,
    allVariant.keyword,
  ]);

  return (
    <div
      className="px-5 pt-4 w-full relative z-20 overflow-scroll"
      style={{ height: "93vh" }}
    >
      {/* card notifikasi */}
      <Card
        show={success}
        title={"Category set successfully"}
        text={`Category has been successfully ${
          success === "delete"
            ? "delete"
            : success === "update"
            ? "updated"
            : "added"
        } into the variant option list`}
      />
      <h4 className="font-bold text-base mt-3">Variant</h4>
      {/* head */}
      <div className="flex flex-wrap items-center justify-between mt-3">
        <div className="mt-2 w-80">
          <FieldSearch
            className="mr-2"
            placeholder="Find variant or options"
            onChange={(e) => dispatch(searchByKeyword(e.target.value))}
            value={keyword}
            onClick={() => clearKeyWord()}
            show={isSearch}
          />
        </div>
        <div className="mt-2">
          <Link href="/variant/addVariant">
            <a>
              <ButtonPrimary className="mr-2">Add new variant</ButtonPrimary>
            </a>
          </Link>
        </div>
      </div>
      {/* table */}
      <div className="mt-4">
        <table className="border-table">
          <thead>
            <tr className="border-table">
              <th>Variant set name</th>
              <th>Options</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {allVariant.allVariant.length === 0 ? (
              <td colSpan="3" className="text-center p-4">
                Data tidak ditemukan
              </td>
            ) : allVariant.statusLoad === "process" ? (
              <td colSpan="3" className="text-center p-4">
                Loading ...
              </td>
            ) : (
              allVariant.allVariant.map((items, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => editVariant(items.id)}
                    className="border-table"
                  >
                    <td>{items.name}</td>
                    <td>
                      {items.variantOption.map((item, i) => {
                        return <span key={i}>{item.name},</span>;
                      })}
                    </td>
                    <td>{items.products.length} product</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/*start pagination */}
      <div>
        <Pagination
          activePage={allVariant.page}
          itemsCountPerPage={allVariant?.limit}
          totalItemsCount={allVariant?.total}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => dispatch(setPage(pageNumber))}
          nextPageText={<IconArrow className="rotate-90" />}
          prevPageText={<IconArrow className="-rotate-90" />}
          // firstPageText={""}
          // lastPageText={""}
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
        variant per page
      </div>
    </div>
  );
}
