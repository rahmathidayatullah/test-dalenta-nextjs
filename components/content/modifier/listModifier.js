import React, { useState, useEffect } from "react";
import FieldSearch from "../../../components/Search";
import IconToggle from "../../../components/icon/Toggle";
import IconArrow from "../../../components/icon/Arrow";
import FieldFilter from "../../../components/Filter";
import ButtonPrimary from "../../../components/button/Primary";
import Link from "next/link";
import ButtonSecondaryIcon from "../../../components/button/SecondaryIcon";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  getAllModifiers,
  setPage,
  limitPage,
  searchByKeyword,
} from "../../../redux/actions/modifierActions";
import Pagination from "react-js-pagination";
export default function ListModifier() {
  const dispatch = useDispatch();
  const router = useRouter();
  const allModifier = useSelector((state) => state.allModifier);

  const { success } = router.query;
  const [message, setMessage] = useState(false);
  const changePages = (page, totalPage) => {
    if (totalPage < page) {
      dispatch(setPage(totalPage));
    } else {
      dispatch(setPage(page));
    }
  };
  const handleChangeLimit = (e) => {
    dispatch(limitPage(e.target.value));
  };
  useEffect(() => {
    if (success) {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
        router.replace("/modifiers", undefined, { shallow: true });
      }, 3000);
    }
    dispatch(getAllModifiers(process.env.TOKEN));
  }, [
    success,
    dispatch,
    allModifier.page,
    allModifier.limit,
    allModifier.keyword,
  ]);

  return (
    <div
      className="px-5 pt-4 w-full relative z-20 overflow-scroll"
      style={{ height: "93vh" }}
    >
      {message ? <p>berhasil</p> : ""}
      <h4 className="font-bold text-base mt-3">Modifiers</h4>
      {/* head */}
      <div className="flex flex-wrap items-center justify-between mt-3">
        <div className="mt-2">
          <FieldSearch
            className="mr-2"
            placeholder="Find modifier or options"
            onChange={(e) => dispatch(searchByKeyword(e.target.value))}
          />
        </div>
        <div className="mt-2">
          <Link href="/modifiers/addModifier">
            <a>
              <ButtonPrimary className="mr-2">Add new modifier</ButtonPrimary>
            </a>
          </Link>
        </div>
      </div>
      {/* table */}
      <div className="mt-4">
        <table className="border">
          <thead>
            <tr className="border">
              <th>Modifier set name</th>
              <th>Options</th>
              <th>Applied products</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allModifier.statusLoad === "process"
              ? "Loading"
              : allModifier.allModifier.map((items, index) => {
                  return (
                    <tr key={index} className="border">
                      {/* <td>{items.name}</td> */}
                      <td>body 1</td>
                      <td>body 2</td>
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
          activePage={allModifier.page}
          itemsCountPerPage={allModifier?.pages}
          totalItemsCount={allModifier?.total}
          pageRangeDisplayed={allModifier?.pages - 1}
          onChange={(page) => changePages(page, allModifier.pages)}
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
        modifier per page
      </div>
    </div>
  );
}
