import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { assets2 } from "../assets/frontend_assets/assets2";
import { NavLink, Link } from "react-router";
const NavBar = () => {
  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        <img src={assets.logo} alt="logo " className="w-36" />

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to={"/"} className="flex flex-col items-center gap-1">
            <p>Home</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to={"/collection"}
            className="flex flex-col items-center gap-1"
          >
            <p>Collection</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to={"/about"} className="flex flex-col items-center gap-1">
            <p>About</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
            <p>Contact</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img
            src={assets2.search_icon}
            alt=""
            className="w-5 cursor-pointer"
          />
          <div className="group relative">
            <img
              src={assets2.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="hover:text-black cursor-pointer">MyProfile</p>
                <p className="hover:text-black cursor-pointer">Orders</p>
                <p className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
          <Link to={"/cart"} className="relative">
            <img
              src={assets2.cart_icon}
              className="w-5 min-w-5 cursor-pointer"
              alt=""
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
