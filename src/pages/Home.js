import "./Home.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import sareeImg from "../assets/saree.webp";
import kurtaImg from "../assets/kurta.webp";
import dupattaImg from "../assets/dupatta.webp";


function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{t("home.heroTitle")}</h1>
          <p>{t("home.heroDesc")}</p>
          <p className="hero-subtext">
            {t("home.heroSubtext")}
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="primary-btn">
              {t("home.shopNow")}
            </Link>

            <Link to="/artisan" className="secondary-btn">
              {t("home.explore")}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured">
        <h2>{t("home.featured")}</h2>
        <p className="featured-subtitle">
          {t("home.featuredSubtitle")}
        </p>

        <div className="product-grid">
          <div className="product-card">
            <img src={sareeImg} alt="saree" />
            <h3>{t("home.saree")}</h3>
            <p>₹2,499</p>
          </div>

          <div className="product-card">
            <img src={kurtaImg} alt="kurta" />
            <h3>{t("home.kurta")}</h3>
            <p>₹1,499</p>
          </div>

          <div className="product-card">
            <img src={dupattaImg} alt="dupatta" />
            <h3>{t("home.dupatta")}</h3>
            <p>₹899</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;