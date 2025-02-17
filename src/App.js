import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://45spw5s7d7.execute-api.ap-southeast-1.amazonaws.com/prod";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔹 Fetch data dari API
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Tambah user baru (POST)
  const handleAddUser = () => {
    axios.post(API_URL, { name, email })
      .then((res) => {
        setUsers([...users, { id: res.data.id, name, email }]);
        setName("");
        setEmail("");
      })
      .catch((err) => console.error(err));
  };

  // 🔹 Edit user (PUT)
  const handleUpdateUser = () => {
    axios.put(API_URL, { id: editingId, name, email })
      .then(() => {
        setUsers(users.map(user => user.id === editingId ? { id: editingId, name, email } : user));
        setEditingId(null);
        setName("");
        setEmail("");
      })
      .catch((err) => console.error(err));
  };

  // 🔹 Hapus user (DELETE)
  const handleDeleteUser = (id) => {
    axios.delete(API_URL, { data: { id } })
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Manajemen Pengguna</h2>

      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {editingId ? (
        <button onClick={handleUpdateUser}>Update User</button>
      ) : (
        <button onClick={handleAddUser}>Tambah User</button>
      )}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => { setEditingId(user.id); setName(user.name); setEmail(user.email); }}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
