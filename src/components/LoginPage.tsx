import { useState } from "react";
// import { useNavigate } from "react-router-dom";

type LoginPageProps = {
  onLogin: (teacher: any, token: string) => void;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const baseURL = 'https://eduvista-backend-render.onrender.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // const res = await fetch("http://127.0.0.1:8000/api/api/login/", {
      const res = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store tokens + teacher info
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("teacher", JSON.stringify(data.teacher));
      const teacher = data.teacher;
      console.log(data);
      window.location.href = "/";
      // navigate("/homepage", { state: { teacher } });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div id="login-wrapper">
      <div className="login-container">
        <h1>EduVista</h1>
        <p>Welcome back! Please login to continue.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        {/* <div className="extra-links">
          <p>
            Don’t have an account? <a href="/signup">sign up</a>
          </p>
          <p>
            <a href="#">Forgot Password?</a>
          </p>
        </div> */}
      </div>
    </div>
  );
}
