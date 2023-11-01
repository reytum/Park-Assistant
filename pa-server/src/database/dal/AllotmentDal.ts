import { Op } from "sequelize"
import { ApiError } from "../../api/models/errors/ApiError"
import ParkingSlot from "../entities/ParkingSlot"
import sequelizeConnection from "../config"
import Floor from "../entities/Floor"

export class AllotmentDal {

    updateSlotRemoveVehicleNumber = async (slotId: number, vehicleNumber: string): Promise<number> => {
        let result = await ParkingSlot.update({ vehicleNumber: vehicleNumber }, {
            where: { id: slotId },
        })
        if (result.length > 0) {
            return result[0]
        }
    }

    releaseSlotVehicleNumber = async (slotId: number): Promise<number> => {
        let result = await ParkingSlot.update({ vehicleNumber: null }, {
            where: { id: slotId, vehicleNumber: { [Op.ne]: null } },
        })
        if (result.length > 0) {
            return result[0]
        }
    }
    getParkingLotsByRegistrationId = async (lotId: number): Promise<AllotmentResponse[]> => {
        let res = await sequelizeConnection.query(`
            SELECT ps.id as "slotId", "size" as "slotSize", "FloorId" as "floorId", f.name as "floorName", ps.name as "slotName", f.level as "level"
            FROM "ParkingSlots" ps 
            JOIN "Floors" f 
            ON ps."FloorId" = f.id 
            AND ps."vehicleNumber" IS NULL 
            WHERE f."ParkingLotId" = ${lotId}
            ORDER BY ps.size ASC`)
        if (res.length > 0) {
            return res[0] as AllotmentResponse[]
        }
    }

    getSlotById = async (slotId: number): Promise<any> => {
        return await ParkingSlot.findOne({
            where: { id: slotId },
            include: [{
                model: Floor
            }]
        })
    }
}