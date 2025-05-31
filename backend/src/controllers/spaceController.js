const { Space, Booking } = require('../models');
const { Op } = require('sequelize');

const createSpace = async (req, res) => {
    try {
        const space = await Space.create(req.body);
        res.status(201).json(space);
    } catch (error) {
        console.error('Error al crear espacio:', error);
        res.status(400).json({
            error: 'Error al crear el espacio',
            details: error.message
        });
    }
};

const getAllSpaces = async (req, res) => {
    try {
        const { type, capacity, startDate, endDate, page = 1, limit = 10 } = req.query;
        let whereClause = {};

        if (type) {
            whereClause.type = type;
        }

        if (capacity) {
            whereClause.capacity = {
                [Op.gte]: parseInt(capacity)
            };
        }

        const { count, rows: spaces } = await Space.findAndCountAll({
            where: whereClause,
            include: startDate && endDate ? [{
                model: Booking,
                as: 'bookings',
                where: {
                    [Op.or]: [
                        {
                            startTime: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                        {
                            endTime: {
                                [Op.between]: [startDate, endDate]
                            }
                        }
                    ]
                },
                required: false
            }] : [],
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['createdAt', 'DESC']]
        });

        // Filtrar espacios disponibles si se proporcionan fechas
        const availableSpaces = startDate && endDate
            ? spaces.filter(space => !space.bookings.length)
            : spaces;

        res.json({
            spaces: availableSpaces,
            totalCount: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error('Error al obtener espacios:', error);
        res.status(500).json({
            error: 'Error al obtener los espacios',
            details: error.message
        });
    }
};

const getSpaceById = async (req, res) => {
    try {
        const space = await Space.findByPk(req.params.id, {
            include: [{
                model: Booking,
                as: 'bookings',
                where: {
                    status: 'confirmed',
                    startTime: {
                        [Op.gte]: new Date()
                    }
                },
                required: false
            }]
        });

        if (!space) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }

        res.json(space);
    } catch (error) {
        console.error('Error al obtener espacio:', error);
        res.status(500).json({
            error: 'Error al obtener el espacio',
            details: error.message
        });
    }
};

const updateSpace = async (req, res) => {
    try {
        const space = await Space.findByPk(req.params.id);

        if (!space) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }

        await space.update(req.body);
        res.json(space);
    } catch (error) {
        console.error('Error al actualizar espacio:', error);
        res.status(400).json({
            error: 'Error al actualizar el espacio',
            details: error.message
        });
    }
};

const deleteSpace = async (req, res) => {
    try {
        const space = await Space.findByPk(req.params.id);

        if (!space) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }

        await space.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar espacio:', error);
        res.status(500).json({
            error: 'Error al eliminar el espacio',
            details: error.message
        });
    }
};

module.exports = {
    createSpace,
    getAllSpaces,
    getSpaceById,
    updateSpace,
    deleteSpace
}; 