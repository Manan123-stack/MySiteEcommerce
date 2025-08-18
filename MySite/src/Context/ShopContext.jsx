import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from 'axios'
import { useEffect } from "react";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products,setProducts]=useState([])
  const [token,setToken]=useState('')

  const naviagte = useNavigate();
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl+"/api/cart/add",{itemId,size},{headers:{token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const items in cartItems[item]) {
        {
          try {
            if (cartItems[item][items] > 0) {
              totalCount += cartItems[item][items];
            }
          } catch (error) {
            console("Error calculating cart count:", error);
          }
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);
      try {
         await axios.post(backendUrl + "/api/cart/update",{itemId,size,quantity},{headers:{token}})


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log("Error calculating cart amount:", error);
        }
      }
    }
    return totalAmount;
  
  };

   const getProductsData=async ()=>{
       try {
          
          const response =await axios.get(backendUrl+"/api/product/list")
          console.log(response.data.products)
          if(response.data.success){
            setProducts(response.data.products)
          }else{
            toast.error(response.data.message)
          }
          

       } catch (error) {
        toast.error(error.message)
        console.log(error)
       }
   }
   
   const getUserCart=async (passedToken)=>{
    try {
      const response=await axios.post(backendUrl+"/api/cart/get",{},{headers:{token:passedToken}})
      console.log(response.data)
      if(response.data.success){
        
        setCartItems(response.data.cartData)
        console.log(response.data.cartData)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
        console.log(error)
    }
   }


   useEffect(()=>{
   getProductsData()
   },[])

   useEffect(()=>{
   
     if(!token && localStorage.getItem('token')){
      getUserCart(localStorage.getItem("token"))
      setToken(localStorage.getItem('token'))
       console.log('hello')
     }
   },[])

  const value = {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    products,
    currency,
    delivery_fee,
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    naviagte,
    backendUrl, 
    token,
    setToken,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
