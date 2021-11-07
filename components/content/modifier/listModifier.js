import React, { useState, useEffect } from "react";
import FieldSearch from "../../../components/Search";
import IconToggle from "../../../components/icon/Toggle";
import IconEdit from "../../../components/icon/Edit";
import IconClose from "../../../components/icon/Close";
import IconDelete from "../../../components/icon/Delete";
import IconArrow from "../../../components/icon/Arrow";
import FieldFilter from "../../../components/Filter";
import ButtonPrimary from "../../../components/button/Primary";
import Swal from "sweetalert2";
import Link from "next/link";
import ButtonSecondaryIcon from "../../../components/button/SecondaryIcon";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import LayoutItemsList from "../../LayoutItemsList";
import {
  getAllModifiers,
  setPage,
  limitPage,
  searchByKeyword,
} from "../../../redux/actions/modifierActions";
import Pagination from "react-js-pagination";
import axios from "axios";
import Modal from "../../Modal";
export default function ListModifier() {
  const dispatch = useDispatch();
  const router = useRouter();
  const allModifier = useSelector((state) => state.allModifier);
  const [productForMove, setProductForMove] = useState([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isModalMove, setIsModalMove] = useState(false);
  const [isToggle, setIsToggle] = useState("");
  const { success } = router.query;
  const [message, setMessage] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [productMoveState, setProductMoveState] = useState([]);

  const handleToggle = (index) => {
    if (isToggle === index) {
      setIsToggle("");
    } else {
      setIsToggle(index);
    }
  };

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

  const [idModifier, setIdModifier] = useState("");
  const handleDeleteShow = async (id) => {
    setIsDeleteModal(true);
    setIsToggle("");
    setIdModifier(id);
  };
  const handleDelete = async () => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API}sales/api/v1/modifier/${idModifier}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      dispatch(getAllModifiers(process.env.TOKEN));
      router.push({
        pathname: `/modifiers`,
        query: { success: "delete" },
      });
      setIsDeleteModal(false);
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data.code}`, "error");
    }
  };

  const moveProduct = async (id) => {
    setIsModalMove(true);
    setIsToggle(false);
    setIdProduct(id);

    // get list to move
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API}sales/api/v1/modifier/${id}/products`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      setProductForMove(data.data);
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data.code}`, "error");
    }
  };

  const moveProductSubmit = async () => {
    let _temp = [...productForMove];
    let _newTemp = _temp
      .filter((items) => items.isChecked === true)
      .map((itemz) => itemz.id);
    const sendData = { products: _newTemp };
    try {
      const { data } = await axios.patch(
        `${process.env.END_POINT_API}sales/api/v1/modifier/${idProduct}`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      router.push({
        pathname: "/modifiers",
        query: { success: "move" },
      });
      setIsModalMove(false);
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data.code}`, "error");
    }
  };

  const handleChangeMoveItem = (e, nameProduct, idx) => {
    let _temp = [...productForMove];
    _temp[idx].isChecked = e.target.checked;
    setProductForMove(_temp);
  };

  const handleChangeMoveItemAll = (e) => {
    let _temp = [...productForMove];
    let newTemp = _temp.map((items) => {
      if (e.target.checked) {
        return { ...items, isChecked: true };
      } else {
        return { ...items, isChecked: false };
      }
    });
    setProductForMove(newTemp);
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
      {/* modal delete */}
      <Modal show={isDeleteModal}>
        <div
          className={`rounded-lg absolute transform left-1/2  ${
            isDeleteModal ? "top-1/2" : "-top-full"
          } -translate-x-1/2 -translate-y-1/2 bg-white h-60 transition-all duration-500`}
          style={{ width: "35rem" }}
        >
          {/* head */}
          <div className="flex justify-center border-b py-3 relative">
            <h4 className="font-bold text-lg text-xl">Delete modifier?</h4>
            <IconClose
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsDeleteModal(false)}
            />
          </div>
          {/* content */}
          <div className="p-3 mt-3">
            Are you sure to delete the modifier 1 set? Deleting this modifier
            will affect 2 items. This action cannont be undone
          </div>

          {/* footer */}
          <div className="w-full absolute bottom-0 flex justify-between p-3 border-t">
            <ButtonPrimary
              type="button"
              bgColor="bg-transparent"
              colorText="text-primary"
              onClick={() => setIsDeleteModal(false)}
            >
              Go back
            </ButtonPrimary>
            <ButtonPrimary
              type="button"
              bgColor="bg-red"
              onClick={handleDelete}
            >
              Delete modifier
            </ButtonPrimary>
          </div>
        </div>
      </Modal>

      {/* modal move */}
      <Modal show={isModalMove}>
        <div
          className={`rounded-lg absolute transform left-1/2  ${
            isModalMove ? "top-1/2" : "-top-full"
          } -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-500`}
          style={{ width: "35rem", height: "70vh" }}
        >
          {/* head */}
          <div className="flex justify-center border-b py-3 relative">
            <h4 className="font-bold text-lg text-xl">
              Assign modifier 1 to products
            </h4>
            <IconClose
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsModalMove(false)}
            />
          </div>
          {/* content */}
          <div
            className="p-3 mt-3 overflow-scroll"
            style={{ maxHeight: "81%" }}
          >
            <table className="border-table">
              <thead>
                <tr className="border-table">
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) => handleChangeMoveItemAll(e)}
                    />
                  </th>
                  <th>Product name</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {productForMove?.map((items, idx) => {
                  return (
                    <tr className="border-table">
                      <td>
                        <input
                          type="checkbox"
                          checked={items.isChecked ? true : false}
                          onChange={(e) =>
                            handleChangeMoveItem(e, items.name, idx)
                          }
                        />
                      </td>
                      <td>{items.name}</td>
                      <td>{items.category.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* footer */}
          <div className="w-full absolute bottom-0 flex justify-between p-3 border-t">
            <ButtonPrimary
              type="button"
              bgColor="bg-transparent"
              colorText="text-primary"
              onClick={() => setIsModalMove(false)}
            >
              Cancel
            </ButtonPrimary>
            <div className="flex items-center">
              <span className="font-bold text-gray2 text-sm mr-3">
                0 products selected
              </span>
              <ButtonPrimary
                type="button"
                bgColor="bg-primary"
                onClick={moveProductSubmit}
              >
                Move products
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </Modal>

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
        <table className="border-table">
          <thead>
            <tr className="border-table">
              <th>Modifier set name</th>
              <th>Options</th>
              <th>Applied products</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allModifier.statusLoad === "process" ? (
              <td colSpan="4" className="text-center p-4">
                Loading ...
              </td>
            ) : (
              allModifier.allModifier.map((items, index) => {
                return (
                  <tr key={index} className="border-table">
                    <td>{items.name}</td>
                    <td>
                      {items.modifierOption.map((item, i) => {
                        return <span key={i}>{item.name},</span>;
                      })}
                    </td>
                    <td
                      onClick={() => moveProduct(items.id, index)}
                      className="font-bold text-primary"
                    >
                      {items.products.length} product applied
                    </td>
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
                              <Link
                                href={`//modifiers/editModifier/${items.id}`}
                              >
                                <a className="p-3 flex items-center hover:bg-secondary duration-500 cursor-pointer">
                                  <IconEdit className="mr-3" />
                                  <span className="whitespace-nowrap">
                                    Edit modifier set
                                  </span>
                                </a>
                              </Link>
                            </li>
                            <li>
                              <button
                                className="p-3 flex items-center hover:bg-secondary duration-500 cursor-pointer"
                                onClick={() =>
                                  handleDeleteShow(items.id, index)
                                }
                              >
                                <IconDelete fill="#ff565c" className="mr-3" />
                                <span className="text-red">
                                  Delete modifier
                                </span>
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
              })
            )}
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
