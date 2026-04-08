import "./AdminDashboard.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { ProductContext } from "../context/ProductContext";
import { OrderContext } from "../context/OrderContext";
import { ArtisanContext } from "../context/ArtisanContext";
import { UserContext } from "../context/UserContext";

function AdminDashboard() {
  // ===== CONTEXTS =====
  const { products, setProducts } = useContext(ProductContext);
  const { orders } = useContext(OrderContext);
  const {
    artisans,
    addArtisan,
    removeArtisan,
    toggleBlock,
    updateRating,
  } = useContext(ArtisanContext);
  const { users, removeUser, toggleBlockUser } =
    useContext(UserContext);

  // ===== STATE =====
  const [activeTab, setActiveTab] = useState("dashboard");

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  const [newArtisan, setNewArtisan] = useState({
    name: "",
    location: "",
  });

  // ===== PRODUCT HANDLERS =====
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      image: form.image || "/assets/placeholder.png",
    };

    setProducts([...products, newProduct]);
    setForm({ name: "", price: "", image: "" });
    setPreview("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // ===== RENDER =====
  return (
    <div className="admin-layout admin-light">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">🌍 Admin</h2>

        <ul className="sidebar-menu">
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </li>

          <li
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            📦 Products
          </li>

          <li
            className={activeTab === "artisans" ? "active" : ""}
            onClick={() => setActiveTab("artisans")}
          >
            🧵 Artisans
          </li>

          <li
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            🛒 Orders
          </li>

          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            👥 Users
          </li>

          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
          </li>
        </ul>

        <Link to="/" className="back-home">
          ⬅ Back to Site
        </Link>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="admin-main">
        {/* ===== DASHBOARD ===== */}
        {activeTab === "dashboard" && (
          <>
            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="admin-stats">
              <div className="stat-card">
                <h3>{products.length}</h3>
                <p>Total Products</p>
              </div>

              <div className="stat-card">
                <h3>{orders.length}</h3>
                <p>Total Orders</p>
              </div>

              <div className="stat-card">
                <h3>{artisans.length}</h3>
                <p>Total Artisans</p>
              </div>

              <div className="stat-card">
                <h3>{users.length}</h3>
                <p>Total Users</p>
              </div>
            </div>
          </>
        )}

        {/* ===== PRODUCTS ===== */}
        {activeTab === "products" && (
          <>
            <h1 className="admin-title">Product Management</h1>

            <div className="admin-form-card">
              <h2>Add New Product</h2>

              <form onSubmit={addProduct} className="admin-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Product name"
                  value={form.name}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="image-preview"
                  />
                )}

                <button type="submit">➕ Add Product</button>
              </form>
            </div>

            <div className="admin-table">
              <h2>All Products</h2>

              <table>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>₹{p.price}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteProduct(p.id)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ===== ARTISANS ===== */}
        {activeTab === "artisans" && (
          <div className="admin-artisans">
            <h1 className="admin-title">Artisan Management</h1>

            <div className="artisan-form">
              <input
                placeholder="Artisan name"
                value={newArtisan.name}
                onChange={(e) =>
                  setNewArtisan({
                    ...newArtisan,
                    name: e.target.value,
                  })
                }
              />
              <input
                placeholder="Location"
                value={newArtisan.location}
                onChange={(e) =>
                  setNewArtisan({
                    ...newArtisan,
                    location: e.target.value,
                  })
                }
              />
              <button onClick={() => addArtisan(newArtisan)}>
                Add Artisan
              </button>
            </div>

            {artisans.map((a) => (
              <div key={a.id} className="artisan-card">
                <h3>{a.name}</h3>
                <p>📍 {a.location}</p>
                <p>⭐ Rating: {a.rating}</p>
                <button onClick={() => toggleBlock(a.id)}>
                  {a.blocked ? "Unblock" : "Block"}
                </button>
                <button onClick={() => removeArtisan(a.id)}>
                  Remove
                </button>
                <button onClick={() => updateRating(a.id, 5)}>
                  Give 5⭐
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ===== ORDERS ===== */}
        {activeTab === "orders" && (
          <div className="admin-orders">
            <h2>All Orders</h2>

            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>👤 {order.username}</h3>
                <p>Total: ₹{order.total}</p>
                <p>Items: {order.items?.length}</p>
              </div>
            ))}
          </div>
        )}

        {/* ===== USERS ===== */}
        {activeTab === "users" && (
          <div className="admin-users">
            <h1 className="admin-title">
              Users ({users.length})
            </h1>

            {users.length === 0 ? (
              <p className="empty-text">No users found.</p>
            ) : (
              <div className="users-grid">
                {users.map((u) => (
                  <div key={u.id} className="user-card">
                    <h3>👤 {u.username}</h3>
                    <p><strong>Role:</strong> {u.role}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {u.blocked ? "🚫 Blocked" : "✅ Active"}
                    </p>

                    <div className="user-actions">
                      <button
                        className="block-btn"
                        onClick={() => toggleBlockUser(u.id)}
                      >
                        {u.blocked ? "Unblock" : "Block"}
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => removeUser(u.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;