import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import PrivateRoute from './components/PrivateRoute';
import BookingCreate from './pages/bookings/BookingCreate';
import { AuthProvider } from './contexts/AuthContext';

// Importar páginas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SpacesList from './pages/spaces/SpacesList';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography
                                    variant="h6"
                                    component={Link}
                                    to="/"
                                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                                >
                                    Coworking Space
                                </Typography>
                                <Button color="inherit" component={Link} to="/spaces">
                                    Espacios
                                </Button>
                                <Button color="inherit" component={Link} to="/login">
                                    Iniciar Sesión
                                </Button>
                                <Button color="inherit" component={Link} to="/register">
                                    Registrarse
                                </Button>
                            </Toolbar>
                        </AppBar>

                        <Box component="main" sx={{ flexGrow: 1 }}>
                            <Routes>
                                <Route path="/" element={
                                    <Container sx={{ mt: 8, textAlign: 'center' }}>
                                        <Typography variant="h2" component="h1" gutterBottom>
                                            Sistema de Reservas Coworking
                                        </Typography>
                                        <Typography variant="h5" component="p" gutterBottom>
                                            ¡Bienvenido al sistema!
                                        </Typography>
                                        <Box sx={{ mt: 4 }}>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                component={Link}
                                                to="/spaces"
                                                sx={{ mr: 2 }}
                                            >
                                                Ver Espacios
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="large"
                                                component={Link}
                                                to="/login"
                                            >
                                                Iniciar Sesión
                                            </Button>
                                        </Box>
                                    </Container>
                                } />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/spaces" element={<SpacesList />} />
                                <Route
                                    path="/bookings/create/:spaceId"
                                    element={
                                        <PrivateRoute>
                                            <BookingCreate />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </Box>

                        <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main', color: 'white', mt: 'auto' }}>
                            <Container maxWidth="sm">
                                <Typography variant="body1" align="center">
                                    © {new Date().getFullYear()} Sistema de Reservas Coworking
                                </Typography>
                            </Container>
                        </Box>
                    </Box>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App; 