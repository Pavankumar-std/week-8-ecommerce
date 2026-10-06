import React, {
    useMemo,
    useState
} from "react";

import ProductList
    from "../components/ProductList/ProductList";

import useProducts
    from "../hooks/useProducts";

function Home() {

    const {
        products,
        categories,
        loading,
        error
    } = useProducts();

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("all");

    const [sort, setSort] =
        useState("default");

    const visibleProducts =
        useMemo(() => {

            let result = [...products];

            if (search.trim()) {

                result = result.filter(
                    product =>
                        product.title
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )
                );
            }

            if (category !== "all") {

                result = result.filter(
                    product =>
                        product.category === category
                );
            }

            if (sort === "low") {

                result.sort(
                    (a, b) =>
                        a.price - b.price
                );
            }

            if (sort === "high") {

                result.sort(
                    (a, b) =>
                        b.price - a.price
                );
            }

            if (sort === "rating") {

                result.sort(
                    (a, b) =>
                        b.rating - a.rating
                );
            }

            return result;

        }, [
            products,
            search,
            category,
            sort
        ]);

    return (
        <>

            <section className="hero">

                <div className="hero__content">

                    <span>
                        WELCOME TO SHOPSPHERE
                    </span>

                    <h1>
                        Discover Products
                        You'll Love
                    </h1>

                    <p>
                        A modern React e-commerce
                        experience with real product
                        data, persistent cart and
                        checkout simulation.
                    </p>

                </div>

            </section>

            <main className="container">

                <section className="catalog">

                    <div className="catalog__header">

                        <div>

                            <p className="section-label">
                                PRODUCT CATALOG
                            </p>

                            <h2>
                                Explore Products
                            </h2>

                        </div>

                        <p>
                            {visibleProducts.length}
                            {" "}
                            products
                        </p>

                    </div>

                    <div className="catalog__controls">

                        <input
                            type="search"
                            placeholder="Search products..."
                            value={search}
                            onChange={event =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            aria-label="Search products"
                        />

                        <select
                            value={category}
                            onChange={event =>
                                setCategory(
                                    event.target.value
                                )
                            }
                            aria-label="Filter by category"
                        >

                            <option value="all">
                                All Categories
                            </option>

                            {categories.map(item => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>

                        <select
                            value={sort}
                            onChange={event =>
                                setSort(
                                    event.target.value
                                )
                            }
                            aria-label="Sort products"
                        >

                            <option value="default">
                                Sort By
                            </option>

                            <option value="low">
                                Price: Low to High
                            </option>

                            <option value="high">
                                Price: High to Low
                            </option>

                            <option value="rating">
                                Highest Rated
                            </option>

                        </select>

                    </div>

                    {loading && (

                        <div className="loading">

                            <div className="spinner"></div>

                            <p>
                                Loading products...
                            </p>

                        </div>
                    )}

                    {error && (

                        <div className="error-box">
                            {error}
                        </div>

                    )}

                    {!loading &&
                        !error && (

                            <ProductList
                                products={
                                    visibleProducts
                                }
                            />

                        )}

                </section>

            </main>

        </>
    );
}

export default Home;