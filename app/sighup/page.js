"use client";

import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateAccount();
  };

  const CreateAccount = async () => {
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/`;
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
      toast.success("account created ");
      router.push("sighin");
    } else if (!response.ok) {
      toast.error("wrong credentials");
    }

    setIsLoading(false);
  };

  const handleGoogleSignIn = () => {};
  const handleFacebookSignIn = () => {};

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
              Create your account
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Or{" "}
              <Link href="/sighin" className="text-ink font-medium underline underline-offset-2">
                sign in to an existing account
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="eyebrow text-ink-soft block mb-1">
                  First name
                </label>
                <input
                  id="firstname"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="block w-full border-b border-ink-faint focus:border-ink bg-transparent py-2 text-sm focus:outline-none transition-colors"
                  placeholder="Jane"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastname" className="eyebrow text-ink-soft block mb-1">
                  Last name
                </label>
                <input
                  id="lastname"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="block w-full border-b border-ink-faint focus:border-ink bg-transparent py-2 text-sm focus:outline-none transition-colors"
                  placeholder="Doe"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
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
              <Link href="#" className="text-ink-soft hover:text-ink transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={false}
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
                "Create account"
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
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 border border-rule py-2.5 text-sm text-ink-soft hover:border-ink hover:text-ink transition-colors"
            >
              <FaGoogle /> Sign up with Google
            </button>
            <button
              onClick={handleFacebookSignIn}
              className="w-full flex items-center justify-center gap-2 border border-rule py-2.5 text-sm text-ink-soft hover:border-ink hover:text-ink transition-colors"
            >
              <FaFacebookF /> Sign up with Facebook
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SignIn;
