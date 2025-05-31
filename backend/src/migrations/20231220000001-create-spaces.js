'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Spaces', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM('desk', 'meeting_room', 'private_office'),
                allowNull: false
            },
            capacity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            pricePerHour: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT
            },
            amenities: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: []
            },
            status: {
                type: Sequelize.ENUM('available', 'maintenance', 'occupied'),
                defaultValue
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Spaces');
    }
}; 