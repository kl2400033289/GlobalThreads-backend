import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  // ✅ load saved orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ persist orders
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // 🔹 add new order
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}