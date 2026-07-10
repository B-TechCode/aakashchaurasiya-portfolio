        import { useState } from "react";
        import { useNavigate } from "react-router-dom";
        import toast from "react-hot-toast";

import { loginApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

        export default function Login() {

        const navigate = useNavigate();
        const { login } = useAuth();

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

    login(response.data.token);

    toast.success(response.message);

    navigate("/admin/dashboard");

            } catch (error) {

            toast.error(
                error.response?.data?.message || "Invalid username or password"
            );

            } finally {

            setLoading(false);

            }
        };

        return (
            <div className="min-h-screen bg-slate-900 flex justify-center items-center">

            <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-10 rounded-2xl w-[430px] shadow-2xl"
        >

        <h1 className="text-3xl font-bold text-white text-center mb-10">
            Admin Login
        </h1>

        <div className="space-y-6">

            <input
            type="text"
            placeholder="Username"
            className="w-full p-4 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all text-white p-4 rounded-lg font-semibold"
            >
            {loading ? "Logging in..." : "Login"}
            </button>

        </div>

        </form>

            </div>
        );
        }