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
    constructor(slotCache) {
        this.slotCache = slotCache;
        this.allotSlot = (lotId, size) => __awaiter(this, void 0, void 0, function* () {
            try {
                let slot = this.slotCache.getSlot(lotId, size);
                if (slot != null) {
                    return slot;
                }
                throw new ApiError_1.ApiError(404, "Sorry! All slots are full");
            }
            catch (err) {
                throw err;
            }
        });
        this.releaseSlot = (lotId, slotId) => __awaiter(this, void 0, void 0, function* () {
            let response = yield this.slotCache.releaseSlot(lotId, slotId);
            return response;
        });
    }
}
exports.AllotmentService = AllotmentService;
//# sourceMappingURL=AllotmentService.js.map