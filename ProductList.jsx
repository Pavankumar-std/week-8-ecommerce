import React from "react";

import ProductCard
    from "../ProductCard/ProductCard";

function ProductList({ products }) {

    if (products.length === 0) {
        return (
            <div className="empty-state">

                <div className="empty-state__icon">
                    🔎
                </div>

                <h3>
                    No products found
                </h3>

                <p>
                    Try a different search or category.
                </p>

            </div>
        );
    }

    return (
        <div className="products-grid">

            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}

        </div>
    );
}

export default ProductList;