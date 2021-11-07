import React, { useState, useEffect } from "react";
import FieldSearch from "../../../components/Search";
import IconToggle from "../../../components/icon/Toggle";
import IconArrow from "../../../components/icon/Arrow";
import FieldFilter from "../../../components/Filter";
import ButtonPrimary from "../../../components/button/Primary";
import ButtonSecondaryIcon from "../../../components/button/SecondaryIcon";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Swal from "sweetalert2";
import Modal from "../../Modal";
import AddCategories from "../categories/addCategories";
import EditCategories from "../categories/editCategories";
import { useRouter } from "next/router";
import LayoutItemsList from "../../LayoutItemsList";
import IconEdit from "../../../components/icon/Edit";
import IconDelete from "../../../components/icon/Delete";
import {
  getAllCategory,
  setPage,
  limitPage,
  searchByKeyword,
} from "../../../redux/actions/categoriesActions";
import Link from "next/link";
import Pagination from "react-js-pagination";
export default function ListCategory() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isToggle, setIsToggle] = useState("");

  const { success, update } = router.query;
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [idCategtory, setidCategtory] = useState("");
  const [name, setName] = useState("");
  const allCategory = useSelector((state) => state.allCategory);
  console.log("allCategory", allCategory);
  const changePages = (page, totalPage) => {
    if (totalPage < page) {
      dispatch(setPage(totalPage));
    } else {
      dispatch(setPage(page));
    }
  };

  const handleToggle = (index) => {
    if (isToggle === index) {
      setIsToggle("");
    } else {
      setIsToggle(index);
    }
  };

  const handleDelete = async (id) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API}sales/api/v1/category/${id}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      dispatch(getAllCategory(process.env.TOKEN));
      router.push({
        pathname: `/categories`,
        query: { delete: true },
      });
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data.code}`, "error");
    }
  };

  const handleChangeLimit = (e) => {
    dispatch(limitPage(e.target.value));
  };

  const handleRename = (id) => {
    setidCategtory(id);
    setIsModalEdit(true);
    setIsToggle("");
  };

  const showModalAdd = () => {
    setIsModalAdd(true);
    setIsToggle("");
  };

  const handleSubmitEdit = async () => {
    let sendData = {
      name: name,
    };
    try {
      let { data } = await axios.put(
        `${process.env.END_POINT_API}sales/api/v1/category/${idCategtory}`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      setIsModalEdit(false);
      router.push({
        pathname: `/categories`,
        query: { update: true },
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Gagal", `${error.response.data.code}`, "error");
    }
  };

  useEffect(() => {
    if (success) {
      setIsModalAdd(false);
      setTimeout(() => {
        router.replace("/categories", undefined, { shallow: true });
      }, 3000);
    }
    if (update) {
      setIsModalAdd(false);
      setTimeout(() => {
        router.replace("/categories", undefined, { shallow: true });
      }, 3000);
    }
    dispatch(getAllCategory(process.env.TOKEN));

    async function getOneCategory(id) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API}sales/api/v1/category/${id}`,
          {
            headers: {
              authorization: `Bearer ${process.env.TOKEN}`,
              locationId: process.env.LOCATION_ID,
            },
          }
        );
        setName(data.data.name);
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.code}`, "error");
      }
    }
    if (idCategtory) {
      getOneCategory(idCategtory);
    }
  }, [
    success,
    update,
    allCategory.page,
    allCategory.limit,
    allCategory.keyword,
    idCategtory,
    dispatch,
  ]);

  return (
    <div
      className="px-5 pt-4 w-full relative z-20 overflow-scroll"
      style={{ height: "93vh" }}
    >
      {success ? <p>Berhasil create</p> : ""}
      {update ? <p>Berhasil update</p> : ""}
      <Modal show={isModalAdd}>
        <AddCategories
          show={isModalAdd}
          onClickClose={() => setIsModalAdd(false)}
        />
      </Modal>
      <Modal show={isModalEdit}>
        <EditCategories
          show={isModalEdit}
          onClickClose={() => setIsModalEdit(false)}
          handleSubmitEdit={handleSubmitEdit}
          onChangeNameUpdate={(e) => setName(e.target.value)}
          nameUpdate={name}
        />
      </Modal>
      <h4 className="font-bold text-base mt-3">Categories</h4>
      {/* head */}
      <div className="flex flex-wrap items-center justify-between mt-3">
        <div className="mt-2">
          <FieldSearch
            className="mr-2"
            placeholder="Find categories"
            onChange={(e) => dispatch(searchByKeyword(e.target.value))}
          />
        </div>
        <div className="mt-2">
          <ButtonPrimary
            onClick={() => showModalAdd()}
            className="mr-2 cursor-pointer"
          >
            Add new category
          </ButtonPrimary>
        </div>
      </div>
      {/* table */}
      <div className="mt-4">
        <table className="border">
          <thead>
            <tr className="border">
              <th>Category name</th>
              <th>Assigned products</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allCategory.statusLoad === "process"
              ? "Loading"
              : allCategory.allCategory.map((items, index) => {
                  return (
                    <tr key={index} className="border">
                      <td>{items.name}</td>
                      <td>body 1</td>
                      <td>
                        <div className="relative">
                          <div
                            className="flex justify-end"
                            onClick={() => handleToggle(index)}
                          >
                            <div className="p-3 rounded-lg hover:bg-blue-200 duration-500 cursor-pointer">
                              <IconToggle />
                            </div>
                          </div>
                          {isToggle === index ? (
                            <LayoutItemsList>
                              <li>
                                <button
                                  className="p-3 flex items-center hover:bg-secondary duration-500 cursor-pointer"
                                  onClick={() => handleRename(items.id)}
                                >
                                  <IconEdit className="mr-3" />
                                  <span>Rename Category</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className="p-3 flex items-center hover:bg-secondary duration-500 cursor-pointer"
                                  onClick={() => handleDelete(items.id, index)}
                                >
                                  <IconEdit className="mr-3" />
                                  <span>Delete Category</span>
                                </button>
                              </li>
                            </LayoutItemsList>
                          ) : (
                            ""
                          )}
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
          activePage={allCategory.page}
          itemsCountPerPage={allCategory?.pages}
          totalItemsCount={allCategory?.total}
          pageRangeDisplayed={allCategory?.pages - 1}
          onChange={(page) => changePages(page, allCategory.pages)}
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
        category per page
      </div>
    </div>
  );
}
