import { Link, useLocation } from "react-router-dom";

function Navbar({ cartCount }) {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    background:
      location.pathname === path ? "rgba(255,255,255,0.2)" : "transparent",
    transition: "background 0.3s",
  });

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1rem 2rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "1.8rem",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        🌊 WaveMart
      </Link>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/" style={linkStyle("/")}>
          Home
        </Link>
        <Link
          to="/cart"
          style={{
            ...linkStyle("/cart"),
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span
              style={{
                background: "#ff4757",
                color: "white",
                borderRadius: "50%",
                padding: "0.15rem 0.4rem",
                fontSize: "0.7rem",
                fontWeight: "bold",
                minWidth: "20px",
                textAlign: "center",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
