const express = require('express');
const router = express.Router();

// Importar rutas
const authRoutes = require('./auth');
const spaceRoutes = require('./spaces');
const bookingRoutes = require('./bookings');
const paymentRoutes = require('./payments');

// Definir rutas
router.use('/auth', authRoutes);
router.use('/spaces', spaceRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);

// Ruta de prueba
router.get('/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

module.exports = router; 