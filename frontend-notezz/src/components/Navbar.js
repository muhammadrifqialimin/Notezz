import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div>
        {/* Logo tetap bisa diklik ke Home */}
        <Link to="/" style={{ fontSize: "1.2rem" }}>
          🚀 Notezz Open API
        </Link>
      </div>
      <div>
        {/* Docs selalu muncul baik login maupun belum */}
        <Link to="/docs">Docs</Link>

        {token ? (
          // === JIKA SUDAH LOGIN (TAMPILKAN DASHBOARD & NOTES) ===
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/notes">My Notes</Link>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "15px",
                background: "#e74c3c",
                padding: "5px 10px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          // === JIKA BELUM LOGIN (TAMPILKAN HOME, LOGIN, REGISTER) ===
          <>
            {/* Home hanya muncul disini */}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
