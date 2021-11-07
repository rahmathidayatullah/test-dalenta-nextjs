import React from "react";
import IconCeklist from "../components/icon/Ceklist";
import ButtonPrimary from "../components/button/Primary";
export default function Card() {
  return (
    <div>
      <IconCeklist />
      <p>Variant set successfully added</p>
      <p>variant 99 has been successfully added into the variant option list</p>
      <ButtonPrimary>Dismis</ButtonPrimary>
    </div>
  );
}
