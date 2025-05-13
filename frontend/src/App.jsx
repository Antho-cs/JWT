import React, { useState } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const form = new URLSearchParams();
      form.append("username", "demo");
      form.append("password", "password");
      const res = await axios.post("http://localhost:8000/token", form);
      setToken(res.data.access_token);
    } catch {
      alert("Erreur de login");
    }
  };

  const getProtected = async () => {
    try {
      const res = await axios.get("http://localhost:8000/protected", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
    } catch {
      setMessage("Accès refusé");
    }
  };

  return (
    <div>
      <h1>Démo Auth JWT React + FastAPI</h1>
      <button onClick={login}>Login</button>
      <button onClick={getProtected}>Accéder à /protected</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
