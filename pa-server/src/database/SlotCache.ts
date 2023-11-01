import { Queue } from "queue-typescript";
import { AllotmentDal } from "./dal/AllotmentDal";

export class SlotCache {
    private readonly queueMap: Map<number, Map<number, Queue<AllotmentResponse>>> = new Map();
    private readonly MAX_SLOT = 4;

    constructor(
        private readonly allotmentDal: AllotmentDal
    ) { }

    populateCache = async (lotId: number) => {
        if (!this.queueMap.has(lotId)) {
            let lots = await this.allotmentDal.getParkingLotsByRegistrationId(lotId)
            for (var i = 0; i < lots.length; i++) {
                this.addSlotToQueue(lotId, lots[i])
            }
        }
    }

    getSlot = async (lotId: number, size: number): Promise<AllotmentResponse> => {
        let slotQueueMap = this.queueMap[lotId]
        if (slotQueueMap != null) {
            for (var i = size; i <= this.MAX_SLOT; i++) {
                let queue = slotQueueMap[i] ?? new Queue()
                if (queue.front === null) {
                    continue;
                } else {
                    let availableSlot = queue.dequeue()
                    await this.allotmentDal.updateSlotRemoveVehicleNumber(availableSlot.slotId, "1")
                    return availableSlot;
                }
            }
        }
        return null;
    }

    releaseSlot = async (lotId: number, slotId: number): Promise<ReleaseResponse> => {
        let updated = await this.allotmentDal.releaseSlotVehicleNumber(slotId)
        if (updated > 0) {
            let slot = await this.allotmentDal.getSlotById(slotId)
            if (slot != null) {
                let allotmentResponse = {
                    slotId: slotId,
                    slotSize: slot.size,
                    floorId: slot.Floor.id,
                    floorName: slot.Floor.name,
                    slotName: slot.name,
                    level: slot.Floor.level
                } as AllotmentResponse
                this.addSlotToQueue(lotId, allotmentResponse)
            }
            return { message: "The slot is released" } as ReleaseResponse
        } else {
            return { message: "The slot was not occupied" } as ReleaseResponse
        }
    }

    addSlotToQueue = (lotId: number, allotment: AllotmentResponse): any => {
        let slotMap = this.queueMap[lotId] ?? new Map()
        let queue = slotMap[allotment.slotSize] ?? new Queue()
        queue.enqueue(allotment)
        slotMap[allotment.slotSize] = queue
        this.queueMap[lotId] = slotMap
    }

    clear() {
        this.queueMap.clear()
    }
}