import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { LanguageProvider } from "./context/LanguageContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ArtisanProvider } from "./context/ArtisanContext";
import { UserProvider } from "./context/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <LanguageProvider>
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <ArtisanProvider>
            <CartProvider>
              <ProductProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </ProductProvider>
            </CartProvider>
          </ArtisanProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </LanguageProvider>
);