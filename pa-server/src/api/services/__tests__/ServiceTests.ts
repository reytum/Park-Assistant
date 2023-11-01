import { OnboardingService } from '../OnboardingService';
import sequelizeConnection from '../../../database/config';
import { OnBoardingDal } from '../../../database/dal/OnBoardingDal';
import { SlotCache } from '../../../database/SlotCache';
import { obRequestMock, obResponseMock } from './ServiceMock';
import { ApiError } from '../../models/errors/ApiError';
import { AllotmentDal } from '../../../database/dal/AllotmentDal';
import { AllotmentService } from '../AllotmentService';

beforeAll(async () => {
    await sequelizeConnection.sync({ force: true });
})

afterAll(async () => {
    await slotCache.clear()
})

let obDal = new OnBoardingDal()
let allotmentDal = new AllotmentDal()
let slotCache = new SlotCache(allotmentDal)

describe('OnboardingService_onboardParkingLot', () => {
    let service = new OnboardingService(obDal, slotCache)
    it('Should add parking lot, floors and slots', async () => {
        const obRequest = obRequestMock as OnboardingRequest
        let res = await service.onboardParkingLot(obRequest)
        expect(res).toStrictEqual(obResponseMock as OnboardingResponse)
    });
    it('Should throw duplicate error with same registrationId', async () => {
        const obRequest = obRequestMock as OnboardingRequest
        try {
            let failed = await service.onboardParkingLot(obRequest)
        } catch (err) {
            expect(err).toStrictEqual(new ApiError(500, "ParkingLot already exists for the registrationId"))
        }
    });
})

describe('OnboardingService_getParkingLotByRegistrationId', () => {
    let service = new OnboardingService(obDal, slotCache)
    it('Successfully return parking lot', async () => {
        let res = await service.getParkingLotByRegistrationId("1")
        expect(res.registrationId).toBe("1")
        expect(res.name).toBe("BT Interview Mall")
    });

    it('Parking lot not found', async () => {
        try {
            let res = await service.getParkingLotByRegistrationId("2")
        } catch (err) {
            expect(err).toStrictEqual(new ApiError(404, "No Parking lot found by given registrationId"))
        }
    });
})

describe('AllotmentService_allotSlot', () => {
    let service = new AllotmentService(slotCache)

    it('Successfully book a small slot for small vehicle', async () => {
        let res = await service.allotSlot(1, 1)
        expect(res.slotName).toBe("AS1")
        expect(res.slotSize).toBe(1)
    });

    it('Allot medium and large slot for medium vehicle at same time', async () => {
        let result = await Promise.all([service.allotSlot(1, 2), service.allotSlot(1, 2)])
        let nameArray = result.map(value => value.slotName)
        expect(nameArray.sort()).toEqual(["AL1", "AM1"])
    });

    it('Successfully book a xLarge slot for xLarge vehicle', async () => {
        let res = await service.allotSlot(1, 4)
        expect(res.slotName).toBe("AX1")
        expect(res.slotSize).toBe(4)
    });

    it('Failed to allot slot', async () => {
        try {
            let res = await service.allotSlot(1, 4)
        } catch (err) {
            expect(err).toStrictEqual(new ApiError(404, "Sorry! All slots are full"))
        }
    })
})

describe('AllotmentService_releaseSlot', () => {
    let service = new AllotmentService(slotCache)

    it('Successfully release a slot with valid slotId', async () => {
        let res = await service.releaseSlot(1, 1)
        expect(res).toStrictEqual({ message: "The slot is released" } as ReleaseResponse)
    });

    it('Failed to release already released slot with valid slotId', async () => {
        let res = await service.releaseSlot(1, 1)
        expect(res).toStrictEqual({ message: "The slot was not occupied" } as ReleaseResponse)
    });
})