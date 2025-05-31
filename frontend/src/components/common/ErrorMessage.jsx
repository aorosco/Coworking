import React from 'react';
import { Alert } from '@mui/material';

const ErrorMessage = ({ message }) => {
    return (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {message}
        </Alert>
    );
};

export default ErrorMessage; 