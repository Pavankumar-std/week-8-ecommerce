import React, {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router";

import {
    useCart
} from "../../contexts/CartContext";

function Checkout() {

    const {
        cart,
        cartTotal,
        clearCart
    } = useCart();

    const navigate =
        useNavigate();

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            address: "",
            city: "",
            pincode: "",
            phone: ""
        });

    const [errors, setErrors] =
        useState({});

    const [submitted, setSubmitted] =
        useState(false);

    function handleChange(event) {

        const {
            name,
            value
        } = event.target;

        setForm(current => ({
            ...current,
            [name]: value
        }));
    }

    function validate() {

        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name =
                "Name is required.";
        }

        if (
            !form.email.includes("@") ||
            !form.email.includes(".")
        ) {
            newErrors.email =
                "Enter a valid email.";
        }

        if (
            form.address.trim().length < 5
        ) {
            newErrors.address =
                "Enter a valid address.";
        }

        if (
            form.city.trim().length < 2
        ) {
            newErrors.city =
                "Enter a valid city.";
        }

        if (
            !/^\d{6}$/.test(
                form.pincode
            )
        ) {
            newErrors.pincode =
                "Enter a valid 6-digit pincode.";
        }

        if (
            !/^\d{10}$/.test(
                form.phone
            )
        ) {
            newErrors.phone =
                "Enter a valid 10-digit phone number.";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );
    }

    function handleSubmit(event) {

        event.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitted(true);

        clearCart();
    }

    if (cart.length === 0 && !submitted) {

        return (
            <div className="empty-state">

                <h2>
                    Your cart is empty
                </h2>

                <Link
                    to="/cart"
                    className="button button--primary"
                >
                    Back to Cart
                </Link>

            </div>
        );
    }

    if (submitted) {

        return (
            <section className="success-page">

                <div className="success-page__icon">
                    ✅
                </div>

                <h1>
                    Order Placed Successfully!
                </h1>

                <p>
                    Thank you for shopping with ShopSphere.
                </p>

                <button
                    className="button button--primary"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Continue Shopping
                </button>

            </section>
        );
    }

    return (
        <div className="checkout-layout">

            <form
                className="checkout-form"
                onSubmit={handleSubmit}
            >

                <h2>
                    Delivery Information
                </h2>

                <div className="form-group">

                    <label htmlFor="name">
                        Full Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                    />

                    {errors.name && (
                        <small>
                            {errors.name}
                        </small>
                    )}

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
                        placeholder="you@example.com"
                    />

                    {errors.email && (
                        <small>
                            {errors.email}
                        </small>
                    )}

                </div>

                <div className="form-group">

                    <label htmlFor="address">
                        Address
                    </label>

                    <textarea
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Delivery address"
                        rows="4"
                    />

                    {errors.address && (
                        <small>
                            {errors.address}
                        </small>
                    )}

                </div>

                <div className="form-grid">

                    <div className="form-group">

                        <label htmlFor="city">
                            City
                        </label>

                        <input
                            id="city"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                        />

                        {errors.city && (
                            <small>
                                {errors.city}
                            </small>
                        )}

                    </div>

                    <div className="form-group">

                        <label htmlFor="pincode">
                            Pincode
                        </label>

                        <input
                            id="pincode"
                            name="pincode"
                            value={form.pincode}
                            onChange={handleChange}
                            maxLength="6"
                        />

                        {errors.pincode && (
                            <small>
                                {errors.pincode}
                            </small>
                        )}

                    </div>

                </div>

                <div className="form-group">

                    <label htmlFor="phone">
                        Phone
                    </label>

                    <input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        maxLength="10"
                    />

                    {errors.phone && (
                        <small>
                            {errors.phone}
                        </small>
                    )}

                </div>

                <button
                    type="submit"
                    className="button button--primary button--full"
                >
                    Place Order
                </button>

            </form>

            <aside className="cart-summary">

                <h2>
                    Order Summary
                </h2>

                {cart.map(item => (

                    <div
                        key={item.id}
                        className="summary-row"
                    >

                        <span>
                            {item.title} × {item.quantity}
                        </span>

                        <strong>
                            $
                            {(
                                item.price *
                                item.quantity
                            ).toFixed(2)}
                        </strong>

                    </div>

                ))}

                <div className="summary-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${cartTotal.toFixed(2)}
                    </strong>

                </div>

            </aside>

        </div>
    );
}

export default Checkout;