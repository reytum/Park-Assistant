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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingService = void 0;
const ObjectMapper_1 = require("../../utils/ObjectMapper");
const ApiError_1 = require("../models/errors/ApiError");
class OnboardingService {
    constructor(onboardingDal, slotCache) {
        this.onboardingDal = onboardingDal;
        this.slotCache = slotCache;
        this.onboardParkingLot = (obRequest) => __awaiter(this, void 0, void 0, function* () {
            //Normally these queries would be under a single transaction
            //But due to time constraints using brute force here
            let parkingLot = yield this.onboardingDal.addParkingLot(ObjectMapper_1.ObjectMapper.obRequestToLotEntity(obRequest));
            if (parkingLot) {
                let floors = yield this.onboardingDal.bulkCreateFloors(ObjectMapper_1.ObjectMapper.obRequestToFloorEntity(parkingLot.id, obRequest));
                if (floors) {
                    let slots = yield this.onboardingDal.bulkCreateSlots(ObjectMapper_1.ObjectMapper.obRequestToSlotEntity(floors, obRequest));
                }
            }
            let response = {
                id: parkingLot.id,
                name: parkingLot.name
            };
            return response;
        });
        this.getParkingLotByRegistrationId = (id) => __awaiter(this, void 0, void 0, function* () {
            let parkingLot = yield this.onboardingDal.getParkingLotById(id);
            if (parkingLot) {
                yield this.slotCache.populateCache(parkingLot.id);
                return parkingLot;
            }
            throw new ApiError_1.ApiError(404, "No Parking lot found by given registrationId");
        });
    }
}
exports.OnboardingService = OnboardingService;
//# sourceMappingURL=OnboardingService.js.map