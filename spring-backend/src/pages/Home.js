import "./Home.css";
import { useState } from "react";
import { translations } from "../i18n/translations";
import { Link } from "react-router-dom";

import sareeImg from "../assets/saree.webp";
import kurtaImg from "../assets/kurta.webp";
import dupattaImg from "../assets/dupatta.webp";


function Home() {
    const [lang, setLang] = useState("EN");
    const t = translations[lang];

    return (
    <div>
        <div style={{ textAlign: "right", padding: "10px 40px" }}>
  <select value={lang} onChange={(e) => setLang(e.target.value)}>
    <option value="EN">EN</option>
    <option value="HI">हिंदी</option>
    <option value="TE">తెలుగు</option>
  </select>
</div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>

          <div className="hero-buttons">
  <Link to="/shop" className="primary-btn">
    {t.shopNow}
  </Link>

  <Link to="/artisan" className="secondary-btn">
    {t.explore}
  </Link>
</div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured">
        <h2>{t.featured}</h2>

        <div className="product-grid">
          <div className="product-card">
            <img src={sareeImg} alt="saree" />
            <h3>Handloom Saree</h3>
            <p>₹2499</p>
          </div>

          <div className="product-card">
            <img src={kurtaImg} alt="kurta" />
            <h3>Cotton Kurta</h3>
            <p>₹1499</p>
          </div>

          <div className="product-card">
            <img src={dupattaImg} alt="dupatta" />
            <h3>Silk Dupatta</h3>
            <p>₹899</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;