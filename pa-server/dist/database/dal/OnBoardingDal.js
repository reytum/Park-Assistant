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
exports.OnBoardingDal = void 0;
const ParkingLot_1 = __importDefault(require("../entities/ParkingLot"));
const Floor_1 = __importDefault(require("../entities/Floor"));
const ParkingSlot_1 = __importDefault(require("../entities/ParkingSlot"));
class OnBoardingDal {
    constructor() {
        this.addParkingLot = (request) => __awaiter(this, void 0, void 0, function* () {
            let parkingLot = yield ParkingLot_1.default.create(request.toJSON());
            return parkingLot;
        });
        this.bulkCreateFloors = (request) => __awaiter(this, void 0, void 0, function* () {
            let floors = yield Floor_1.default.bulkCreate(request);
            return floors;
        });
        this.bulkCreateSlots = (request) => __awaiter(this, void 0, void 0, function* () {
            let slots = yield ParkingSlot_1.default.bulkCreate(request);
            return slots;
        });
        this.getParkingLotById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield ParkingLot_1.default.findOne({
                where: { registrationId: id },
                attributes: ['id', 'registrationId', 'name']
            });
        });
    }
}
exports.OnBoardingDal = OnBoardingDal;
//# sourceMappingURL=OnBoardingDal.js.map