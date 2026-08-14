import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const badgeStyle = {
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    background: "transparent",
    transition: "background 0.3s",
    cursor: "default",
    fontSize: "0.85rem",
  };

  const handleMouseEnter = (e) => {
    e.target.style.background = "rgba(255,255,255,0.2)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = "transparent";
  };

  const handleSubscribe = () => {
    if (email.trim() === "") {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "3rem 2rem 1rem",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        {/* Company Info */}
        <div>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
            🌊 WaveMart
          </h3>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", lineHeight: "1.6" }}>
            Quality tech accessories at competitive prices. Fast delivery across Bangladesh.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <span style={badgeStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🔒 SSL Secured</span>
            <span style={badgeStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>✅ Verified</span>
            <span style={badgeStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>🛡️ Buyer Protection</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "bold" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link to="/" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.8)")}>
                Home
              </Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link to="/cart" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.8)")}>
                Shopping Cart
              </Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link to="/order-history" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.8)")}>
                My Orders
              </Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link to="/login" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.8)")}>
                Login / Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "bold" }}>Contact Us</h4>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
            <p style={{ marginBottom: "0.5rem" }}>📧 support@wavemart.com</p>
            <p style={{ marginBottom: "0.5rem" }}>📱 09678-248823 (Hotline)</p>
            <p style={{ marginBottom: "0.5rem" }}>📍 123 Ali Tower, Mirpur-2, Dhaka-1287</p>
            <p style={{ marginBottom: "0.5rem" }}>🕐 Sat-Thu: 9AM - 9PM</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "bold" }}>We Accept</h4>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={badgeStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>💳 Visa</span>
            <span style={badgeStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>💳 Mastercard</span>
          </div>
        </div>

        {/* Newsletter */}
                {/* Newsletter - Full Width */}
        <div style={{ gridColumn: "1 / -1", maxWidth: "600px", width: "100%" }}>
          <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem", fontWeight: "bold" }}>Newsletter</h4>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Subscribe for exclusive offers and updates.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
            <input
              type="email"
              placeholder={emailError ? "Please enter your email first!" : "Your email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                borderRadius: "4px",
                border: emailError ? "2px solid #ff4757" : "none",
                outline: "none",
                fontSize: "1rem",
                background: emailError ? "#fff5f5" : "white",
                color: emailError ? "#ff4757" : "#333",
                minWidth: "200px",
              }}
            />
            {subscribed ? (
              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                }}
              >
                ✓ Subscribed!
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.3)")}
                onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
              >
                Subscribe
              </button>
            )}
          </div>
          {subscribed && (
            <p style={{ color: "#10b981", fontSize: "0.85rem", marginTop: "0.5rem" }}>
              ✅ Thank you for subscribing!
            </p>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "1.5rem", textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          © 2026 WaveMart. All rights reserved. | Demo project for educational purposes.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
          <span style={{ cursor: "pointer", transition: "color 0.3s", padding: "0.25rem 0.5rem" }}
            onMouseEnter={(e) => (e.target.style.color = "white")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}>
            Privacy Policy
          </span>
          <span style={{ cursor: "pointer", transition: "color 0.3s", padding: "0.25rem 0.5rem" }}
            onMouseEnter={(e) => (e.target.style.color = "white")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}>
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;