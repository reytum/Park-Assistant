import { AllotmentDal } from "../../database/dal/AllotmentDal"
import { ApiError } from "../models/errors/ApiError"

export class AllotmentService {
    constructor(
        private readonly allotmentDal: AllotmentDal
    ) { }

    allotSlot = async (lotId: number, size: number): Promise<AllotmentResponse> => {
        try {
            let slot = await this.allotmentDal.allotSlot(lotId, size, "1")
            if (slot != null) {
                return slot
            }
            throw new ApiError(500, "Sorry! All slots are full");
        } catch (err) {
            throw err;
        }
    }

    releaseSlot = async (lotId: number, slotId: number): Promise<ReleaseResponse> => {
        let response = await this.allotmentDal.updateSlotRemoveVehicleNumber(slotId)
        if (response > 0) {
            return { message: "The slot is released" } as ReleaseResponse
        }
        return { message: "The slot was not occupied" } as ReleaseResponse
    }
}