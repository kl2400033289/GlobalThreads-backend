import "./Login.css";   // reuse SAME CSS
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "buyer",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if already exists
    const exists = users.find((u) => u.username === form.username);
    if (exists) {
      setMessage("User already exists!");
      return;
    }

    // save user
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Account created successfully!");

    // redirect to login after signup
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="role-container">
      <h1 className="role-title">Sign Up</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Choose Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Choose Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Role selection */}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="artisan">Artisan</option>
          <option value="marketing">Marketing</option>
        </select>

        {message && <p className="error-text">{message}</p>}

        <button type="submit" className="primary-btn">
          Create Account
        </button>
      </form>

      {/* LOGIN OPTION */}
      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#8b1e2d", cursor: "pointer", fontWeight: "600" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;