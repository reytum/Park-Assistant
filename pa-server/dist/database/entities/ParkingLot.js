"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const Floor_1 = __importDefault(require("./Floor"));
const ParkingSlot_1 = __importDefault(require("./ParkingSlot"));
class ParkingLot extends sequelize_1.Model {
}
ParkingLot.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    stateCode: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: null
    },
    cityName: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: null
    },
    zipcode: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: null
    },
    type: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: "mall"
    },
    latitude: {
        type: sequelize_1.DataTypes.DECIMAL(8, 6),
        defaultValue: null
    },
    longitude: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
        defaultValue: null
    },
    countryCode: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: null
    },
    registrationId: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    deletedAt: sequelize_1.DataTypes.DATE
}, {
    indexes: [{
            unique: true,
            fields: ['registrationId']
        }],
    sequelize: config_1.default,
    paranoid: true,
    tableName: "ParkingLots"
});
ParkingLot.hasMany(Floor_1.default, {
    sourceKey: 'id',
    foreignKey: 'parkingLotId',
    as: 'parkingLots'
});
ParkingSlot_1.default.belongsTo(Floor_1.default, { targetKey: "id" });
Floor_1.default.hasMany(ParkingSlot_1.default, {
    sourceKey: 'id',
    foreignKey: 'floorId',
    as: 'parkingSlots'
});
Floor_1.default.belongsTo(ParkingLot, { targetKey: "id" });
exports.default = ParkingLot;
//# sourceMappingURL=ParkingLot.js.map