import React, {
    useEffect,
    useState
} from "react";

import {
    Link,
    useParams
} from "react-router";

import {
    getProductById
} from "../services/api";

import {
    useCart
} from "../contexts/CartContext";

function ProductDetail() {

    const {
        id
    } = useParams();

    const {
        addToCart
    } = useCart();

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function loadProduct() {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getProductById(id);

                setProduct(data);

            } catch (err) {

                setError(
                    err.message ||
                    "Unable to load product."
                );

            } finally {

                setLoading(false);
            }
        }

        loadProduct();

    }, [id]);

    if (loading) {

        return (
            <div className="loading page-space">

                <div className="spinner"></div>

                <p>
                    Loading product...
                </p>

            </div>
        );
    }

    if (error) {

        return (
            <div className="container page-space">

                <div className="error-box">
                    {error}
                </div>

            </div>
        );
    }

    return (
        <main className="container page-space">

            <Link
                to="/"
                className="back-link"
            >
                ← Back to Products
            </Link>

            <section className="product-detail">

                <div className="product-detail__image">

                    <img
                        src={
                            product.images?.[0] ||
                            product.thumbnail
                        }
                        alt={product.title}
                    />

                </div>

                <div className="product-detail__content">

                    <span className="product-card__category">
                        {product.category}
                    </span>

                    <h1>
                        {product.title}
                    </h1>

                    <div className="product-card__rating">
                        ⭐ {product.rating} / 5
                    </div>

                    <p className="product-detail__description">
                        {product.description}
                    </p>

                    <div className="product-detail__price">
                        ${product.price.toFixed(2)}
                    </div>

                    <p>
                        Stock:
                        {" "}
                        <strong>
                            {product.stock}
                        </strong>
                    </p>

                    <button
                        className="button button--primary"
                        onClick={() =>
                            addToCart(product)
                        }
                    >
                        Add to Cart
                    </button>

                </div>

            </section>

        </main>
    );
}

export default ProductDetail;