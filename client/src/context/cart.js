// import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let existCartItem = localStorage.getItem('cart');
    if (existCartItem) {
      setCart(JSON.parse(existCartItem));
    }
  }, [])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
