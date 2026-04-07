import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  // ✅ load from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔐 AUTO CLEAR when user logs out ⭐⭐⭐
  useEffect(() => {
    if (!user) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  }, [user]);

  // 🔹 add to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // 🔹 remove item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 🔹 change quantity
  const updateQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  // 🔹 manual clear (still useful)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}