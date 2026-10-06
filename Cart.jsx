import React from "react";

import {
    Link
} from "react-router";

import {
    useCart
} from "../../contexts/CartContext";

function Cart() {

    const {
        cart,
        cartTotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    if (cart.length === 0) {

        return (
            <div className="empty-state">

                <div className="empty-state__icon">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some products to continue.
                </p>

                <Link
                    to="/"
                    className="button button--primary"
                >
                    Continue Shopping
                </Link>

            </div>
        );
    }

    return (
        <div className="cart-layout">

            <div className="cart-list">

                {cart.map(item => (

                    <article
                        key={item.id}
                        className="cart-item"
                    >

                        <img
                            src={item.thumbnail}
                            alt={item.title}
                        />

                        <div className="cart-item__info">

                            <h3>
                                {item.title}
                            </h3>

                            <p>
                                ${item.price.toFixed(2)}
                            </p>

                            <div className="quantity-controls">

                                <button
                                    onClick={() =>
                                        decreaseQuantity(
                                            item.id
                                        )
                                    }
                                >
                                    −
                                </button>

                                <span>
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(
                                            item.id
                                        )
                                    }
                                >
                                    +
                                </button>

                            </div>

                        </div>

                        <div className="cart-item__right">

                            <strong>
                                $
                                {(
                                    item.price *
                                    item.quantity
                                ).toFixed(2)}
                            </strong>

                            <button
                                className="remove-button"
                                onClick={() =>
                                    removeFromCart(
                                        item.id
                                    )
                                }
                            >
                                Remove
                            </button>

                        </div>

                    </article>

                ))}

            </div>

            <aside className="cart-summary">

                <h2>
                    Order Summary
                </h2>

                <div className="summary-row">
                    <span>Subtotal</span>

                    <strong>
                        ${cartTotal.toFixed(2)}
                    </strong>
                </div>

                <div className="summary-row">
                    <span>Shipping</span>

                    <strong>
                        Free
                    </strong>
                </div>

                <div className="summary-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${cartTotal.toFixed(2)}
                    </strong>

                </div>

                <Link
                    to="/checkout"
                    className="button button--primary button--full"
                >
                    Proceed to Checkout
                </Link>

            </aside>

        </div>
    );
}

export default Cart;