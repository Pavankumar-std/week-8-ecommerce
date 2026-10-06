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

function Register() {

    const {
        register
    } = useAuth();

    const navigate =
        useNavigate();

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            password: ""
        });

    const [error, setError] =
        useState("");

    function handleChange(event) {

        setForm(current => ({
            ...current,
            [event.target.name]:
                event.target.value
        }));
    }

    async function handleSubmit(event) {

        event.preventDefault();

        if (form.name.trim().length < 2) {

            setError(
                "Enter a valid name."
            );

            return;
        }

        if (!form.email.includes("@")) {

            setError(
                "Enter a valid email."
            );

            return;
        }

        if (form.password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }

        try {

            setError("");

            await register(
                form.name,
                form.email,
                form.password
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
                        JOIN SHOPSPHERE
                    </p>

                    <h1>
                        Register
                    </h1>

                </div>

                {error && (

                    <div className="error-box">
                        {error}
                    </div>

                )}

                <div className="form-group">

                    <label htmlFor="name">
                        Full Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                </div>

                <button
                    type="submit"
                    className="button button--primary button--full"
                >
                    Create Account
                </button>

                <p className="auth-card__footer">

                    Already have an account?
                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </form>

        </main>
    );
}

export default Register;