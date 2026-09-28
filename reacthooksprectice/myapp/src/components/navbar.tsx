import { Link } from "react-router-dom"
import { useTheme } from "../context/themecontext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        padding: "16px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
        justifyContent: "space-between",
        background:
          theme === "light"
            ? "#eeeeee"
            : "#222222",
        color:
          theme === "light"
            ? "#222222"
            : "#ffffff",
      }}
    >
      <div>
        <Link to="/">Products</Link>{" "}
        <Link to="/cart">Cart</Link>{" "}
        <Link to="/register">Register</Link>
      </div>

      <button onClick={toggleTheme}>
        {theme === "light"
          ? "🌙 Dark Mode"
          : "☀️ Light Mode"}
      </button>
    </nav>
  );
}