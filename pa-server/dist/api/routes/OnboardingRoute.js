"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingRoute = void 0;
const OnboardingController_1 = require("../controllers/OnboardingController");
const OnboardingValidator_1 = require("../middlewares/validations/OnboardingValidator");
const OnboardingService_1 = require("../services/OnboardingService");
const OnBoardingDal_1 = require("../../database/dal/OnBoardingDal");
class OnboardingRoute {
    constructor(router) {
        this.router = router;
        //Normally we should inject these dependencies
        //for simplicity using like this
        this.onboardingController = new OnboardingController_1.OnboardingController(new OnboardingService_1.OnboardingService(new OnBoardingDal_1.OnBoardingDal));
        this.onboardingValidator = new OnboardingValidator_1.OnboardingValidator();
    }
    routes() {
        this.router.post("/", this.onboardingValidator.validateRequest, this.onboardingController.onboardParkingLot);
        this.router.get("/:id", this.onboardingValidator.validateGetRequest, this.onboardingController.getParkingLotByRegistrationId);
        return this.router;
    }
}
exports.OnboardingRoute = OnboardingRoute;
//# sourceMappingURL=OnboardingRoute.js.map