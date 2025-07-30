import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  console.log(products);
  return <></>;
};

export default LatestCollections;
