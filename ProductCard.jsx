import React, { useState } from "react";

import {
    Link
} from "react-router";

import {
    useCart
} from "../../contexts/CartContext";

function ProductCard({ product }) {
    const { addToCart } = useCart();

    const [adding, setAdding] =
        useState(false);

    function handleAdd() {
        setAdding(true);

        addToCart(product);

        setTimeout(() => {
            setAdding(false);
        }, 500);
    }

    return (
        <article className="product-card">

            <Link
                to={`/product/${product.id}`}
                className="product-card__image"
            >
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                />
            </Link>

            <div className="product-card__content">

                <span className="product-card__category">
                    {product.category}
                </span>

                <Link
                    to={`/product/${product.id}`}
                >
                    <h3>
                        {product.title}
                    </h3>
                </Link>

                <div className="product-card__rating">
                    ⭐ {product.rating}
                </div>

                <div className="product-card__bottom">

                    <strong>
                        ${product.price.toFixed(2)}
                    </strong>

                    <button
                        className="button button--primary"
                        onClick={handleAdd}
                        disabled={adding}
                    >
                        {adding
                            ? "Added!"
                            : "Add to Cart"}
                    </button>

                </div>

            </div>

        </article>
    );
}

export default ProductCard;