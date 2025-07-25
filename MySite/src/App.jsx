import React from "react";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Collection from "./Pages/Collection";
import Order from "./Pages/Order";
import PlaceOrder from "./Pages/PlaceOrder";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Products from "./Pages/Products";
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection " element={<Collection />} />
          <Route path="/contact " element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Products />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
