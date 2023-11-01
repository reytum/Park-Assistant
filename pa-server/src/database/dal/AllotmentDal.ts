import { Op } from "sequelize"
import { ApiError } from "../../api/models/errors/ApiError"
import ParkingSlot from "../entities/ParkingSlot"
import sequelizeConnection from "../config"
import Floor from "../entities/Floor"

export class AllotmentDal {

    updateSlotWithVehicleNumber = async (slotId: number, vehicleNumber: string): Promise<number> => {
        let updated = await ParkingSlot.update({ vehicleNumber: vehicleNumber }, {
            where: { id: slotId }
        })
        if (updated.length > 0) {
            return updated[0]
        }
        return -1
    }

    allotSlot = async (lotId: number, size: number, verhicleNumber: string): Promise<AllotmentResponse> => {
        try {
            const result = await sequelizeConnection.transaction(async (t) => {
                //Need to use ORM here, but due to time constraint wrote a query directly
                let slot = await sequelizeConnection.query(`
            SELECT ps.id as "slotId", "FloorId" as "floorId", f.name as "floorName", ps.name as "slotName", f.level as "level"
            FROM "ParkingSlots" ps 
            JOIN "Floors" f 
            ON ps."FloorId" = f.id 
            AND ps."vehicleNumber" IS NULL 
            WHERE f."ParkingLotId" = ${lotId}
            AND ps.size >= ${size}
            ORDER BY ps.size ASC LIMIT 1`, { transaction: t })

                if (slot.length > 0 && slot[0].length > 0) {
                    let slotResponse = slot[0][0] as AllotmentResponse
                    if (slotResponse != null && slotResponse.slotId > 0) {
                        let updated = await ParkingSlot.update({ vehicleNumber: verhicleNumber }, {
                            transaction: t,
                            where: { id: slotResponse.slotId }
                        })
                        if (updated.length > 0 && updated[0] > 0) {
                            slotResponse.slot = `${slotResponse.floorId}-${slotResponse.slotId}`
                            return slotResponse
                        }
                    } else {
                        throw new ApiError(500, "All slots are full")
                    }
                }
            })
            return result
        } catch (err) {
            throw err
        }
    }

    updateSlotRemoveVehicleNumber = async (slotId: number, vehicleNumber: string): Promise<number> => {
        let result = await ParkingSlot.update({ vehicleNumber: vehicleNumber }, {
            where: { id: slotId },
        })
        if (result.length > 0) {
            return result[0]
        }
        return -1
    }

    releaseSlotVehicleNumber = async (slotId: number): Promise<number> => {
        let result = await ParkingSlot.update({ vehicleNumber: null }, {
            where: { id: slotId, vehicleNumber: { [Op.ne]: null } },
        })
        if (result.length > 0) {
            return result[0]
        }
        return -1
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
        return null
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