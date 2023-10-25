import ParkingLot from "../entities/ParkingLot";
import Floor from "../entities/Floor";
import ParkingSlot from "../entities/ParkingSlot";

export class OnBoardingDal {

    addParkingLot = async (request: ParkingLot): Promise<ParkingLot> => {
        let parkingLot = await ParkingLot.create<ParkingLot>(request.toJSON())
        return parkingLot
    }

    bulkCreateFloors = async (request: any[]): Promise<Floor[]> => {
        let floors = await Floor.bulkCreate(request)
        return floors
    }

    bulkCreateSlots = async (request: any[]): Promise<ParkingSlot[]> => {
        let slots = await ParkingSlot.bulkCreate(request)
        return slots
    }

    getParkingLotById = async (id: string): Promise<ParkingLot> => {
        return await ParkingLot.findOne({
            where: { registrationId: id },
            attributes: ['id', 'registrationId', 'name']
        })
    }
}