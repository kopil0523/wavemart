import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderConfirm() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  if (!order) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
        <h2>No Order Found</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          There is no recent order to display
        </p>
        <Link
          to="/"
          style={{
            padding: "0.75rem 2rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 2rem" }}>
      {/* Success Header */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "3rem 2rem",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "#10b981",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            fontSize: "2.5rem",
            color: "white",
          }}
        >
          ✓
        </div>
        <h1 style={{ color: "#10b981", marginBottom: "0.5rem" }}>
          Order Confirmed!
        </h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>
          Thank you for your purchase, {order.customer.name}!
        </p>
      </div>

      {/* Order Details */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: "2rem",
        }}
      >
        <h3
          style={{
            marginBottom: "1.5rem",
            color: "#333",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: "0.5rem",
          }}
        >
          Order Details
        </h3>

        <div style={{ marginBottom: "1rem" }}>
          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
            <strong>Date:</strong> {new Date(order.date).toLocaleString()}
          </p>
          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
            <strong>Name:</strong> {order.customer.name}
          </p>
          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
            <strong>Phone:</strong> {order.customer.phone}
          </p>
          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
            <strong>Shipping Address:</strong> {order.customer.address},{" "}
            {order.customer.city} {order.customer.zip}
          </p>
          <p style={{ color: "#666" }}>
            <strong>Payment:</strong> {order.paymentMethod} ending in{" "}
            {order.cardLast4}
          </p>
        </div>

        {/* Items List */}
        <div style={{ marginTop: "1.5rem" }}>
          <h4 style={{ marginBottom: "0.5rem", color: "#333" }}>
            Items Purchased:
          </h4>
          {order.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ color: "#666" }}>
                {item.name} × {item.quantity}
              </span>
              <span style={{ fontWeight: "bold", color: "#333" }}>
                {(item.price * item.quantity).toFixed(2)} Tk
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 0 0",
            marginTop: "1rem",
            borderTop: "2px solid #f0f0f0",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          <span>Total Paid:</span>
          <span style={{ color: "#667eea" }}>{order.total.toFixed(2)} Tk</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          to="/"
          style={{
            flex: 1,
            display: "block",
            padding: "1rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Continue Shopping
        </Link>
        <Link
          to="/order-history"
          style={{
            flex: 1,
            display: "block",
            padding: "1rem",
            background: "white",
            color: "#667eea",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "600",
            textAlign: "center",
            border: "2px solid #667eea",
          }}
        >
          View All Orders
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirm;