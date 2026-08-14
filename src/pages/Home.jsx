import { useState } from "react";
import { products } from "../data/products";

function Home({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{ fontSize: "2.5rem", color: "#333", marginBottom: "0.5rem" }}
        >
          Our Products
        </h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>
          Quality tech accessories at great prices
        </p>
      </div>


      <div style={{ maxWidth: "500px", margin: "0 auto 2rem" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#667eea")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />
      </div>

  
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "0.5rem 1.5rem",
              background:
                selectedCategory === category
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "white",
              color: selectedCategory === category ? "white" : "#666",
              border:
                selectedCategory === category ? "none" : "1px solid #e5e7eb",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "500",
              transition: "all 0.3s",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ========== PRODUCTS GRID ========== */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
            padding: "0 1rem",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  height: "200px",
                  overflow: "hidden",
                  position: "relative",
                  background: "#f5f5f5",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML =
                      '<div style="font-size:5rem;text-align:center;padding:2rem;">📷</div>';
                  }}
                />
                {/* Category Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#667eea",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {product.category}
                </span>
              </div>

              {/* Product Info */}
              <div style={{ padding: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "0.5rem",
                    color: "#333",
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {product.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#667eea",
                    }}
                  >
                    {product.price} Tk
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Product Count */}
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          color: "#666",
          fontSize: "0.9rem",
        }}
      >
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
}

export default Home;
