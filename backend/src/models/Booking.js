'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            // Definir las asociaciones aquí
            Booking.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            Booking.belongsTo(models.Space, {
                foreignKey: 'spaceId',
                as: 'space'
            });
        }
    }

    Booking.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        spaceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Spaces',
                key: 'id'
            }
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
            defaultValue: 'pending'
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize,
        modelName: 'Booking',
    });

    return Booking;
}; 