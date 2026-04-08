import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";
import QRCode from "qrcode";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [upiQrCodeDataUrl, setUpiQrCodeDataUrl] = useState("");

  // ✅ Subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ COD Delivery Charge
  const deliveryCharge = selectedMethod === "cod" ? 100 : 0;

  // ✅ Final Total
  const total = Math.max(subtotal + deliveryCharge - discount, 0);
  const formattedAmount = total.toFixed(2);
  const merchantUpiId = "globalthreads@upi";
  const upiPaymentLink = `upi://pay?pa=${encodeURIComponent(
    merchantUpiId
  )}&pn=${encodeURIComponent("Global Threads")}&am=${encodeURIComponent(
    formattedAmount
  )}&cu=INR&tn=${encodeURIComponent("Global Threads Order Payment")}`;

  useEffect(() => {
    let isActive = true;

    QRCode.toDataURL(upiPaymentLink, {
      width: 220,
      margin: 1,
      errorCorrectionLevel: "M",
    })
      .then((dataUrl) => {
        if (isActive) {
          setUpiQrCodeDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (isActive) {
          setUpiQrCodeDataUrl("");
        }
      });

    return () => {
      isActive = false;
    };
  }, [upiPaymentLink]);

  // ✅ Apply Coupon
  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "SAVE10") {
      setDiscount(subtotal * 0.1);
      alert("🎉 10% Discount Applied!");
    } 
    else if (code === "FLAT100") {
      setDiscount(100);
      alert("🎉 ₹100 Discount Applied!");
    } 
    else if (code === "WELCOME50") {
      setDiscount(50);
      alert("🎉 ₹50 Discount Applied!");
    } 
    else if (code === "FREESHIP") {
      if (selectedMethod === "cod") {
        setDiscount(100);
        alert("🚚 Free Delivery Applied!");
      } else {
        alert("FREESHIP works only for COD");
      }
    } 
    else {
      setDiscount(0);
      alert("❌ Invalid Coupon");
    }
  };

  const handlePayment = () => {
    if (selectedMethod === "card") {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill all card details");
        return;
      }
    }

    if (selectedMethod === "upi" && !upiId) {
      alert("Please enter UPI ID");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newOrder = {
        id: Date.now(),
        username: user?.username || "guest",
        items: cart,
        subtotal,
        deliveryCharge,
        discount,
        total,
        paymentMethod: selectedMethod,
        date: new Date().toLocaleString(),
      };

      addOrder(newOrder);
      clearCart();

      alert("✅ Payment Successful!");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h1>💳 Payment</h1>

        <div className="payment-summary">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery: ₹{deliveryCharge}</p>
          <p>Discount: -₹{discount}</p>
          <h2>Total: ₹{total}</h2>
        </div>

        {/* Coupon */}
        <div className="coupon-box">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="payment-input"
          />
          <button className="coupon-btn" onClick={applyCoupon}>
            Apply
          </button>
        </div>

        {/* Demo Coupons */}
        <div className="demo-coupons">
          <p>Available Coupons:</p>
          <div className="coupon-list">
            <span onClick={() => setCoupon("SAVE10")}>SAVE10</span>
            <span onClick={() => setCoupon("FLAT100")}>FLAT100</span>
            <span onClick={() => setCoupon("WELCOME50")}>WELCOME50</span>
            <span onClick={() => setCoupon("FREESHIP")}>FREESHIP</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              value="card"
              checked={selectedMethod === "card"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            Credit / Debit Card (Free Delivery)
          </label>

          <label>
            <input
              type="radio"
              value="upi"
              checked={selectedMethod === "upi"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            UPI (Free Delivery)
          </label>

          <label>
            <input
              type="radio"
              value="cod"
              checked={selectedMethod === "cod"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            Cash on Delivery (+₹100)
          </label>
        </div>

        {/* Card Form */}
        {selectedMethod === "card" && (
          <div className="payment-form">
            <input
              type="text"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardDetails.name}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, name: e.target.value })
              }
            />
            <div className="row">
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* UPI Form */}
        {selectedMethod === "upi" && (
          <div className="payment-form">
            <div className="upi-qr-box">
              <p className="upi-qr-title">Scan QR to pay with any UPI app</p>
              {upiQrCodeDataUrl ? (
                <img
                  src={upiQrCodeDataUrl}
                  alt="UPI Payment QR"
                  className="upi-qr-image"
                />
              ) : (
                <p className="upi-qr-fallback">Unable to load QR. Use UPI ID below.</p>
              )}
              <p className="upi-merchant-id">UPI ID: {merchantUpiId}</p>
              <p className="upi-payable-amount">Payable: ₹{formattedAmount}</p>
            </div>
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Payment;