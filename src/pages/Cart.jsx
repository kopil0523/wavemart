import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart, updateQuantity, cartTotal }) {
  if (cart.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem 2rem",
          maxWidth: "600px",
          margin: "2rem auto",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🛒</div>
        <h2 style={{ marginBottom: "0.5rem", color: "#333" }}>
          Your cart is empty
        </h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Looks like you haven't added anything to your cart yet
        </p>
        <Link
          to="/"
          style={{
            padding: "0.75rem 2rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 2rem" }}>
      <h2 style={{ marginBottom: "2rem", fontSize: "2rem", color: "#333" }}>
        Shopping Cart ({cart.length} items)
      </h2>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {cart.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              padding: "1.5rem",
              borderBottom: index < cart.length - 1 ? "1px solid #eee" : "none",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#f5f5f5",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    '<div style="font-size:3rem;text-align:center;padding:1.5rem;">📷</div>';
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: "0.25rem", color: "#333" }}>
                {item.name}
              </h3>
              <p
                style={{
                  color: "#667eea",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                {item.price} Tk
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#f5f5f5",
                borderRadius: "8px",
                padding: "0.25rem",
              }}
            >
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{
                  padding: "0.25rem 0.75rem",
                  background: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                −
              </button>
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "30px",
                  textAlign: "center",
                }}
              >
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{
                  padding: "0.25rem 0.75rem",
                  background: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                +
              </button>
            </div>

            <div style={{ textAlign: "right", minWidth: "80px" }}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                {(item.price * item.quantity).toFixed(2)} Tk
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                background: "#ff4757",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
          marginTop: "2rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span style={{ fontSize: "1.3rem", color: "#666" }}>Total:</span>
          <span
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}
          >
            {cartTotal.toFixed(2)} Tk
          </span>
        </div>

        <Link
          to="/checkout"
          style={{
            display: "block",
            width: "100%",
            padding: "1rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1.2rem",
            fontWeight: "600",
            textAlign: "center",
            transition: "opacity 0.3s",
          }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
