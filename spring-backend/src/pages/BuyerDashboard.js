import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";

function BuyerDashboard() {
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🛍 Buyer Dashboard</h1>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <button onClick={() => addToCart(p)}>
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerDashboard;