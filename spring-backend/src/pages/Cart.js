import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
    
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div className="qty-controls">
                  <button onClick={() => updateQty(item.id, -1)}>
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="cart-total">Total: ₹{total}</h2>
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
          <button
  className="checkout-btn"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>
        </>
      )}
    </div>
  );
}

export default Cart;