"use client";

import { useAppStore } from "@/store";
import Link from "next/link";
import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuthStore } from "@/store";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    if (response.ok) {
      const decoded = jwt.decode(result.access);
      const { email, first_name, last_name, user_id, admin } = decoded;
      login({
        email,
        first_name,
        last_name,
        user_id,
        refresh: result.refresh,
        admin,
      });
      router.push("/");
      if (!response.ok) {
        toast.error("account doesnt exist");
      }
    }
    toast.success("you have been logged in");

    setIsLoading(false);
  };

  const handleGoogleLogin = () => {};
  const handleFacebookLogin = () => {};

  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center bg-paper py-16 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <Link href="/">
              <h1 className="font-serif text-3xl font-semibold text-ink mb-1">
                Info<span className="text-signal">|</span>Stream
              </h1>
            </Link>
            <h2 className="font-serif text-xl text-ink mt-6">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Or{" "}
              <Link href="/sighup" className="text-ink font-medium underline underline-offset-2">
                create a new account
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="eyebrow text-ink-soft block mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full border-b border-ink-faint focus:border-ink bg-transparent py-2 text-sm focus:outline-none transition-colors"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="eyebrow text-ink-soft block mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full border-b border-ink-faint focus:border-ink bg-transparent py-2 text-sm focus:outline-none transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-soft">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4"
                />
                Remember me
              </label>
              <a href="#" className="text-ink-soft hover:text-ink transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center bg-ink text-paper py-3 text-xs font-mono uppercase tracking-widest2 hover:bg-masthead transition-colors"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-4 w-4 text-paper"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8zm10 4a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-rule" />
            <span className="eyebrow text-ink-faint">Or continue with</span>
            <div className="flex-1 h-px bg-rule" />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border border-rule py-2.5 text-sm text-ink-soft hover:border-ink hover:text-ink transition-colors"
            >
              <FaGoogle /> Log in with Google
            </button>
            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center gap-2 border border-rule py-2.5 text-sm text-ink-soft hover:border-ink hover:text-ink transition-colors"
            >
              <FaFacebookF /> Log in with Facebook
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Login;
