const { body, param, query } = require('express-validator');

const registerValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Ingrese un email válido')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'),
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 2 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El nombre solo puede contener letras'),
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('El apellido es requerido')
        .isLength({ min: 2 })
        .withMessage('El apellido debe tener al menos 2 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El apellido solo puede contener letras')
];

const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Ingrese un email válido')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
];

const spaceValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del espacio es requerido')
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body('type')
        .isIn(['desk', 'meeting_room', 'private_office'])
        .withMessage('Tipo de espacio inválido'),
    body('capacity')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un número mayor a 0'),
    body('pricePerHour')
        .isFloat({ min: 0 })
        .withMessage('El precio por hora debe ser un número positivo'),
    body('amenities')
        .optional()
        .isArray()
        .withMessage('Las amenidades deben ser una lista'),
    body('status')
        .optional()
        .isIn(['available', 'maintenance', 'occupied'])
        .withMessage('Estado inválido')
];

const bookingValidation = [
    body('spaceId')
        .isInt({ min: 1 })
        .withMessage('ID de espacio inválido'),
    body('startTime')
        .isISO8601()
        .withMessage('Fecha de inicio inválida')
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error('La fecha de inicio debe ser futura');
            }
            return true;
        }),
    body('endTime')
        .isISO8601()
        .withMessage('Fecha de fin inválida')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startTime)) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            return true;
        })
];

const paginationValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El número de página debe ser mayor a 0'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('El límite debe estar entre 1 y 100')
];

const idParamValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID inválido')
];

module.exports = {
    registerValidation,
    loginValidation,
    spaceValidation,
    bookingValidation,
    paginationValidation,
    idParamValidation
}; 