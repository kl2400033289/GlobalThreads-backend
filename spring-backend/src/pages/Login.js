import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(form.username, form.password);

    if (!result.success) {
      setError("Invalid credentials");
      return;
    }

    // redirect based on role
    navigate(`/${result.role}`);
  };

  return (
    <div className="role-container">
      <h1 className="role-title">Login</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
  Don’t have an account?{" "}
  <span
    style={{ color: "#8b1e2d", cursor: "pointer", fontWeight: "600" }}
    onClick={() => navigate("/signup")}
  >
    Sign Up
  </span>
</p>

      {/* Demo credentials (remove later if needed) */}
      <div style={{ marginTop: "20px", fontSize: "13px", opacity: 0.7 }}>
        <p><b>Demo Logins:</b></p>
        <p>Admin: admin / admin123</p>
        <p>Artisan: artisan / artisan123</p>
        <p>Buyer: buyer / buyer123</p>
        <p>Marketing: marketing / marketing123</p>
      </div>
    </div>
  );
}

export default Login;