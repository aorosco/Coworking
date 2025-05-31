'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Space extends Model {
        static associate(models) {
            Space.hasMany(models.Booking, {
                foreignKey: 'spaceId',
                as: 'bookings'
            });
        }
    }

    Space.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('desk', 'meeting_room', 'private_office'),
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pricePerHour: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        amenities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        status: {
            type: DataTypes.ENUM('available', 'maintenance', 'occupied'),
            defaultValue: 'available'
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'Space',
    });

    return Space;
}; 