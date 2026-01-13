import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [keys, setKeys] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Efek dijalankan saat halaman pertama kali dibuka
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Tendang ke login kalau tidak punya token
      return;
    }
    setUserName(localStorage.getItem("userName"));
    fetchKeys();
    // eslint-disable-next-line
  }, []);

  // Fungsi ambil list key dari backend
  const fetchKeys = async () => {
    try {
      const res = await axios.get("http://localhost:3000/dashboard/my-keys", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKeys(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data key:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Fungsi generate key baru
  const generateKey = async () => {
    try {
      await axios.post(
        "http://localhost:3000/dashboard/generate-key",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("API Key baru berhasil dibuat!");
      fetchKeys(); // Refresh tampilan list
    } catch (error) {
      alert("Gagal generate key");
    }
  };

  return (
    <div className="container">
      <div style={{ marginTop: "20px" }}>
        <h1>Halo, {userName} 👋</h1>
        <p>Selamat datang di Dashboard Developer Notezz.</p>
      </div>

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>🔑 API Keys Anda</h3>
          <button onClick={generateKey}>+ Generate New Key</button>
        </div>
        <hr
          style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }}
        />

        {keys.length === 0 ? (
          <p style={{ color: "#888", fontStyle: "italic" }}>
            Anda belum memiliki API Key. Silakan buat satu.
          </p>
        ) : (
          keys.map((item, index) => (
            <div key={index} className="key-box">
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                KEY ID:
              </div>
              <div style={{ fontSize: "1.2em", color: "#d35400" }}>
                {item.key}
              </div>
              <div style={{ marginTop: "10px" }}>
                Status:{" "}
                <span
                  style={{
                    background: item.isActive ? "#2ecc71" : "#e74c3c",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
