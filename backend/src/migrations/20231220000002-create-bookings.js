'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                allowNull: false
            },
            spaceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Spaces',
                    key: 'id'
                },
                allowNull: false
            },
            startTime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            endTime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('pending', 'confirmed', 'cancelled'),
                defaultValue: 'pending'
            },
            totalPrice: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            notes: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Bookings');
    }
}; 