import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    TextField,
    Button,
    Alert,
    CircularProgress
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getSpaceById, createBooking } from '../../services/spaceService';

const BookingCreate = () => {
    const { spaceId } = useParams();
    const navigate = useNavigate();
    const [space, setSpace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookingData, setBookingData] = useState({
        startTime: null,
        endTime: null,
        notes: ''
    });

    useEffect(() => {
        loadSpace();
    }, [spaceId]);

    const loadSpace = async () => {
        try {
            const data = await getSpaceById(spaceId);
            setSpace(data);
        } catch (err) {
            setError('Error al cargar el espacio');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createBooking({
                spaceId,
                ...bookingData
            });
            navigate('/dashboard');
        } catch (err) {
            setError('Error al crear la reserva');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container sx={{ py: 8, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 8 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography component="h1" variant="h5" gutterBottom>
                    Reservar Espacio
                </Typography>
                {space && (
                    <Typography variant="h6" color="primary" gutterBottom>
                        {space.name}
                    </Typography>
                )}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ mb: 2 }}>
                            <DateTimePicker
                                label="Fecha y hora de inicio"
                                value={bookingData.startTime}
                                onChange={(newValue) => setBookingData({ ...bookingData, startTime: newValue })}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <DateTimePicker
                                label="Fecha y hora de fin"
                                value={bookingData.endTime}
                                onChange={(newValue) => setBookingData({ ...bookingData, endTime: newValue })}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Notas adicionales"
                            value={bookingData.notes}
                            onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Confirmar Reserva'}
                        </Button>
                    </form>
                </LocalizationProvider>
            </Paper>
        </Container>
    );
};

export default BookingCreate; 