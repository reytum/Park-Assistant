import { SlotCache } from "../../database/SlotCache";
import { OnBoardingDal } from "../../database/dal/OnBoardingDal";
import ParkingLot from "../../database/entities/ParkingLot";
import { ObjectMapper } from "../../utils/ObjectMapper";
import { ApiError } from "../models/errors/ApiError";
import { UniqueConstraintError } from "sequelize"

export class OnboardingService {
    constructor(
        private readonly onboardingDal: OnBoardingDal,
        private readonly slotCache: SlotCache
    ) { }

    onboardParkingLot = async (obRequest: OnboardingRequest): Promise<OnboardingResponse> => {
        //Normally these queries would be under a single transaction
        //But due to time constraints using brute force here
        try {
            let parkingLot = await this.onboardingDal.addParkingLot(ObjectMapper.obRequestToLotEntity(obRequest))
            if (parkingLot) {
                let floors = await this.onboardingDal.bulkCreateFloors(ObjectMapper.obRequestToFloorEntity(parkingLot.id, obRequest))
                if (floors) {
                    let slots = await this.onboardingDal.bulkCreateSlots(ObjectMapper.obRequestToSlotEntity(floors, obRequest))
                }
            }
            let response: OnboardingResponse = {
                id: parkingLot.id,
                name: parkingLot.name
            }
            return response
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                throw new ApiError(500, "ParkingLot already exists for the registrationId")
            } else {
                throw err
            }
        }
    }

    getParkingLotByRegistrationId = async (id: string): Promise<ParkingLot> => {
        let parkingLot = await this.onboardingDal.getParkingLotById(id)
        if (parkingLot) {
            await this.slotCache.populateCache(parkingLot.id)
            return parkingLot
        }
        throw new ApiError(404, "No Parking lot found by given registrationId")
    }
}