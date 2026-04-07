import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";

function MarketingDashboard() {
  const { products } = useContext(ProductContext);
  const { cart } = useContext(CartContext);

  const totalProducts = products.length;
  const totalCartItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalRevenue = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1>📢 Marketing Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="Items in Cart" value={totalCartItems} />
        <StatCard title="Potential Revenue" value={`₹${totalRevenue}`} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        minWidth: "180px",
      }}
    >
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default MarketingDashboard;