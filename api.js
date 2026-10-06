const BASE_URL = "https://dummyjson.com";

export async function getProducts() {
    const response = await fetch(
        `${BASE_URL}/products?limit=0`
    );

    if (!response.ok) {
        throw new Error("Failed to load products.");
    }

    return response.json();
}

export async function getProductById(id) {
    const response = await fetch(
        `${BASE_URL}/products/${id}`
    );

    if (!response.ok) {
        throw new Error("Product not found.");
    }

    return response.json();
}

export async function getCategories() {
    const response = await fetch(
        `${BASE_URL}/products/category-list`
    );

    if (!response.ok) {
        throw new Error("Failed to load categories.");
    }

    return response.json();
}

export async function searchProducts(query) {
    const response = await fetch(
        `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Search failed.");
    }

    return response.json();
}