import { createContext, useState, useEffect } from "react";

import sareeImg from "../assets/saree.webp";
import kurtaImg from "../assets/kurta.webp";
import dupattaImg from "../assets/dupatta.webp";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  // ✅ load from localStorage first
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Handloom Saree",
            price: 2499,
            image: sareeImg,
          },
          {
            id: 2,
            name: "Cotton Kurta",
            price: 1499,
            image: kurtaImg,
          },
          {
            id: 3,
            name: "Silk Dupatta",
            price: 899,
            image: dupattaImg,
          },
        ];
  });

  // ✅ auto save
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}