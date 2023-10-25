import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import sequelizeConnection from "../config";
import Floor from "./Floor";

enum SlotSize { Small = 1, Medium = 2, Large = 3, ExtraLarge = 4 };

class ParkingSlot extends Model<InferAttributes<ParkingSlot>, InferCreationAttributes<ParkingSlot>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare vehicleNumber: string | null;
    declare size: number;
    declare FloorId: ForeignKey<Floor['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
}

ParkingSlot.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    vehicleNumber: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    size: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},
    {
        sequelize: sequelizeConnection,
        paranoid: true,
        tableName: "ParkingSlots"
    })

export default ParkingSlot