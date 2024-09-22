// src/App.js
import React, { createContext, useState } from "react";
import './App.css';
import Header from "./components/Header";
import ClientPanel from "./pages/ClientPanel";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";
import Registration from "./pages/Registration";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./pages/LoginPage";
import {useEffect} from "react";

const router = createBrowserRouter([
    { path: "/", element: <LoginForm/> },
    { path: "/register", element: <Registration /> },
    {
        path: "/admin",
        element: (

                <AdminPanel />

        )
    },
    {
        path: "/client",
        element: (
            <ProtectedRoute>
                <ClientPanel />
            </ProtectedRoute>
        )
    },
]);

export const UserId = createContext({});

function App() {

    const [user, setUser] = useState({
        id: null,
        token: null,
    });
    const [isLoading, setIsLoading] = useState(true); // Состояние для загрузки
    const setAuth = (value) => {
        setIsLoading(true);
        setUser(value);
        if (value) {
            localStorage.setItem('user', JSON.stringify(value));
        } else {
            localStorage.removeItem('user');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true)
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return <div>Загрузка...</div>; // Здесь можно заменить на компоненты загрузки
    }
    return (
        <div className="App">
            <UserId.Provider value={{ user, setAuth }}>
                {<RouterProvider router={router} />}
            </UserId.Provider>
        </div>
    );
}

export default App;