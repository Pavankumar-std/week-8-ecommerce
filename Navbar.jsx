import React from "react";
import {
    NavLink,
    Link
} from "react-router";

import {
    useCart
} from "../../contexts/CartContext";

import {
    useAuth
} from "../../contexts/AuthContext";

function Navbar() {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();

    return (
        <header className="navbar">

            <div className="navbar__inner">

                <Link
                    to="/"
                    className="navbar__logo"
                >
                    ShopSphere
                </Link>

                <nav className="navbar__links">

                    <NavLink to="/">
                        Home
                    </NavLink>

                    <NavLink to="/cart">
                        Cart ({cartCount})
                    </NavLink>

                    {user && (
                        <span className="navbar__user">
                            Hi, {user.name}
                        </span>
                    )}

                    {user ? (
                        <button
                            className="navbar__logout"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink to="/login">
                            Login
                        </NavLink>
                    )}

                </nav>

            </div>

        </header>
    );
}

export default Navbar;