const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({
                error: 'Autenticación requerida',
                message: 'No se proporcionó el token de autenticación'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                error: 'Autenticación requerida',
                message: 'Token inválido'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({
                where: {
                    id: decoded.id,
                    isActive: true
                },
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                throw new Error('Usuario no encontrado o inactivo');
            }

            req.token = token;
            req.user = user;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    error: 'Token expirado',
                    message: 'Su sesión ha expirado, por favor inicie sesión nuevamente'
                });
            }
            throw err;
        }
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(401).json({
            error: 'Por favor autentíquese',
            message: error.message
        });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                error: 'Autenticación requerida',
                message: 'Usuario no autenticado'
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                error: 'Acceso denegado',
                message: 'No tiene permisos para realizar esta acción'
            });
        }
        next();
    } catch (error) {
        console.error('Error en verificación de admin:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Error al verificar permisos de administrador'
        });
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    error: 'Autenticación requerida',
                    message: 'Usuario no autenticado'
                });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    error: 'Acceso denegado',
                    message: 'No tiene los permisos necesarios para esta acción'
                });
            }
            next();
        } catch (error) {
            console.error('Error en verificación de rol:', error);
            res.status(500).json({
                error: 'Error interno del servidor',
                message: 'Error al verificar permisos de usuario'
            });
        }
    };
};

module.exports = {
    auth,
    isAdmin,
    checkRole
}; 