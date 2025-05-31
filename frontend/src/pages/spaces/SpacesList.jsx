import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import api from '../../services/api';

const SpacesList = () => {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSpaces();
    }, []);

    const fetchSpaces = async () => {
        try {
            const response = await api.get('/spaces');
            setSpaces(response.data.spaces || []);
            setError('');
        } catch (err) {
            console.error('Error al obtener espacios:', err);
            setError('Error al cargar los espacios. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Espacios Disponibles
            </Typography>

            {spaces.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    No hay espacios disponibles en este momento.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {spaces.map((space) => (
                        <Grid item xs={12} sm={6} md={4} key={space.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={space.images?.[0] || 'https://via.placeholder.com/300x200?text=Coworking+Space'}
                                    alt={space.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {space.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {space.description}
                                    </Typography>
                                    <Typography variant="body1" color="primary" gutterBottom>
                                        ${space.pricePerHour}/hora
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Capacidad: {space.capacity} personas
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            component={Link}
                                            to={`/bookings/create/${space.id}`}
                                            variant="contained"
                                            fullWidth
                                        >
                                            Reservar
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default SpacesList; 