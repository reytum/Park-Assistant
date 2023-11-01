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
exports.SlotCache = void 0;
const queue_typescript_1 = require("queue-typescript");
class SlotCache {
    constructor(allotmentDal) {
        this.allotmentDal = allotmentDal;
        this.queueMap = new Map();
        this.MAX_SLOT = 4;
        this.populateCache = (lotId) => __awaiter(this, void 0, void 0, function* () {
            if (!this.queueMap.has(lotId)) {
                let lots = yield this.allotmentDal.getParkingLotsByRegistrationId(lotId);
                for (var i = 0; i < lots.length; i++) {
                    this.addSlotToQueue(lotId, lots[i]);
                    console.log(`Parking Lots: ${JSON.stringify(lots[i])}`);
                }
            }
        });
        this.getSlot = (lotId, size) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let slotQueueMap = this.queueMap[lotId];
            if (slotQueueMap != null) {
                for (var i = size; i <= this.MAX_SLOT; i++) {
                    let availableSlot = ((_a = slotQueueMap[i]) !== null && _a !== void 0 ? _a : new queue_typescript_1.Queue()).dequeue();
                    if (availableSlot == null) {
                        continue;
                    }
                    else {
                        yield this.allotmentDal.updateSlotRemoveVehicleNumber(availableSlot.slotId, "1");
                        return availableSlot;
                    }
                }
            }
            return null;
        });
        this.releaseSlot = (lotId, slotId) => __awaiter(this, void 0, void 0, function* () {
            let updated = yield this.allotmentDal.releaseSlotVehicleNumber(slotId);
            if (updated > 0) {
                let slot = yield this.allotmentDal.getSlotById(slotId);
                if (slot != null) {
                    let allotmentResponse = {
                        slotId: slotId,
                        slotSize: slot.size,
                        floorId: slot.Floor.id,
                        floorName: slot.Floor.name,
                        slotName: slot.name,
                        level: slot.Floor.level
                    };
                    this.addSlotToQueue(lotId, allotmentResponse);
                }
                return { message: "The slot is released" };
            }
            else {
                return { message: "The slot was not occupied" };
            }
        });
        this.addSlotToQueue = (lotId, allotment) => {
            var _a, _b;
            let slotMap = (_a = this.queueMap[lotId]) !== null && _a !== void 0 ? _a : new Map();
            let queue = (_b = slotMap[allotment.slotSize]) !== null && _b !== void 0 ? _b : new queue_typescript_1.Queue();
            queue.enqueue(allotment);
            slotMap[allotment.slotSize] = queue;
            this.queueMap[lotId] = slotMap;
        };
    }
}
exports.SlotCache = SlotCache;
//# sourceMappingURL=SlotCache.js.map