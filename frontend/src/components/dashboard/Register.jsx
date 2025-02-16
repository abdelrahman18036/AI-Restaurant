import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      alert("Passwords do not match");
      return;
    }
    // Use the "username", "email" and "password" fields.
    const response = await register({ username, email, password });
    console.log(response);
    if (response.token) {
      // Redirect to login after successful registration
      navigate("/login");
    } else {
      alert("Registration failed: " + JSON.stringify(response));
    }
  };

  return (
    <>
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center text-[#C19D60] px-6 py-12 lg:px-8 bg-[#292929]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-[#C19D60]">
            Create Your Account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#C19D60]">
                Your Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#000] font-semibold outline-gray-300 placeholder:text-gray-400 focus:outline-[#C19D60]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#C19D60]">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#000] font-semibold outline-gray-300 placeholder:text-gray-400 focus:outline-[#C19D60]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#C19D60]">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#000] font-semibold outline-gray-300 placeholder:text-gray-400 focus:outline-[#C19D60]"
                />
              </div>
            </div>
            <div className="password">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#C19D60]">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#000] font-semibold outline-gray-300 placeholder:text-gray-400 focus:outline-[#C19D60]"
                />
              </div>
            </div>
            <div className="repassword">
              <div className="flex items-center justify-between">
                <label htmlFor="repassword" className="block text-sm font-medium text-[#C19D60]">
                  RePassword
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="repassword"
                  name="repassword"
                  type="password"
                  required
                  autoComplete="repassword"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#000] font-semibold outline-gray-300 placeholder:text-gray-400 focus:outline-[#C19D60]"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#303030] px-3 py-1.5 text-sm font-semibold text-[#C19D60] shadow hover:cursor-pointer hover:bg-[#252525] focus:outline-2 focus:outline-offset-2"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link to="/login" className="font-semibold text-[#C19D60] hover:text-[#f8cb78]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
