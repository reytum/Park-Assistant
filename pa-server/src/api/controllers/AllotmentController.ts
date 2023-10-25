import { ApiResponseUtils } from "../../utils/ApiResponseUtils";
import { ObjectMapper } from "../../utils/ObjectMapper";
import { AllotmentService } from "../services/AllotmentService";

export class AllotmentController {
    constructor(
        private readonly allotmentService: AllotmentService
    ) { }

    allotSlot = async (req, res) => {
        try {
            let lotId = +req.params.lotId
            let size = ObjectMapper.slotMap.get(req.params.size)
            let response = await this.allotmentService.allotSlot(lotId, size)
            ApiResponseUtils.sendSuccessResponse(res, response)
        } catch (err) {
            //Normally we would parse error into sepcific codes
            //But right now leaving it to just one code
            ApiResponseUtils.sendErrorResponse(500, res, err)
        }
    }

    releaseSlot = async (req, res) => {
        try {
            let lotId = +req.params.lotId
            let slotId = +req.params.slotId
            let response = await this.allotmentService.releaseSlot(lotId, slotId)
            ApiResponseUtils.sendSuccessResponse(res, response)
        } catch (err) {
            //Normally we would parse error into sepcific codes
            //But right now leaving it to just one code
            ApiResponseUtils.sendErrorResponse(500, res, JSON.stringify(err))
        }
    }
}