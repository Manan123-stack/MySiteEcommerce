import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets2 } from "../assets/frontend_assets/assets2";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [subCatagory, setSubCatagory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  const toggleCatagory = (e) => {
    if (catagory.includes(e.target.value)) {
      setCatagory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCatagory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCatagory = (e) => {
    if (subCatagory.includes(e.target.value)) {
      setSubCatagory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCatagory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (catagory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        catagory.includes(item.category)
      );
    }

    if (subCatagory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCatagory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };
  const sortProduct = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };
  useEffect(() => {
    sortProduct();
  }, [sortType]);
  useEffect(() => {
    applyFilter();
  }, [catagory, subCatagory, search, showSearch,products]);
  console.log(filterProducts);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/*Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets2.dropdown_icon}
            alt=""
          />
        </p>
        {/* Catogory Filter */}
        <div
          className={`border border-gray-300 pl-5  py-3 mt-6 sm:block ${showFilter ? "" : "hidden "}`}
        >
          <p className="mb-3 text-sm font-medium">CATAGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flexgap-2 ">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCatagory}
              />
              Men
            </p>
            <p className="flexgap-2 ">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCatagory}
              />
              Women
            </p>
            <p className="flexgap-2 ">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCatagory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* SubCatagory Filter*/}
        <div
          className={`border border-gray-300 pl-5  py-3 mt-6 my-5 sm:block ${showFilter ? "" : "hidden "}`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flexgap-2 ">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCatagory}
              />
              Topwear
            </p>
            <p className="flexgap-2 ">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCatagory}
              />
              Bottomwear
            </p>
            <p className="flexgap-2 ">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCatagory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/*Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/*PRODUCT SORT */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2"
          >
            <option value="relevent">Sort by:Relevent</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>
        {/*Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
