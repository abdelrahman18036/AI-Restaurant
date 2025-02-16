import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api";

export default function Login() {
    const [username, setUsername] = useState(""); // using username for login
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login({ username, password });
        console.log(response);
        if (response.token) {
            // Optionally store the token in localStorage or context
            localStorage.setItem("token", response.token);
            navigate("/dashboard"); // redirect to the desired page after login
        } else {
            alert("Login failed: " + JSON.stringify(response));
        }
    };

    return (
        <>
            <div className="flex min-h-[100vh] flex-1 flex-col justify-center text-[#C19D60] px-6 py-12 lg:px-8 bg-[#292929]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-[#C19D60]">
                        Sign In
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#303030] px-3 py-1.5 text-sm font-semibold text-[#C19D60] shadow hover:cursor-pointer hover:bg-[#252525] focus:outline-2 focus:outline-offset-2"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        First Time?{" "}
                        <Link to="/register" className="font-semibold text-[#C19D60] hover:text-[#f8cb78]">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
