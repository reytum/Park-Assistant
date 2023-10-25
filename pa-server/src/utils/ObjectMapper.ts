import Floor from "../database/entities/Floor";
import ParkingLot from "../database/entities/ParkingLot";
import ParkingSlot from "../database/entities/ParkingSlot";

export class ObjectMapper {
    static slotMap = new Map<string, number>([
        ["small", 1],
        ["medium", 2],
        ["large", 3],
        ["xlarge", 4]
    ]);

    static slotSizeMap = {
        1: "S",
        2: "M",
        3: "L",
        4: "X"
    }

    static obRequestToLotEntity(obRequest: OnboardingRequest): ParkingLot {
        const parkingLot = new ParkingLot()
        parkingLot.cityName = obRequest.cityName
        parkingLot.countryCode = obRequest.countryCode
        parkingLot.latitude = obRequest.latitude
        parkingLot.longitude = obRequest.longitude
        parkingLot.zipcode = obRequest.zipcode
        parkingLot.stateCode = obRequest.stateCode
        parkingLot.name = obRequest.name
        parkingLot.type = obRequest.type
        parkingLot.registrationId = obRequest.registrationId
        return parkingLot
    }

    static obRequestToFloorEntity(lotId: number, obRequest: OnboardingRequest): any[] {
        let floors = [];
        for (var floor of obRequest.floors) {
            let floorEntity = new Floor()
            floorEntity.name = floor.name
            floorEntity.level = floor.level
            floorEntity.ParkingLotId = lotId
            floors.push(floorEntity.toJSON())
        }
        return floors
    }

    static obRequestToSlotEntity(floors: Floor[], obRequest: OnboardingRequest): any[] {
        var slots = []
        let map = new Map<number, number>()
        for (var floorEntity of floors) {
            map[floorEntity.level] = floorEntity.id
        }
        for (var floor of obRequest.floors) {
            if (floor.smallCount > 0) {
                slots = slots.concat(this.getParkingSlots(floor.smallCount, 1, map[floor.level], floor.name))
            }

            if (floor.mediumCount > 0) {
                slots = slots.concat(this.getParkingSlots(floor.mediumCount, 2, map[floor.level], floor.name))
            }

            if (floor.largeCount > 0) {
                slots = slots.concat(this.getParkingSlots(floor.largeCount, 3, map[floor.level], floor.name))
            }

            if (floor.xLargeCount > 0) {
                slots = slots.concat(this.getParkingSlots(floor.xLargeCount, 4, map[floor.level], floor.name))
            }
        }
        return slots
    }

    static getParkingSlots(count: number, size: number, floorId: number, floorName: string): any[] {
        let slots = []
        for (var s = 1; s <= count; s++) {
            let slot = new ParkingSlot()
            slot.size = size
            slot.name = `${floorName}${this.slotSizeMap[size]}${s}`
            slot.FloorId = floorId
            slots.push(slot.toJSON())
        }
        return slots
    }
}