import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

export const ProductContext = createContext();

const API_URL = `${BASE_URL}/api/products`;

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const dedupeProductsById = (items = []) => {
  const productMap = new Map();

  items.forEach((product) => {
    if (!productMap.has(product.id)) {
      productMap.set(product.id, product);
    }
  });

  return Array.from(productMap.values());
};

const normalizeProduct = (product = {}) => ({
  id: Number(product.id) || Date.now(),
  name: product.name || "",
  price: Number(product.price) || 0,
  costPrice:
    product.costPrice === "" || product.costPrice == null
      ? null
      : Number(product.costPrice),
  stock: product.stock === "" || product.stock == null ? 0 : Number(product.stock),
  designNotes: product.designNotes || "",
  image: product.image || "",
  rating: Number(product.rating) || 0,
  reviews: Array.isArray(product.reviews) ? product.reviews : [],
  artisan: product.artisan || "artisan",
  sizes: Array.isArray(product.sizes) ? product.sizes : [],
  productStory: product.productStory || "",
  description: product.description || "",
});

export function ProductProvider({ children }) {
  const [products, setProductsState] = useState([]);
  const [ready, setReady] = useState(false);
  const lastSyncedSignature = useRef("");

  const setProducts = (nextValue) => {
    setProductsState((current) => {
      const resolvedValue =
        typeof nextValue === "function" ? nextValue(current) : nextValue;

      return dedupeProductsById((resolvedValue || []).map(normalizeProduct));
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const response = await axios.get(API_URL, getAuthConfig());
        const data = response.data;
        const loadedProducts = Array.isArray(data.products)
          ? dedupeProductsById(data.products.map(normalizeProduct))
          : [];

        if (!isMounted) {
          return;
        }

        lastSyncedSignature.current = JSON.stringify(loadedProducts);
        setProductsState(loadedProducts);
      } catch {
        if (isMounted) {
          lastSyncedSignature.current = "";
          setProductsState([]);
        }
      } finally {
        if (isMounted) {
          setReady(true);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const normalizedProducts = dedupeProductsById(products.map(normalizeProduct));
    const signature = JSON.stringify(normalizedProducts);

    if (signature === lastSyncedSignature.current) {
      return;
    }

    const syncProducts = async () => {
      try {
        await axios.put(
          `${API_URL}/sync`,
          { products: normalizedProducts },
          {
            ...getAuthConfig(),
            headers: {
              ...getAuthConfig().headers,
              "Content-Type": "application/json",
            },
          }
        );

        lastSyncedSignature.current = signature;
      } catch (error) {
        console.error(error);
      }
    };

    syncProducts();
  }, [products, ready]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}