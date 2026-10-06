import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

const USERS_KEY = "pavan-ecommerce-users";
const USER_KEY = "pavan-ecommerce-user";

function getUsers() {
    try {
        const savedUsers =
            localStorage.getItem(USERS_KEY);

        if (savedUsers) {
            return JSON.parse(savedUsers);
        }
    } catch (error) {
        console.error(error);
    }

    return [
        {
            name: "Demo User",
            email: "demo@example.com",
            password: "demo123"
        }
    ];
}

function getCurrentUser() {
    try {
        const savedUser =
            localStorage.getItem(USER_KEY);

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] =
        useState(getCurrentUser);

    useEffect(() => {
        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(getUsers())
        );
    }, []);

    async function login(email, password) {
        const users = getUsers();

        const existingUser = users.find(
            existing =>
                existing.email === email &&
                existing.password === password
        );

        if (!existingUser) {
            throw new Error(
                "Invalid email or password."
            );
        }

        const loggedInUser = {
            name: existingUser.name,
            email: existingUser.email
        };

        localStorage.setItem(
            USER_KEY,
            JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);
    }

    async function register(
        name,
        email,
        password
    ) {
        const users = getUsers();

        const exists = users.some(
            existing =>
                existing.email === email
        );

        if (exists) {
            throw new Error(
                "An account with this email already exists."
            );
        }

        const newUser = {
            name,
            email,
            password
        };

        const updatedUsers = [
            ...users,
            newUser
        ];

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(updatedUsers)
        );

        const loggedInUser = {
            name,
            email
        };

        localStorage.setItem(
            USER_KEY,
            JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);
    }

    function logout() {
        localStorage.removeItem(USER_KEY);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}