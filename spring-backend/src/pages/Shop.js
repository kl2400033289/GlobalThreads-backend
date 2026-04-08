import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Shop.css";

function Shop() {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // 🔒 Protected Add to Cart
  const handleAddToCart = (product) => {
  if (!user) {
    toast.error("Please login to add items to cart");
    navigate("/login");
    return;
  }

  addToCart(product);
  toast.success("Added to cart");
};
  // 🔎 filter products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shop-page">
      <h1 className="shop-title">🛍 Shop Handloom Products</h1>

      {/* 🔎 SEARCH */}
      <div className="shop-controls">
        <input
          type="text"
          placeholder="Search products..."
          className="shop-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📦 PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <p className="empty-text">No products found</p>
      ) : (
        <div className="shop-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="shop-card">
              <div className="image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x300?text=Product")
                  }
                />
              </div>

              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>

              <button
                className="add-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;