import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconClose from "../../icon/Close";
import IconDrag from "../../icon/Drag";
import IconDelete from "../../icon/Delete";
import IconPlus from "../../icon/Plus";
import ButtonPrimary from "../../button/Primary";
import IconWarning from "../../icon/Warning";
import IconArrow from "../../icon/Arrow";
import IconImage from "../../icon/Image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function AddModifier() {
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
  const [name, setName] = useState("");
  const [modifierOption, setModifierOption] = useState([
    {
      name: "",
      index: 1,
      price: "",
    },
  ]);

  const handleDelete = (index) => {
    let _temp = [...modifierOption];
    let _tempNew = _temp.filter((items, i) => i !== index);
    setModifierOption(_tempNew);
  };

  const handleAdd = () => {
    let _temp = [...modifierOption];
    _temp.push({
      name: "",
      index: _temp.length + 1,
      price: "",
    });
    setModifierOption(_temp);
  };

  const handleChangeName = (e, index) => {
    let _temp = [...modifierOption];
    _temp[index].name = e.target.value;
    setModifierOption(_temp);
  };
  const handleChangeNumber = (e, index) => {
    let _temp = [...modifierOption];
    _temp[index].price = e.target.value;
    setModifierOption(_temp);
  };

  const submit = async (e) => {
    e.preventDefault();
    let error = false;

    modifierOption.forEach((option) => {
      if (option.name === "" || option.price === "") {
        setError("option", {
          type: "manual",
          message: "name and price cannot be empty",
        });
        error = true;
      }
    });

    if (modifierOption.length < 2) {
      setError("option", {
        type: "manual",
        message: "number of options must be more than 1",
      });
      error = true;
    }

    let sendData = {
      name: name,
      type: "DEFAULT",
      modifierOption: modifierOption,
    };
    if (!error) {
      try {
        let { data } = await axios.post(
          `${process.env.END_POINT_API}sales/api/v1/modifier`,
          sendData,
          {
            headers: {
              authorization: `Bearer ${process.env.TOKEN}`,
              locationId: process.env.LOCATION_ID,
            },
          }
        );
        // _clearField();
        router.push({
          pathname: `/modifiers`,
          query: { success: true },
        });
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.code}`, "error");
      }
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="px-0 pt-3 w-full">
        {/* start head */}
        <div className="flex flex-wrap justify-between border-b pb-3 px-4">
          <div className="flex items-center">
            <Link href="/variant">
              <a>
                <IconClose className="cursor-pointer mr-4" />
              </a>
            </Link>
            Add new modifier set
          </div>
          <ButtonPrimary type="submit">Save modifier set</ButtonPrimary>
        </div>
        {/* end head */}
        {/* start content */}
        <div>
          <div style={{ maxWidth: "768px" }} className="border mx-auto mt-10">
            <h4 className="font-bold text-lg">Modifier</h4>
            {/* variant form */}
            <div className="mt-4">
              <div>
                <p className="font-semibold">Modifier set name</p>
                <input
                  {...register("name")}
                  value={name}
                  type="text"
                  className="w-full bg-gray rounded-lg focus:outline-none p-3 mt-3 text-sm"
                  placeholder="Type here .."
                  onChange={(e) => setName(e.target.value)}
                />
                {errors?.name ? errors.name.message : ""}
              </div>
            </div>
            {/*  */}
            <h4 className="font-bold text-lg mr-3 mt-16">Options</h4>
            <ul className="mt-4">
              <li>
                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <div className="p-3 bg-gray text-sm font-semibold border">
                      Option name
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="p-3 bg-gray text-sm font-semibold border">
                      Additional charge
                    </div>
                  </div>
                </div>
              </li>
              {modifierOption.map((items, index) => {
                return (
                  <li key={index}>
                    <div className="grid grid-cols-2">
                      <div className="col-span-1">
                        <div className="p-3 bg-gray text-sm font-semibold border">
                          <input
                            onChange={(e) => handleChangeName(e, index)}
                            type="text"
                            className="w-full bg-gray rounded-lg focus:outline-none text-sm"
                            placeholder="Modifier name"
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="p-3 bg-gray text-sm font-semibold border relative">
                          <input
                            onChange={(e) => handleChangeNumber(e, index)}
                            type="number"
                            className="w-full bg-gray rounded-lg focus:outline-none text-sm"
                            placeholder="Rp. 0"
                          />
                          <IconDelete
                            className="absolute transform top-1/2 -translate-y-1/2 -right-8 cursor-pointer"
                            onClick={() => handleDelete(index)}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              {errors?.option ? errors.option.message : ""}
            </ul>
            <button
              className="flex items-center text-green font-bold text-sm mt-10"
              type="button"
              onClick={handleAdd}
            >
              <IconPlus fill="#0d9b54" className="mr-3" />
              Add new option
            </button>
          </div>
        </div>
        {/* end content */}
      </div>
    </form>
  );
}
