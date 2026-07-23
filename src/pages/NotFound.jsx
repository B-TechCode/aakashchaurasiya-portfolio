import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-300 flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Error Code */}
        <h1 className="font-display text-8xl md:text-9xl font-bold gradient-text">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl md:text-4xl font-display font-bold text-white">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-5 text-slate-400 leading-relaxed max-w-lg mx-auto">
          The page you're looking for doesn't exist, may have been moved,
          or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiHome size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn-ghost inline-flex items-center gap-2"
          >
            <FiArrowLeft size={18} />
            Go Back
          </button>

        </div>

        {/* Footer Text */}
        <p className="mt-12 text-xs text-slate-500 font-mono">
          Error 404 • Resource Not Found
        </p>

      </motion.div>
    </div>
  );
}
