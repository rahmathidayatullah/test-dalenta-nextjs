import React, { useState, useEffect } from "react";
import FieldSearch from "../../../components/Search";
import IconToggle from "../../../components/icon/Toggle";
import FieldFilter from "../../../components/Filter";
import ButtonPrimary from "../../../components/button/Primary";
import IconArrow from "../../../components/icon/Arrow";
import IconEdit from "../../../components/icon/Edit";
import IconClose from "../../../components/icon/Close";
import IconDuplicate from "../../../components/icon/Duplicate";
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
import Modal from "../../Modal";
import axios from "axios";
import LayoutItemsList from "../../LayoutItemsList";
import IconDelete from "../../../components/icon/Delete";
import Card from "../../Card";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
export default function ListProduct() {
  const router = useRouter();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isMoreActionModal, setIsMoreActionModal] = useState(false);
  const [isToggleMoreAction, setIsToggleMoreAction] = useState(false);
  const { success, update } = router.query;
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState("");
  const handleToggle = (index) => {
    if (isToggle === index) {
      setIsToggle("");
    } else {
      setIsToggle(index);
    }
  };
  const allProduct = useSelector((state) => state.allProduct);
  console.log("allProduct", allProduct);
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const clearKeyWord = () => {
    setIsSearch(isSearch ? false : true);
    dispatch(searchByKeyword(""));
    setKeyword("");
  };
  const handleChangeLimit = (e) => {
    dispatch(limitPage(e.target.value));
  };
  const [idProduct, setIdProduct] = useState("");
  const handleDeleteShow = async (id) => {
    setIsDeleteModal(true);
    setIsToggle("");
    setIdProduct(id);
  };
  const handleDelete = async () => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API}sales/api/v1/product/${idProduct}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );
      setIsToggle("");
      setIsDeleteModal(false);
      dispatch(getAllProducts(process.env.TOKEN));
      router.push({
        pathname: `/product`,
        query: { success: "delete" },
      });
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.replace("/product", undefined, { shallow: true });
      }, 3000);
    }
    dispatch(getAllProducts(process.env.TOKEN));
  }, [
    allProduct.page,
    allProduct.limit,
    allProduct.keyword,
    dispatch,
    success,
  ]);
  return (
    <div
      className="px-5 pt-4 w-full relative z-20 overflow-scroll"
      style={{ height: "93vh" }}
    >
      {/* card notifikasi */}
      <Card
        show={success}
        title={"Product set successfully"}
        text={`Product has been successfully ${
          success === "delete"
            ? "delete"
            : success === "update"
            ? "updated"
            : "added"
        } into the product option list`}
      />

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
            <h4 className="font-bold text-lg text-xl">Delete product?</h4>
            <IconClose
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsDeleteModal(false)}
            />
          </div>
          {/* content */}
          <div className="p-3 mt-3">
            Are you sure to delete the product 1 set? Deleting this product will
            affect 2 items. This action cannont be undone
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
              Delete product
            </ButtonPrimary>
          </div>
        </div>
      </Modal>
      {/* modal filter data */}
      <Modal show={isFilterModal}>
        <div
          className={`rounded-lg absolute transform left-1/2  ${
            isFilterModal ? "top-1/2" : "-top-full"
          } -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-500`}
          style={{ width: "35rem", height: "30rem" }}
        >
          {/* head */}
          <div className="flex justify-center border-b py-3 relative">
            <h4 className="font-bold text-lg text-xl">Filter Product List</h4>
            <IconClose
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsFilterModal(false)}
            />
          </div>
          {/* content */}
          <div className="p-3 mt-3">
            <p className="font-semibold text-sm">Category</p>
            <select className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3 text-sm">
              <option>Belum selesai</option>
              <option>Belum selesai</option>
            </select>
            <p className="font-semibold text-sm mt-6">Inventories</p>
            <select className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3 text-sm">
              <option>Belum selesai</option>
              <option>Belum selesai</option>
            </select>
          </div>

          {/* footer */}
          <div className="w-full absolute bottom-0 flex justify-between p-3 border-t">
            <ButtonPrimary
              type="button"
              bgColor="bg-transparent"
              colorText="text-primary"
              onClick={() => setIsFilterModal(false)}
            >
              Discard changes
            </ButtonPrimary>
            <ButtonPrimary
              type="button"
              bgColor="bg-primary"
              onClick={() => setIsFilterModal(false)}
            >
              Filter
            </ButtonPrimary>
          </div>
        </div>
      </Modal>
      {/* modal filter data */}
      <Modal show={isMoreActionModal}>
        <div
          className={`rounded-lg absolute transform left-1/2  ${
            isMoreActionModal ? "top-1/2" : "-top-full"
          } -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-500`}
          style={{ width: "35rem", height: "30rem" }}
        >
          {/* head */}
          <div className="flex justify-center border-b py-3 relative">
            <h4 className="font-bold text-lg text-xl">Import products</h4>
            <IconClose
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsMoreActionModal(false)}
            />
          </div>
          {/* content */}
          <div className="p-3 mt-3">
            <p>
              <span className="text-primary">Download the .xlsx template</span>{" "}
              file the fill in then information and inventory of your products.
              The imported file will replace all the existing products within
              the library
            </p>
            <div className="flex items-center justify-center w-full h-36 text-3xl font-semibold">
              Belum selesai
            </div>
          </div>

          {/* footer */}
          <div className="w-full absolute bottom-0 flex justify-between p-3 border-t">
            <ButtonPrimary
              type="button"
              bgColor="bg-transparent"
              colorText="text-primary"
              onClick={() => setIsMoreActionModal(false)}
            >
              Download .xlsx template
            </ButtonPrimary>
            <ButtonPrimary
              type="button"
              bgColor="bg-primary"
              onClick={() => setIsFilterModal(false)}
            >
              Import product
            </ButtonPrimary>
          </div>
        </div>
      </Modal>
      <h4 className="font-bold text-base mt-3">Product</h4>
      {/* head */}
      <div className="flex flex-wrap items-center justify-between mt-3">
        <div className="flex items-center mt-2">
          <FieldSearch
            className="mr-2"
            placeholder="Find products"
            onChange={(e) => dispatch(searchByKeyword(e.target.value))}
            value={keyword}
            onClick={() => clearKeyWord()}
            show={isSearch}
          />
          <FieldFilter onClick={() => setIsFilterModal(true)} />
        </div>
        <div className="flex items-center mt-2">
          <div className="relative">
            <ButtonSecondaryIcon
              onClick={() =>
                setIsToggleMoreAction(isToggleMoreAction ? false : true)
              }
            >
              More actions
            </ButtonSecondaryIcon>
            {isToggleMoreAction ? (
              <LayoutItemsList position="top-12">
                <li onClick={() => setIsMoreActionModal(true)}>
                  <button className="p-3 flex items-center hover:bg-secondary duration-500 cursor-pointer w-full">
                    <IconDuplicate className="mr-1" />
                    <span className="whitespace-nowrap font-semibold text-sm">
                      Import product
                    </span>
                  </button>
                </li>
              </LayoutItemsList>
            ) : (
              ""
            )}
          </div>
          <Link href="/product/addProduct">
            <a>
              <ButtonPrimary className="ml-2">Add new product</ButtonPrimary>
            </a>
          </Link>
        </div>
      </div>
      {/* table */}
      <div className="mt-4">
        <table className="border-table">
          <thead>
            <tr className="border-table">
              <th>Product name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Selling price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allProduct.allProduct.length === 0 ? (
              <td colSpan="6" className="text-center p-4">
                Data tidak ditemukan
              </td>
            ) : allProduct.statusLoad === "process" ? (
              <td colSpan="6" className="text-center p-4">
                Loading ...
              </td>
            ) : (
              allProduct.allProduct.map((items, index) => {
                return (
                  <tr key={index} className="border-table">
                    <td>
                      <div className="flex items-center">
                        {/* <Image
                        src="https://dummyimage.com/400x400/1f4cff/ffffff.png"
                        alt={`image=4${index}`}
                        width={50}
                        height={50}
                      /> */}
                        <img
                          className="mr-2"
                          src="https://dummyimage.com/400x400/1f4cff/ffffff.png"
                          alt={`image=4${index}`}
                          width={50}
                          height={50}
                        />
                        {items.name}
                      </div>
                    </td>
                    <td>{items.inventories.length} Variant</td>
                    <td className="text-red">{items.category.name}</td>
                    <td>
                      {items.inventories.reduce(
                        (sum, { stock }) => sum + stock,
                        0
                      )}
                    </td>
                    <td>
                      {!items.inventories.length ? (
                        "Rp.0 - Rp.0"
                      ) : (
                        <div>
                          <NumberFormat
                            value={
                              items.inventories.reduce((a, b) =>
                                a.price < b.price ? a : b
                              ).price
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp."}
                          />{" "}
                          -{" "}
                          <NumberFormat
                            value={
                              items.inventories.reduce((a, b) =>
                                a.price > b.price ? a : b
                              ).price
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp."}
                          />
                        </div>
                      )}
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
                              <Link href="/product/addProduct">
                                <a className="p-3 flex items-center hover:bg-secondary duration-500 cursor-pointer w-full">
                                  <IconEdit className="mr-3" />
                                  <span className="whitespace-nowrap">
                                    Edit Product
                                  </span>
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/product/addProduct">
                                <a className="p-3 flex items-center hover:bg-secondary duration-500 cursor-pointer w-full">
                                  <IconDuplicate className="mr-3" />
                                  <span className="whitespace-nowrap">
                                    Duplicate product
                                  </span>
                                </a>
                              </Link>
                            </li>
                            <li>
                              <button
                                className="p-3 flex items-center hover:bg-secondary duration-500 cursor-pointer w-full"
                                onClick={() =>
                                  handleDeleteShow(items.id, index)
                                }
                              >
                                <IconDelete fill="#ff565c" className="mr-3" />
                                <span className="text-red whitespace-nowrap">
                                  Delete product
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
          activePage={allProduct.page}
          itemsCountPerPage={allProduct?.limit}
          totalItemsCount={allProduct?.total}
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
        product per page
      </div>
    </div>
  );
}
