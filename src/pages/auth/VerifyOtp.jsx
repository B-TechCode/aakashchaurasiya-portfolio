import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { verifyOtpApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function VerifyOtp() {

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e) => {

    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Please login again.");
      navigate("/admin/login");
      return;
    }

    try {

      setLoading(true);

      const response = await verifyOtpApi({
        email,
        otp,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      login(response.data.token);

      toast.success(response.message);

      navigate("/admin/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Invalid OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      <form
        onSubmit={handleVerifyOtp}
        className="w-[430px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-10"
      >

        <h1 className="text-3xl font-bold text-white text-center mb-4">
          Verify OTP
        </h1>

        <p className="text-slate-400 text-center mb-8">

          OTP sent to

          <br />

          <span className="text-cyan-400 font-medium">

            {email}

          </span>

        </p>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-900
              border
              border-slate-700
              text-white
              text-center
              text-2xl
              tracking-[10px]
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
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </div>

      </form>

    </div>
  );
}