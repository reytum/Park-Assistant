import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import sequelizeConnection from "../config";
import ParkingLot from "./ParkingLot";

class Floor extends Model<InferAttributes<Floor>, InferCreationAttributes<Floor>> {
    declare id: CreationOptional<number>;
    declare name: string | null;
    declare level: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
    declare ParkingLotId: ForeignKey<ParkingLot['id']>;
}

Floor.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        defaultValue: null
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},
    {
        sequelize: sequelizeConnection,
        paranoid: true,
        tableName: "Floors"
    })

export default Floor