import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHospital } from "react-icons/fa";
import { login } from "../services/authService";
import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const patient = await login({
                email,
                password
            });

            localStorage.setItem(
                "patient",
                JSON.stringify(patient)
            );

            navigate("/dashboard");

        } catch {

            setError("Invalid email or password");

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="text-center">

                    <div className="logo-circle">

                        <FaHospital />

                    </div>

                    <h2 className="portal-title">

                        Zealthy

                    </h2>

                    <p className="portal-subtitle">

                        Patient Portal

                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">

                            Email

                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Password

                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    {
                        error &&

                        <div className="alert alert-danger">

                            {error}

                        </div>
                    }

                    <button
                        className="login-btn"
                    >

                        Login

                    </button>

                </form>

               

            </div>

        </div>

    );

}

export default Login;