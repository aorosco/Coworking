import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default'
        }}>
            <Navbar />
            <Box component="main" sx={{
                flexGrow: 1,
                width: '100%',
                bgcolor: 'background.default',
                color: 'text.primary'
            }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout; 