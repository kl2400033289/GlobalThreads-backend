import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import "./AdminDashboard.css";

function ArtisanDashboard() {
  const { products } = useContext(ProductContext);

  return (
    <div className="admin-main" style={{ padding: "40px" }}>
      <h1>🧵 Artisan Dashboard</h1>
      <p>Your listed products</p>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtisanDashboard;