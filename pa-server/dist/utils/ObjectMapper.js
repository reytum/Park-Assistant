"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectMapper = void 0;
const Floor_1 = __importDefault(require("../database/entities/Floor"));
const ParkingLot_1 = __importDefault(require("../database/entities/ParkingLot"));
const ParkingSlot_1 = __importDefault(require("../database/entities/ParkingSlot"));
class ObjectMapper {
    static obRequestToLotEntity(obRequest) {
        const parkingLot = new ParkingLot_1.default();
        parkingLot.cityName = obRequest.cityName;
        parkingLot.countryCode = obRequest.countryCode;
        parkingLot.latitude = obRequest.latitude;
        parkingLot.longitude = obRequest.longitude;
        parkingLot.zipcode = obRequest.zipcode;
        parkingLot.stateCode = obRequest.stateCode;
        parkingLot.name = obRequest.name;
        parkingLot.type = obRequest.type;
        parkingLot.registrationId = obRequest.registrationId;
        return parkingLot;
    }
    static obRequestToFloorEntity(lotId, obRequest) {
        let floors = [];
        for (var floor of obRequest.floors) {
            let floorEntity = new Floor_1.default();
            floorEntity.name = floor.name;
            floorEntity.level = floor.level;
            floorEntity.ParkingLotId = lotId;
            floors.push(floorEntity.toJSON());
        }
        return floors;
    }
    static obRequestToSlotEntity(floors, obRequest) {
        var slots = [];
        let map = new Map();
        for (var floorEntity of floors) {
            map[floorEntity.level] = floorEntity.id;
        }
        for (var floor of obRequest.floors) {
            if (floor.smallCount > 0) {
                slots = slots.concat(this.getParkingSlots(floor.smallCount, 1, map[floor.level], floor.name));
            }
            if (floor.mediumCount > 0) {
                slots = slots.concat(this.getParkingSlots(floor.mediumCount, 2, map[floor.level], floor.name));
            }
            if (floor.largeCount > 0) {
                slots = slots.concat(this.getParkingSlots(floor.largeCount, 3, map[floor.level], floor.name));
            }
            if (floor.xLargeCount > 0) {
                slots = slots.concat(this.getParkingSlots(floor.xLargeCount, 4, map[floor.level], floor.name));
            }
        }
        return slots;
    }
    static getParkingSlots(count, size, floorId, floorName) {
        let slots = [];
        for (var s = 1; s <= count; s++) {
            let slot = new ParkingSlot_1.default();
            slot.size = size;
            slot.name = `${floorName}${this.slotSizeMap[size]}${s}`;
            slot.FloorId = floorId;
            slots.push(slot.toJSON());
        }
        return slots;
    }
}
exports.ObjectMapper = ObjectMapper;
ObjectMapper.slotMap = new Map([
    ["small", 1],
    ["medium", 2],
    ["large", 3],
    ["xlarge", 4]
]);
ObjectMapper.slotSizeMap = {
    1: "S",
    2: "M",
    3: "L",
    4: "X"
};
//# sourceMappingURL=ObjectMapper.js.map