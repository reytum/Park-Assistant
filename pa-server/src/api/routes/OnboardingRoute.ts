import { Router } from "express";
import { OnboardingController } from "../controllers/OnboardingController";
import { OnboardingValidator } from "../middlewares/validations/OnboardingValidator";
import { OnboardingService } from "../services/OnboardingService";
import { OnBoardingDal } from "../../database/dal/OnBoardingDal";

export class OnboardingRoute {
    //Normally we should inject these dependencies
    //for simplicity using like this
    private readonly onboardingController: OnboardingController = new OnboardingController(new OnboardingService(new OnBoardingDal))
    private readonly onboardingValidator: OnboardingValidator = new OnboardingValidator()

    constructor(private readonly router: Router) {
    }

    routes(): Router {
        this.router.post("/", this.onboardingValidator.validateRequest, this.onboardingController.onboardParkingLot)
        this.router.get("/:id", this.onboardingValidator.validateGetRequest, this.onboardingController.getParkingLotByRegistrationId)
        return this.router
    }
}