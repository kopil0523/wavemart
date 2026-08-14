import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      address: formData.address,
    });

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    color: "#374151",
    fontWeight: "500",
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "3rem auto",
        padding: "2rem",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ color: "#333", fontSize: "2rem", marginBottom: "0.5rem" }}>
          Create Account
        </h2>
        <p style={{ color: "#666" }}>Join WaveMart today</p>
      </div>

      {error && (
        <div
          style={{
            background: "#fee2e2",
            color: "#dc2626",
            padding: "0.75rem",
            borderRadius: "6px",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Full Name</label>
          <input type="text" name="name" placeholder="Enter your full name" required value={formData.name} onChange={handleChange} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Email Address</label>
          <input type="email" name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Phone Number</label>
          <input type="tel" name="phone" placeholder="01XXXXXXXXX" required maxLength="11" value={formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 11);
              setFormData({ ...formData, phone: value });
            }} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Password</label>
          <input type="password" name="password" placeholder="Min 6 characters" required minLength="6" value={formData.password} onChange={handleChange} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Confirm Password</label>
          <input type="password" name="confirmPassword" placeholder="Re-enter your password" required value={formData.confirmPassword} onChange={handleChange} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Address (Optional)</label>
          <input type="text" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")} />
        </div>

        <button type="submit" disabled={loading}
          style={{
            width: "100%", padding: "0.75rem",
            background: loading ? "#9ca3af" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white", border: "none", borderRadius: "8px",
            fontSize: "1rem", fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
          }}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1.5rem", color: "#666" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#667eea", textDecoration: "none", fontWeight: "600" }}>Login here</Link>
      </div>
    </div>
  );
}

export default Register;