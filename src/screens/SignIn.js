import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Example() {
  const [data, setData] = useState({ email: "", password: "" }); //Codetopass44
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateData = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate the 'email' field
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email address";
    }

    // Validate the 'password' field (assuming it's a non-null value)
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    }

    // Return the validation result
    return errors;
  };

  const signIn = async (e) => {
    e.preventDefault();
    const validationErrors = validateData();

    if (Object.values(validationErrors).every((el) => el === "")) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        // User successfully signed in
        navigate("/profil/dashboard");
      } catch (error) {
        console.error("Authentication error:", error);
        if (error.code === "auth/invalid-login-credentials") {
          // Display an error message to the user
          alert("Invalid email or password. Please try again.");
        } else {
          // Handle other authentication errors
          alert("An error occurred during sign-in. Please try again later.");
        }
      }
    } else {
      setErrors({ ...validationErrors }); // Update the state to display the errors
    }
  };

  return (
    <>
      <div className="flex items-center min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-50  h-screen w-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Disney_Store_logo.svg/800px-Disney_Store_logo.svg.png"
            alt="Disney Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-teal-400">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value }) &
                    setErrors({ ...errors, email: "" })
                  }
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className="error text-rose-600">{errors.email}</span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-teal-400 hover:text-lime-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value }) &
                    setErrors({ ...errors, password: "" })
                  }
                  className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span className="error text-rose-600">{errors.password}</span>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={signIn}
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-teal-400 to-lime-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-60"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
