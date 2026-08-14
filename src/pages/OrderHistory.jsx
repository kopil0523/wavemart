import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OrderHistory() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);
      } else if (response.status === 401) {
        // Token invalid or expired
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to load orders. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f59e0b";
      case "processing":
        return "#3b82f6";
      case "shipped":
        return "#8b5cf6";
      case "delivered":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "processing":
        return "🔄";
      case "shipped":
        return "🚚";
      case "delivered":
        return "✅";
      default:
        return "📦";
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #f0f0f0",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 2rem",
          }}
        />
        <p style={{ color: "#666" }}>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>😕</div>
        <h2>Error Loading Orders</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>{error}</p>
        <button
          onClick={fetchOrders}
          style={{
            padding: "0.75rem 2rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>📋</div>
        <h2>No Orders Yet</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          You haven&apos;t placed any orders yet. Start shopping!
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
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 2rem" }}>
      <h2 style={{ marginBottom: "2rem", fontSize: "2rem", color: "#333" }}>
        My Orders ({orders.length})
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Order Header - Always Visible */}
            <div
              onClick={() => toggleExpand(order._id)}
              style={{
                padding: "1.5rem",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f9fafb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "white")
              }
            >
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "0.25rem",
                  }}
                >
                  {order.orderId}
                </p>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    background: getStatusColor(order.status) + "20",
                    color: getStatusColor(order.status),
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                  }}
                >
                  {getStatusIcon(order.status)} {order.status}
                </span>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#667eea",
                    fontSize: "1.1rem",
                  }}
                >
                  {order.total.toFixed(2)} Tk
                </span>
                <span style={{ color: "#666", fontSize: "1.2rem" }}>
                  {expandedOrder === order._id ? "▲" : "▼"}
                </span>
              </div>
            </div>

            {/* Order Details - Expandable */}
            {expandedOrder === order._id && (
              <div
                style={{
                  padding: "1.5rem",
                  borderTop: "1px solid #f0f0f0",
                  background: "#f9fafb",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.85rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Customer
                    </p>
                    <p style={{ fontWeight: "600", color: "#333" }}>
                      {order.customer.name}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.85rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Phone
                    </p>
                    <p style={{ fontWeight: "600", color: "#333" }}>
                      {order.customer.phone}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.85rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Address
                    </p>
                    <p style={{ fontWeight: "600", color: "#333" }}>
                      {order.customer.address}, {order.customer.city}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.85rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Payment
                    </p>
                    <p style={{ fontWeight: "600", color: "#333" }}>
                      {order.paymentMethod} (*{order.cardLast4})
                    </p>
                  </div>
                </div>

                {/* Items */}
                <h4
                  style={{
                    marginBottom: "0.5rem",
                    color: "#333",
                    fontSize: "0.95rem",
                  }}
                >
                  Items:
                </h4>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.4rem 0",
                      borderBottom:
                        index < order.items.length - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ color: "#666" }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span style={{ fontWeight: "600", color: "#333" }}>
                      {(item.price * item.quantity).toFixed(2)} Tk
                    </span>
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    paddingTop: "1rem",
                    borderTop: "2px solid #e5e7eb",
                    fontWeight: "bold",
                  }}
                >
                  <span>Total Paid:</span>
                  <span style={{ color: "#667eea" }}>
                    {order.total.toFixed(2)} Tk
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;