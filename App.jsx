import React, {
    lazy,
    Suspense
} from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router";

import Navbar
    from "./components/Navbar/Navbar";

import {
    CartProvider
} from "./contexts/CartContext";

import {
    AuthProvider
} from "./contexts/AuthContext";

import "./styles/global.css";

const Home =
    lazy(() => import("./pages/Home"));

const ProductDetail =
    lazy(() => import("./pages/ProductDetail"));

const CartPage =
    lazy(() => import("./pages/CartPage"));

const CheckoutPage =
    lazy(() => import("./pages/CheckoutPage"));

const Login =
    lazy(() => import("./pages/Login"));

const Register =
    lazy(() => import("./pages/Register"));

const NotFound =
    lazy(() => import("./pages/NotFound"));

function Loading() {

    return (
        <div className="loading page-space">

            <div className="spinner"></div>

            <p>
                Loading page...
            </p>

        </div>
    );
}

function App() {

    return (
        <BrowserRouter>

            <AuthProvider>

                <CartProvider>

                    <Navbar />

                    <Suspense
                        fallback={
                            <Loading />
                        }
                    >

                        <Routes>

                            <Route
                                path="/"
                                element={<Home />}
                            />

                            <Route
                                path="/product/:id"
                                element={
                                    <ProductDetail />
                                }
                            />

                            <Route
                                path="/cart"
                                element={
                                    <CartPage />
                                }
                            />

                            <Route
                                path="/checkout"
                                element={
                                    <CheckoutPage />
                                }
                            />

                            <Route
                                path="/login"
                                element={
                                    <Login />
                                }
                            />

                            <Route
                                path="/register"
                                element={
                                    <Register />
                                }
                            />

                            <Route
                                path="*"
                                element={
                                    <NotFound />
                                }
                            />

                        </Routes>

                    </Suspense>

                    <footer className="footer">

                        <h3>
                            ShopSphere
                        </h3>

                        <p>
                            Advanced React
                            E-Commerce
                            Capstone Project
                        </p>

                        <p>
                            © 2026 Pavan Kumar Katkuri
                        </p>

                    </footer>

                </CartProvider>

            </AuthProvider>

        </BrowserRouter>
    );
}

export default App;