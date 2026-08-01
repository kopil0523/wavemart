import { Link } from "react-router-dom";

function Footer() {
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
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            🌊 WaveMart
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.95rem",
              lineHeight: "1.6",
            }}
          >
            Your one-stop shop for quality tech accessories. We provide the best
            products at competitive prices with fast and reliable service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Quick Links
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link
                to="/"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.8)")
                }
              >
                Home
              </Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link
                to="/cart"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.8)")
                }
              >
                Shopping Cart
              </Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link
                to="/checkout"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.8)")
                }
              >
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Contact Us
          </h4>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
            <p style={{ marginBottom: "0.5rem" }}>📧 support@wavemart.com</p>
            <p style={{ marginBottom: "0.5rem" }}>📱 +88 09678 248823</p>
            <p style={{ marginBottom: "0.5rem" }}>
              📍 123 Ali Tower, Mirpur-2, Dhaka -1287
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Follow Us
          </h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href="#"
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "0.5rem",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "white",
                fontSize: "1.2rem",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.2)")
              }
            >
              📘
            </a>
            <a
              href="#"
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "0.5rem",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "white",
                fontSize: "1.2rem",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.2)")
              }
            >
              🐦
            </a>
            <a
              href="#"
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "0.5rem",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "white",
                fontSize: "1.2rem",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.2)")
              }
            >
              📷
            </a>
            <a
              href="#"
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "0.5rem",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "white",
                fontSize: "1.2rem",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.2)")
              }
            >
              ▶️
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          paddingTop: "1.5rem",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.9rem",
            marginBottom: "0.5rem",
          }}
        >
          © 2026 WaveMart. All rights reserved. | This is a demo project for
          educational purposes.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Return Policy</span>
          <span>FAQ</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
