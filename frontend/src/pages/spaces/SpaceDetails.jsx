import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    Paper,
    Box,
    Button,
    Chip
} from '@mui/material';
import { useQuery } from 'react-query';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const SpaceDetails = () => {
    const { id } = useParams();

    const { data: space, isLoading, error } = useQuery(
        ['space', id],
        async () => {
            const response = await api.get(`/spaces/${id}`);
            return response.data;
        }
    );

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message="Error al cargar los detalles del espacio" />;

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            {space?.name}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Chip
                                label={space?.type}
                                color="primary"
                                sx={{ mr: 1 }}
                            />
                            <Chip
                                label={`Capacidad: ${space?.capacity} personas`}
                                variant="outlined"
                            />
                        </Box>
                        <Typography variant="body1" paragraph>
                            {space?.description}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Amenidades:
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            {space?.amenities?.map((amenity, index) => (
                                <Chip
                                    key={index}
                                    label={amenity}
                                    sx={{ mr: 1, mb: 1 }}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                        <Typography variant="h6" color="primary" gutterBottom>
                            ${space?.pricePerHour} / hora
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            href={`/bookings/create?spaceId=${id}`}
                            sx={{ mt: 2 }}
                        >
                            Reservar Ahora
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: 300,
                                bgcolor: 'grey.200',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mb: 2
                            }}
                        >
                            {space?.images?.[0] ? (
                                <img
                                    src={space.images[0]}
                                    alt={space.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <Typography variant="body1" color="text.secondary">
                                    No hay imagen disponible
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default SpaceDetails; 