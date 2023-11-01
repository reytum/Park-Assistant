import { ApiError } from "../models/errors/ApiError"
import { SlotCache } from "../../database/SlotCache";

export class AllotmentService {
    constructor(
        private readonly slotCache: SlotCache
    ) { }

    allotSlot = async (lotId: number, size: number): Promise<AllotmentResponse> => {
        try {
            let slot = this.slotCache.getSlot(lotId, size)
            if (slot != null) {
                return slot
            }
            throw new ApiError(404, "Sorry! All slots are full");
        } catch (err) {
            throw err;
        }
    }

    releaseSlot = async (lotId: number, slotId: number): Promise<ReleaseResponse> => {
        let response = await this.slotCache.releaseSlot(lotId, slotId)
        return response
    }
}
