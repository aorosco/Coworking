import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getSpaces = async () => {
    try {
        const response = await axios.get(`${API_URL}/spaces`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los espacios');
    }
};

export const getSpaceById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/spaces/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener el espacio');
    }
};

export const createBooking = async (bookingData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${API_URL}/bookings`, bookingData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al crear la reserva');
    }
}; 