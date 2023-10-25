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
exports.OnboardingController = void 0;
const ApiResponseUtils_1 = require("../../utils/ApiResponseUtils");
class OnboardingController {
    constructor(onboardingService) {
        this.onboardingService = onboardingService;
        this.onboardParkingLot = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let obRequest = req.body;
                let response = yield this.onboardingService.onboardParkingLot(obRequest);
                ApiResponseUtils_1.ApiResponseUtils.sendSuccessResponse(res, response);
            }
            catch (err) {
                //Normally we would parse error into sepcific codes
                //But right now leaving it to just one code
                ApiResponseUtils_1.ApiResponseUtils.sendErrorResponse(500, res, JSON.stringify(err));
            }
        });
        this.getParkingLotByRegistrationId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let response = yield this.onboardingService.getParkingLotByRegistrationId(id);
                ApiResponseUtils_1.ApiResponseUtils.sendSuccessResponse(res, response);
            }
            catch (err) {
                //Normally we would parse error into sepcific codes
                //But right now leaving it to just one code
                ApiResponseUtils_1.ApiResponseUtils.sendErrorResponse(500, res, err);
            }
        });
    }
}
exports.OnboardingController = OnboardingController;
//# sourceMappingURL=OnboardingController.js.map