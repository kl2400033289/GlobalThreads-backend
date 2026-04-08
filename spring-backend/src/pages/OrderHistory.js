import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import "./OrderHistory.css";

function OrderHistory() {
  const { orders } = useContext(OrderContext);

  return (
    <div className="orders-page">
      <h1>📦 Order History</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order #{order.id}</h3>
            <p>Date: {order.date}</p>
            <p>Total: ₹{order.total}</p>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <span>
                    {item.name} × {item.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;