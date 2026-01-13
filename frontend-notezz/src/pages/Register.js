import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", formData);
      alert("Register Berhasil! Silakan Login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Register Gagal");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "400px", margin: "50px auto" }}>
        <h2>Daftar Developer Baru</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button type="submit" style={{ width: "100%" }}>
            Daftar Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}
