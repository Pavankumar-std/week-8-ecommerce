import { useEffect, useState } from "react";

import {
    getProducts,
    getCategories
} from "../services/api";

function useProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadProducts() {
            try {
                setLoading(true);
                setError("");

                const [productData, categoryData] =
                    await Promise.all([
                        getProducts(),
                        getCategories()
                    ]);

                if (active) {
                    setProducts(productData.products);
                    setCategories(categoryData);
                }
            } catch (err) {
                if (active) {
                    setError(
                        err.message ||
                        "Unable to load products."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadProducts();

        return () => {
            active = false;
        };
    }, []);

    return {
        products,
        categories,
        loading,
        error
    };
}

export default useProducts;