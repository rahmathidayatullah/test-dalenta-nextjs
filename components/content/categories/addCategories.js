import React, { useState } from "react";
import ButtonPrimary from "../../../components/button/Primary";
import IconClose from "../../../components/icon/Close";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import MessageRequired from "../../messageRequired";
const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function addCategories({ onClickClose, show }) {
  const [name, setName] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const handleSubmits = async () => {
    if (name === "") {
      setError("name", {
        type: "manual",
        message: "name cannot be empty",
      });
    } else {
      const sendData = {
        name: name,
      };
      try {
        let { data } = await axios.post(
          `${process.env.END_POINT_API}sales/api/v1/category`,
          sendData,
          {
            headers: {
              authorization: `Bearer ${process.env.TOKEN}`,
              locationId: process.env.LOCATION_ID,
            },
          }
        );
        setName("");
        router.push({
          pathname: `/categories`,
          query: { success: "success" },
        });
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.code}`, "error");
      }
    }
  };

  return (
    <div
      className={`rounded-lg absolute transform left-1/2  ${
        show ? "top-1/2" : "-top-full"
      } -translate-x-1/2 -translate-y-1/2 bg-white h-80 transition-all duration-500`}
      style={{ width: "35rem" }}
    >
      {/* head */}
      <div className="flex justify-center border-b py-3 relative">
        <h4 className="font-bold text-lg text-xl">Add new category</h4>
        <IconClose
          className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={onClickClose}
        />
      </div>
      {/* content */}
      <div className="p-3 mt-3">
        <p className="font-semibold text-sm">Category name</p>
        <input
          {...register("name")}
          value={name}
          type="text"
          className={`w-full bg-gray rounded-lg focus:outline-none p-3 mt-3 text-sm ${
            errors?.name ? "border-red border" : ""
          }`}
          placeholder="Type here .."
          onChange={(e) => setName(e.target.value)}
        />
        {errors?.name ? <MessageRequired message={errors.name.message} /> : ""}
      </div>

      {/* footer */}
      <div className="w-full absolute bottom-0 flex justify-end p-3 border-t">
        <ButtonPrimary type="button" onClick={handleSubmits}>
          Save category
        </ButtonPrimary>
      </div>
    </div>
  );
}
