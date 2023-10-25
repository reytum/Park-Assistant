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
exports.AllotmentController = void 0;
const ApiResponseUtils_1 = require("../../utils/ApiResponseUtils");
const ObjectMapper_1 = require("../../utils/ObjectMapper");
class AllotmentController {
    constructor(allotmentService) {
        this.allotmentService = allotmentService;
        this.allotSlot = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let lotId = +req.params.lotId;
                let size = ObjectMapper_1.ObjectMapper.slotMap.get(req.params.size);
                let response = yield this.allotmentService.allotSlot(lotId, size);
                ApiResponseUtils_1.ApiResponseUtils.sendSuccessResponse(res, response);
            }
            catch (err) {
                //Normally we would parse error into sepcific codes
                //But right now leaving it to just one code
                ApiResponseUtils_1.ApiResponseUtils.sendErrorResponse(500, res, err);
            }
        });
        this.releaseSlot = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let lotId = +req.params.lotId;
                let slotId = +req.params.slotId;
                let response = yield this.allotmentService.releaseSlot(lotId, slotId);
                ApiResponseUtils_1.ApiResponseUtils.sendSuccessResponse(res, response);
            }
            catch (err) {
                //Normally we would parse error into sepcific codes
                //But right now leaving it to just one code
                ApiResponseUtils_1.ApiResponseUtils.sendErrorResponse(500, res, JSON.stringify(err));
            }
        });
    }
}
exports.AllotmentController = AllotmentController;
//# sourceMappingURL=AllotmentController.js.map