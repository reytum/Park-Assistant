import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelizeConnection from "../config";
import Floor from "./Floor";
import ParkingSlot from "./ParkingSlot";

class ParkingLot extends Model<InferAttributes<ParkingLot>, InferCreationAttributes<ParkingLot>> {
    declare id: CreationOptional<number>;
    declare name: string | null;
    declare stateCode: string;
    declare cityName: string;
    declare zipcode: string;
    declare type: string;
    declare latitude: number;
    declare longitude: number;
    declare countryCode: string;
    declare registrationId: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
}

ParkingLot.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    stateCode: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    cityName: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    zipcode: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    type: {
        type: DataTypes.STRING(255),
        defaultValue: "mall"
    },
    latitude: {
        type: DataTypes.DECIMAL(8, 6),
        defaultValue: null
    },
    longitude: {
        type: DataTypes.DECIMAL(9, 6),
        defaultValue: null
    },
    countryCode: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    registrationId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},
    {
        indexes: [{
            unique: true,
            fields: ['registrationId']
        }],
        sequelize: sequelizeConnection,
        paranoid: true,
        tableName: "ParkingLots"
    })

ParkingLot.hasMany(Floor, {
    sourceKey: 'id',
    foreignKey: 'parkingLotId',
    as: 'parkingLots'
})

ParkingSlot.belongsTo(Floor, { targetKey: "id" });

Floor.hasMany(ParkingSlot, {
    sourceKey: 'id',
    foreignKey: 'floorId',
    as: 'parkingSlots'
})

Floor.belongsTo(ParkingLot, { targetKey: "id" });

export default ParkingLot