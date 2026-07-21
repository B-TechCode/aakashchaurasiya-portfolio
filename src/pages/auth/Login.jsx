import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginApi } from "../../api/authApi";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginApi({
        username,
        password,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);

      navigate("/verify-otp", {
        state: {
          email: response.data.email,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-[430px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-10"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-10">
          Admin Login
        </h1>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-900
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              outline-none
              transition
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/30
            "
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-900
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              outline-none
              transition
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/30
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-600
              disabled:opacity-60
              disabled:cursor-not-allowed
              transition-all
              text-white
              font-semibold
              p-4
              rounded-xl
            "
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}

