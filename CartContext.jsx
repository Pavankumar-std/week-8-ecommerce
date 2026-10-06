import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

const CartContext = createContext();

const STORAGE_KEY = "pavan-ecommerce-cart";

function loadCart() {
    try {
        const savedCart =
            localStorage.getItem(STORAGE_KEY);

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    } catch (error) {
        console.error(
            "Failed to load cart:",
            error
        );

        return [];
    }
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(loadCart);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(cart)
        );
    }, [cart]);

    function addToCart(product) {
        setCart((currentCart) => {
            const existing = currentCart.find(
                item => item.id === product.id
            );

            if (existing) {
                return currentCart.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: 1
                }
            ];
        });
    }

    function increaseQuantity(id) {
        setCart(currentCart =>
            currentCart.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(id) {
        setCart(currentCart =>
            currentCart
                .map(item =>
                    item.id === id
                        ? {
                            ...item,
                            quantity:
                                item.quantity - 1
                        }
                        : item
                )
                .filter(
                    item => item.quantity > 0
                )
        );
    }

    function removeFromCart(id) {
        setCart(currentCart =>
            currentCart.filter(
                item => item.id !== id
            )
        );
    }

    function clearCart() {
        setCart([]);
    }

    const cartCount = useMemo(() => {
        return cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );
    }, [cart]);

    const cartTotal = useMemo(() => {
        return cart.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        );
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                cartTotal,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}