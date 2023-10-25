"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
var SlotSize;
(function (SlotSize) {
    SlotSize[SlotSize["Small"] = 1] = "Small";
    SlotSize[SlotSize["Medium"] = 2] = "Medium";
    SlotSize[SlotSize["Large"] = 3] = "Large";
    SlotSize[SlotSize["ExtraLarge"] = 4] = "ExtraLarge";
})(SlotSize || (SlotSize = {}));
;
class ParkingSlot extends sequelize_1.Model {
}
ParkingSlot.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: null
    },
    vehicleNumber: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: null
    },
    size: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    deletedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize: config_1.default,
    paranoid: true,
    tableName: "ParkingSlots"
});
exports.default = ParkingSlot;
//# sourceMappingURL=ParkingSlot.js.map