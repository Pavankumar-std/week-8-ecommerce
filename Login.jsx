import React, {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router";

import {
    useAuth
} from "../contexts/AuthContext";

function Login() {

    const {
        login
    } = useAuth();

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("demo@example.com");

    const [password, setPassword] =
        useState("demo123");

    const [error, setError] =
        useState("");

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setError("");

            await login(
                email,
                password
            );

            navigate("/");

        } catch (err) {

            setError(err.message);
        }
    }

    return (
        <main className="container auth-page">

            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >

                <div className="section-heading">

                    <p className="section-label">
                        WELCOME BACK
                    </p>

                    <h1>
                        Login
                    </h1>

                </div>

                {error && (

                    <div className="error-box">
                        {error}
                    </div>

                )}

                <div className="form-group">

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={event =>
                            setEmail(
                                event.target.value
                            )
                        }
                        required
                    />

                </div>

                <div className="form-group">

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={event =>
                            setPassword(
                                event.target.value
                            )
                        }
                        required
                    />

                </div>

                <button
                    type="submit"
                    className="button button--primary button--full"
                >
                    Login
                </button>

                <p className="auth-card__footer">

                    New customer?
                    {" "}

                    <Link to="/register">
                        Create an account
                    </Link>

                </p>

                <p className="demo-info">
                    Demo:
                    demo@example.com /
                    demo123
                </p>

            </form>

        </main>
    );
}

export default Login;