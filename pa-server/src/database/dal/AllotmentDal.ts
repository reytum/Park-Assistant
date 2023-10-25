import { Sequelize } from "sequelize"
import { ApiError } from "../../api/models/errors/ApiError"
import ParkingSlot from "../entities/ParkingSlot"

export class AllotmentDal {
    constructor(private readonly sequelize: Sequelize) { }

    findFirstEmptySlot = async (lotId: number, size: number): Promise<any> => {
        //Need to use ORM here, but due to time constraint wrote a query directly
        let slot = await this.sequelize.query(`
            SELECT ps.id as "slotId", "FloorId" as "floorId", f.name as "floorName", ps.name as "slotName", f.level as "level"
            FROM "ParkingSlots" ps 
            JOIN "Floors" f 
            ON ps."FloorId" = f.id 
            AND ps."vehicleNumber" IS NULL 
            WHERE f."ParkingLotId" = ${lotId}
            AND ps.size >= ${size}
            ORDER BY ps.size ASC LIMIT 1`)
        return slot
    }

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
            const result = await this.sequelize.transaction(async (t) => {
                //Need to use ORM here, but due to time constraint wrote a query directly
                let slot = await this.sequelize.query(`
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

    updateSlotRemoveVehicleNumber = async (slotId: number): Promise<number> => {
        let result = await ParkingSlot.update({ vehicleNumber: null }, {
            where: { id: slotId },
        })
        if (result.length > 0) {
            return result[0]
        }
        return -1
    }
}