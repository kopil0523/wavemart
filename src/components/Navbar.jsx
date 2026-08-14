import { Link, useLocation } from "react-router-dom";

function Navbar({ cartCount, user, logout }) {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    background:
      location.pathname === path ? "rgba(255,255,255,0.2)" : "transparent",
    transition: "background 0.3s",
  });

  const handleMouseEnter = (e) => {
    e.target.style.background = "rgba(255,255,255,0.2)";
  };

  const handleMouseLeave = (e, path) => {
    if (location.pathname === path) {
      e.target.style.background = "rgba(255,255,255,0.2)";
    } else {
      e.target.style.background = "transparent";
    }
  };

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

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        {/* HOME */}
        <Link
          to="/"
          style={linkStyle("/")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={(e) => handleMouseLeave(e, "/")}
        >
          Home
        </Link>

        {user ? (
          <>
            {/* ORDERS */}
            <Link
              to="/order-history"
              style={linkStyle("/order-history")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e, "/order-history")}
            >
              📋 Orders
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              style={{
                ...linkStyle("/cart"),
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e, "/cart")}
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

            {/* USER NAME */}
            <span
              style={{
                color: "white",
                fontSize: "0.9rem",
                padding: "0.5rem 0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                cursor: "default",
              }}
            >
              👤 {user.name}
            </span>

            {/* LOGOUT */}
            <button
              onClick={logout}
              style={{
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                transition: "background 0.3s",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* CART */}
            <Link
              to="/cart"
              style={{
                ...linkStyle("/cart"),
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e, "/cart")}
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

            {/* LOGIN */}
            <Link
              to="/login"
              style={linkStyle("/login")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e, "/login")}
            >
              Login
            </Link>

            {/* REGISTER */}
            <Link
              to="/register"
              style={linkStyle("/register")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={(e) => handleMouseLeave(e, "/register")}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;