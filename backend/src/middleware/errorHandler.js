const errorHandler = (err, req, res, next) => {
    // Log del error
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query,
        timestamp: new Date().toISOString()
    });

    // Errores de Sequelize
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            details: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            error: 'Error de duplicación',
            message: 'Ya existe un registro con estos datos',
            details: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        });
    }

    // Errores de JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Token inválido',
            message: 'El token proporcionado no es válido'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Token expirado',
            message: 'Su sesión ha expirado, por favor inicie sesión nuevamente'
        });
    }

    // Error personalizado
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
            details: err.details
        });
    }

    // Error 404
    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            error: 'No encontrado',
            message: err.message || 'El recurso solicitado no existe'
        });
    }

    // Error de validación
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            message: err.message,
            details: err.details
        });
    }

    // Error por defecto
    res.status(500).json({
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'production'
            ? 'Ha ocurrido un error inesperado'
            : err.message
    });
};

class AppError extends Error {
    constructor(message, statusCode, details = null) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Recurso no encontrado') {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

class ValidationError extends AppError {
    constructor(message, details = null) {
        super(message, 400, details);
        this.name = 'ValidationError';
    }
}

module.exports = {
    errorHandler,
    AppError,
    NotFoundError,
    ValidationError
}; 