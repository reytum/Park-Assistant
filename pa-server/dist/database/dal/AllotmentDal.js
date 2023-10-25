"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllotmentDal = void 0;
const ApiError_1 = require("../../api/models/errors/ApiError");
const ParkingSlot_1 = __importDefault(require("../entities/ParkingSlot"));
const config_1 = __importDefault(require("../config"));
class AllotmentDal {
    constructor() {
        this.findFirstEmptySlot = (lotId, size) => __awaiter(this, void 0, void 0, function* () {
            //Need to use ORM here, but due to time constraint wrote a query directly
            let slot = yield config_1.default.query(`
            SELECT ps.id as "slotId", "FloorId" as "floorId", f.name as "floorName", ps.name as "slotName", f.level as "level"
            FROM "ParkingSlots" ps 
            JOIN "Floors" f 
            ON ps."FloorId" = f.id 
            AND ps."vehicleNumber" IS NULL 
            WHERE f."ParkingLotId" = ${lotId}
            AND ps.size >= ${size}
            ORDER BY ps.size ASC LIMIT 1`);
            return slot;
        });
        this.updateSlotWithVehicleNumber = (slotId, vehicleNumber) => __awaiter(this, void 0, void 0, function* () {
            let updated = yield ParkingSlot_1.default.update({ vehicleNumber: vehicleNumber }, {
                where: { id: slotId }
            });
            if (updated.length > 0) {
                return updated[0];
            }
            return -1;
        });
        this.allotSlot = (lotId, size, verhicleNumber) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    //Need to use ORM here, but due to time constraint wrote a query directly
                    let slot = yield config_1.default.query(`
            SELECT ps.id as "slotId", "FloorId" as "floorId", f.name as "floorName", ps.name as "slotName", f.level as "level"
            FROM "ParkingSlots" ps 
            JOIN "Floors" f 
            ON ps."FloorId" = f.id 
            AND ps."vehicleNumber" IS NULL 
            WHERE f."ParkingLotId" = ${lotId}
            AND ps.size >= ${size}
            ORDER BY ps.size ASC LIMIT 1`, { transaction: t });
                    if (slot.length > 0 && slot[0].length > 0) {
                        let slotResponse = slot[0][0];
                        if (slotResponse != null && slotResponse.slotId > 0) {
                            let updated = yield ParkingSlot_1.default.update({ vehicleNumber: verhicleNumber }, {
                                transaction: t,
                                where: { id: slotResponse.slotId }
                            });
                            if (updated.length > 0 && updated[0] > 0) {
                                slotResponse.slot = `${slotResponse.floorId}-${slotResponse.slotId}`;
                                return slotResponse;
                            }
                        }
                        else {
                            throw new ApiError_1.ApiError(500, "All slots are full");
                        }
                    }
                }));
                return result;
            }
            catch (err) {
                throw err;
            }
        });
        this.updateSlotRemoveVehicleNumber = (slotId) => __awaiter(this, void 0, void 0, function* () {
            let result = yield ParkingSlot_1.default.update({ vehicleNumber: null }, {
                where: { id: slotId },
            });
            if (result.length > 0) {
                return result[0];
            }
            return -1;
        });
    }
}
exports.AllotmentDal = AllotmentDal;
//# sourceMappingURL=AllotmentDal.js.map