import { useState } from "react";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

function LoginModal() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  async function handleLogin() {
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    setError("");

const result = await login(email);

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827]/95 p-8 shadow-2xl">

      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold">
          PF
        </div>

        <h1 className="text-3xl font-bold">
          PromptForge
        </h1>

        <p className="mt-2 text-gray-400">
          Enter your email to continue
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#1A2235] px-4">

        <div className="flex items-center">

          <FiMail className="text-gray-500" />

          <input
            className="w-full bg-transparent px-3 py-4 outline-none"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Continue"}

        {!loading && <FiArrowRight />}
      </button>

      <div className="mt-6 border-t border-white/10 pt-6 text-center">

        <p className="text-sm text-gray-400">
          New user?
        </p>

        <p className="mt-1 font-semibold text-indigo-400">
          Ask admin@gmail.com
        </p>

      </div>

    </div>
  );
}

export default LoginModal;