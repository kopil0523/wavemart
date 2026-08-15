import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import { useAuth } from "../context/AuthContext";

function Checkout({ cart, cartTotal, clearCart }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  
  // Pre-fill form with user data if logged in
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardNumber = (e) => {
    let rawValue = e.target.value;
    let digits = rawValue.replace(/\D/g, "");
    digits = digits.slice(0, 16);

    let formattedValue = "";
    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += digits[i];
    }

    setFormData({ ...formData, cardNumber: formattedValue });
  };

  const handleExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2, 4);
    setFormData({ ...formData, expiry: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep(3);

    // If user is logged in, save order to database
    if (user) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`${API_URL}/api/orders/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cart,
            total: cartTotal,
            customer: {
              name: formData.name,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              zip: formData.zip,
            },
            cardLast4: formData.cardNumber.replace(/\s/g, "").slice(-4),
          }),
        });
      } catch (error) {
        console.error("Failed to save order:", error);
      }
    }

    setTimeout(() => {
      const orderDetails = {
        orderId: "WM-" + Date.now(),
        items: cart,
        total: cartTotal,
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
        },
        date: new Date().toISOString(),
        paymentMethod: "Credit Card",
        cardLast4: formData.cardNumber.replace(/\s/g, "").slice(-4),
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderDetails));
      clearCart();
      navigate("/order-confirm");
    }, 2000);
  };

  if (step === 3) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem 2rem",
          maxWidth: "500px",
          margin: "2rem auto",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "4px solid #f0f0f0",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 2rem",
          }}
        />
        <h2 style={{ color: "#333", marginBottom: "0.5rem" }}>
          Processing Payment
        </h2>
        <p style={{ color: "#666" }}>
          Please wait while we process your payment...
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "1rem",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 2rem" }}>
      <div
        style={{
          display: "flex",
          marginBottom: "2rem",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: "1rem",
            background: step === 1 ? "#667eea" : "#f0f0f0",
            color: step === 1 ? "white" : "#999",
          }}
        >
          📝 Shipping
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: "1rem",
            background: step === 2 ? "#667eea" : "#f0f0f0",
            color: step === 2 ? "white" : "#999",
          }}
        >
          💳 Payment
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: "1rem",
            background: "#f0f0f0",
            color: "#999",
          }}
        >
          ✅ Confirm
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "1.5rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#333" }}>Order Summary</h3>
        {cart.map((item) => (
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
              {item.name} x{item.quantity}
            </span>
            <span style={{ fontWeight: "bold" }}>
              {(item.price * item.quantity).toFixed(2)} Tk
            </span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 0 0",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          <span>Total:</span>
          <span style={{ color: "#667eea" }}>{cartTotal.toFixed(2)} Tk</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#333" }}>
              Shipping Information
            </h3>
            
            {/* Show login prompt if not logged in */}
            {!user && (
              <div style={{
                background: "#e0e7ff",
                padding: "0.75rem",
                borderRadius: "6px",
                marginBottom: "1rem",
                fontSize: "0.9rem",
                color: "#4338ca",
              }}>
                💡 <strong>Tip:</strong> Login to auto-fill your information and save orders!
              </div>
            )}

            {user && (
              <div style={{
                background: "#d1fae5",
                padding: "0.75rem",
                borderRadius: "6px",
                marginBottom: "1rem",
                fontSize: "0.9rem",
                color: "#065f46",
              }}>
                ✅ Form pre-filled from your account, {user.name}!
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              required
              value={formData.name}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <input
              type="tel"
              name="phone"
              placeholder="01XXXXXXXXX"
              required
              maxLength="11"
              minLength="11"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                setFormData({ ...formData, phone: value });
              }}
              style={inputStyle}
              pattern="01[0-9]{9}"
              title="Enter 11-digit phone number starting with 01"
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address *"
              required
              value={formData.address}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <input
                type="text"
                name="city"
                placeholder="City *"
                required
                value={formData.city}
                onChange={handleInputChange}
                style={inputStyle}
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code *"
                required
                value={formData.zip}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              style={buttonStyle}
            >
              Continue to Payment →
            </button>
          </div>
        )}

        {step === 2 && (
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#333" }}>
              Payment Details
            </h3>

            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              Card Number (16 digits)
            </label>
            <input
              type="text"
              name="cardNumber"
              placeholder="Please enter 16 digit card number"
              required
              maxLength="19"
              minLength="19"
              value={formData.cardNumber}
              onChange={handleCardNumber}
              style={inputStyle}
              pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
              title="Please enter 16 digit card number"
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  Expiry Date (MM/YY)
                </label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  required
                  maxLength="5"
                  minLength="5"
                  value={formData.expiry}
                  onChange={handleExpiry}
                  style={inputStyle}
                  pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                  title="Please enter valid expiry date (MM/YY)"
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  CVV (3 digits)
                </label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  required
                  maxLength="3"
                  minLength="3"
                  value={formData.cvv}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                    })
                  }
                  style={inputStyle}
                  pattern="\d{3}"
                  title="Please enter 3 digit CVV"
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{ ...buttonStyle, background: "#666", flex: 1 }}
              >
                ← Back
              </button>
              <button type="submit" style={{ ...buttonStyle, flex: 1 }}>
                Pay {cartTotal.toFixed(2)} Tk
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Checkout;