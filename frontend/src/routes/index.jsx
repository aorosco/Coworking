import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Páginas públicas
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import SpacesList from '../pages/spaces/SpacesList';
import SpaceDetails from '../pages/spaces/SpaceDetails';
import BookingCreate from '../pages/bookings/BookingCreate';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas privadas */}
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />
            <Route path="/spaces" element={
                <PrivateRoute>
                    <SpacesList />
                </PrivateRoute>
            } />
            <Route path="/spaces/:id" element={
                <PrivateRoute>
                    <SpaceDetails />
                </PrivateRoute>
            } />
            <Route path="/bookings/create" element={
                <PrivateRoute>
                    <BookingCreate />
                </PrivateRoute>
            } />
        </Routes>
    );
};

export default AppRoutes; 