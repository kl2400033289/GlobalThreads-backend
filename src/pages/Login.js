import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";
import BASE_URL from "../api";

const parseJwtPayload = (token) => {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(decoded);
  } catch {
    return {};
  }
};

function Login() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useContext(AuthContext);
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const demoAccounts = [
    {
      email: "admin@globalthreads.com",
      password: "admin123",
      role: "Admin",
    },
    {
      email: "artisan@globalthreads.com",
      password: "artisan123",
      role: "Artisan",
    },
    {
      email: "buyer@globalthreads.com",
      password: "buyer123",
      role: "Buyer",
    },
    {
      email: "marketing@globalthreads.com",
      password: "marketing123",
      role: "Marketing",
    },
  ];

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fillDemoAccount = ({ email, password }) => {
    setForm({ email, password });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = form.email.trim();

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password: form.password,
      });

      const token = response.data;
      localStorage.setItem("token", token);
      console.log("Login token:", token);

      const payload = parseJwtPayload(token);
      const roleClaim =
        payload.role ||
        payload.userRole ||
        payload.authorities?.[0] ||
        payload.roles?.[0] ||
        "buyer";

      const normalizedRole =
        typeof roleClaim === "string"
          ? roleClaim.replace(/^ROLE_/i, "").toLowerCase()
          : "buyer";

      setAuthenticatedUser({
        email: payload.email || payload.sub || email,
        username: payload.username || payload.name || email.split("@")[0],
        role: normalizedRole,
      });

      alert("Login successful");
      window.location.href = "/";
    } catch (apiError) {
      const errorText = apiError.response?.data || "Login failed";
      alert(errorText);
      setError(t("login.invalidCreds"));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-badge">{t("login.welcomeBack")}</p>
        <h1 className="auth-title">{t("login.title")}</h1>
        <p className="auth-subtitle">
          {t("login.subtitle")}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">{t("login.emailOrUsername")}</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder={t("login.enterEmailOrUsername")}
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">{t("login.password")}</label>
          <div className="password-row">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={t("login.enterPassword")}
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? t("login.hide") : t("login.show")}
            </button>
          </div>

          {error && <p className="auth-message error-text">{error}</p>}

          <button type="submit" className="primary-btn auth-submit">
            {t("login.submit")}
          </button>
        </form>

        <p className="switch-auth-text">
          {t("login.noAccount")}
          <span onClick={() => navigate("/signup")}> {t("login.signUp")}</span>
        </p>

        <p className="switch-auth-text auth-link-secondary">
          <span onClick={() => navigate("/forgot-password")}>{t("login.forgotPassword")}</span>
        </p>

        <div className="demo-panel">
          <p className="demo-title">{t("login.quickDemo")}</p>
          <div className="demo-grid">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                className="demo-chip"
                onClick={() => fillDemoAccount(account)}
              >
                {account.role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;