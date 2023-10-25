import ParkingLot from "../../database/entities/ParkingLot";
import { ApiResponseUtils } from "../../utils/ApiResponseUtils";
import { OnboardingService } from "../services/OnboardingService";

export class OnboardingController {
    constructor(
        readonly onboardingService: OnboardingService
    ) { }

    onboardParkingLot = async (req, res) => {
        try {
            let obRequest = req.body as OnboardingRequest
            let response: OnboardingResponse = await this.onboardingService.onboardParkingLot(obRequest)
            ApiResponseUtils.sendSuccessResponse(res, response)
        } catch (err) {
            //Normally we would parse error into sepcific codes
            //But right now leaving it to just one code
            ApiResponseUtils.sendErrorResponse(500, res, JSON.stringify(err))
        }
    }

    getParkingLotByRegistrationId = async (req, res) => {
        try {
            let id = req.params.id
            let response: ParkingLot = await this.onboardingService.getParkingLotByRegistrationId(id)
            ApiResponseUtils.sendSuccessResponse(res, response)
        } catch (err) {
            //Normally we would parse error into sepcific codes
            //But right now leaving it to just one code
            ApiResponseUtils.sendErrorResponse(500, res, err)
        }
    }
}