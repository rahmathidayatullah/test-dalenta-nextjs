import React, { useEffect, useState } from "react";
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
import MessageRequired from "../../messageRequired";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function EditVariant() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

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

  const [field, setField] = React.useState({
    name: "",
    variantOption: [
      {
        index: 1,
        name: "",
      },
      {
        index: 2,
        name: "",
      },
    ],
  });

  const getOneVariantAPI = async () => {
    try {
      const response = await axios.get(
        `${process.env.END_POINT_API}sales/api/v1/variant/${id}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN}`,
            locationId: process.env.LOCATION_ID,
          },
        }
      );

      response.data.data.variantOption.forEach((res) => {
        res.action = "UPDATE";
      });

      setField(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOneVariantAPI();
  }, []);

  const _clearField = () => {
    setField({
      name: "",
      variantOption: [
        {
          index: 1,
          name: "",
        },
        {
          index: 2,
          name: "",
        },
      ],
    });
    clearErrors("name");
  };

  const _handlePlus = () => {
    const _temp = [...field.variantOption];

    if (_temp.length) {
      _temp.push({
        index: _temp[_temp.length - 1].index + 1,
        name: "",
        action: "NEW",
      });
      setField({ ...field, variantOption: _temp });
    } else {
      setField({
        ...field,
        variantOption: [{ index: 1, name: "", action: "NEW" }],
      });
    }
  };

  const _handleChangeOption = (e, i) => {
    const _temp = [...field.variantOption];

    _temp[i].name = e.target.value;
    _temp[i].action = "NEW";

    setField({ ...field, variantOption: _temp });
    if (_temp.length >= 2) clearErrors("option");
  };

  const _handleMinus = (data, i) => {
    // BUATIN MODAL
    let _temp = [...field.variantOption];
    if (_temp[i].action === "NEW") {
      var removeIndex = _temp
        .map(function (item) {
          return item.index;
        })
        .indexOf(data.index);
      _temp.splice(removeIndex, 1);
      setField({ ...field, variantOption: _temp });
    } else {
      _temp[i].action = "DELETE";
      setField({ ...field, variantOption: _temp });
    }
  };

  const _onChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
    if (e.target.value.length) clearErrors("name");
  };

  const _onSubmit = async (e) => {
    let error = false,
      type = 0,
      response;
    field.variantOption.forEach((option) => {
      if (option.action === "DELETE") type += 1;
      if (option.name === "") {
        setError("option", {
          type: "manual",
          message: "name options harus diisi",
        });
        error = true;
      }
    });
    if (field.variantOption.length < 2) {
      console.log("masuk");
      setError("option", {
        type: "manual",
        message: "options variasi harus lebih dari satu!",
      });

      error = true;
    }
    if (!error) {
      if (type === field.variantOption.length) {
        response = await axios.delete(
          `${process.env.END_POINT_API}sales/api/v1/variant/${router.query.id}`,
          {
            headers: {
              authorization: `Bearer ${process.env.TOKEN}`,
              locationId: process.env.LOCATION_ID,
            },
          }
        );
        _clearField();
        router.push({
          pathname: `/variant`,
          query: { success: "update" },
        });
      } else {
        try {
          response = await axios.put(
            `${process.env.END_POINT_API}sales/api/v1/variant/${router.query.id}`,
            field,
            {
              headers: {
                authorization: `Bearer ${process.env.TOKEN}`,
                locationId: process.env.LOCATION_ID,
              },
            }
          );
          _clearField();
          router.push({
            pathname: `/variant`,
            query: { success: "update" },
          });
        } catch (error) {
          console.log("gagal add", error);
        }
      }
    }
  };

  return (
    <div className="px-0 pt-3 w-full">
      {/* start head */}
      <div className="flex flex-wrap justify-between border-b pb-3 px-4">
        <div className="flex items-center font-semibold text-base">
          <Link href="/variant">
            <a>
              <IconClose className="cursor-pointer mr-3" />
            </a>
          </Link>
          Edit new variant
        </div>
        <ButtonPrimary type="submit" onClick={(e) => _onSubmit(e)}>
          Save variant set
        </ButtonPrimary>
      </div>
      {/* end head */}
      {/* start content */}
      <div>
        <div style={{ maxWidth: "768px" }} className="mx-auto mt-10">
          <h4 className="font-bold text-lg">Variant</h4>
          {/* variant form */}
          <div className="mt-4">
            <div>
              <p className="font-semibold">Variant set name</p>
              <input
                {...register("name")}
                value={field.name}
                type="text"
                className={`w-full bg-gray rounded-lg focus:outline-none p-3 mt-3 text-sm ${
                  errors?.name ? "border-red border" : ""
                }`}
                placeholder="Type here .."
                onChange={_onChange}
              />
              {errors?.name ? (
                <MessageRequired message={errors.name.message} />
              ) : (
                ""
              )}
            </div>
          </div>
          {/*  */}
          <h4 className="font-bold text-lg mr-3 mt-16">Options</h4>
          <ul>
            {field.variantOption.map((items, index) => {
              return (
                <React.Fragment key={index}>
                  {items.action !== "DELETE" && (
                    <li>
                      <div className="flex items-center">
                        <IconDrag width="12" height="12" className="mr-5" />
                        <div className="w-full">
                          <input
                            value={items.name}
                            type="text"
                            className={`w-full bg-gray rounded-lg focus:outline-none p-3 mt-3 text-sm ${
                              errors?.option ? "border-red border" : ""
                            }`}
                            placeholder="E.g: Color"
                            onChange={(e) => _handleChangeOption(e, index)}
                          />
                        </div>
                        <IconDelete
                          width="19"
                          height="19"
                          className="cursor-pointer ml-5"
                          onClick={() => _handleMinus(items, index)}
                        />
                      </div>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
            {errors?.option ? (
              <MessageRequired message={errors.option.message} />
            ) : (
              ""
            )}
          </ul>
          <button
            className="flex items-center text-green font-bold text-sm mt-10"
            type="button"
            onClick={_handlePlus}
          >
            <IconPlus fill="#0d9b54" className="mr-3" />
            Add new option
          </button>
        </div>
      </div>
      {/* end content */}
    </div>
  );
}
