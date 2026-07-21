import React from "react";

export default function VerifyOtp() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      <div className="w-[430px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-10">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Verify OTP
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Enter the OTP sent to your email.
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
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
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-500/30
          "
        />

        <button
          className="
            mt-6
            w-full
            bg-cyan-500
            hover:bg-cyan-600
            transition
            text-white
            font-semibold
            p-4
            rounded-xl
          "
        >
          Verify OTP
        </button>

      </div>

    </div>
  );
}