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
exports.AllotmentService = void 0;
const ApiError_1 = require("../models/errors/ApiError");
class AllotmentService {
    constructor(allotmentDal) {
        this.allotmentDal = allotmentDal;
        this.allotSlot = (lotId, size) => __awaiter(this, void 0, void 0, function* () {
            try {
                let slot = yield this.allotmentDal.allotSlot(lotId, size, "1");
                if (slot != null) {
                    return slot;
                }
                throw new ApiError_1.ApiError(500, "Sorry! All slots are full");
            }
            catch (err) {
                throw err;
            }
        });
        this.releaseSlot = (lotId, slotId) => __awaiter(this, void 0, void 0, function* () {
            let response = yield this.allotmentDal.updateSlotRemoveVehicleNumber(slotId);
            if (response > 0) {
                return { message: "The slot is released" };
            }
            return { message: "The slot was not occupied" };
        });
    }
}
exports.AllotmentService = AllotmentService;
//# sourceMappingURL=AllotmentService.js.map