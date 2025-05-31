import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 'bold'
                        }}
                    >
                        Coworking Space
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/spaces"
                        >
                            Espacios
                        </Button>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/login"
                        >
                            Iniciar Sesión
                        </Button>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/register"
                            variant="outlined"
                            sx={{ borderColor: 'white' }}
                        >
                            Registrarse
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar; 