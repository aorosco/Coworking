import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';

const Dashboard = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Mis Reservas</Typography>
                        {/* Aquí irá el contenido de las reservas */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Espacios Disponibles</Typography>
                        {/* Aquí irá el contenido de los espacios */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Actividad Reciente</Typography>
                        {/* Aquí irá el contenido de la actividad */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard; 