"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllotmentRoute = void 0;
const AllotmentController_1 = require("../controllers/AllotmentController");
const AllotmentService_1 = require("../services/AllotmentService");
const AllotmentDal_1 = require("../../database/dal/AllotmentDal");
const AllotmentValidator_1 = require("../middlewares/validations/AllotmentValidator");
class AllotmentRoute {
    constructor(router) {
        this.router = router;
        //Normally we should inject these dependencies
        //for simplicity using like this
        this.allotmentController = new AllotmentController_1.AllotmentController(new AllotmentService_1.AllotmentService(new AllotmentDal_1.AllotmentDal));
        this.allotmentValidator = new AllotmentValidator_1.AllotmentValidator();
    }
    routes() {
        this.router.post("/getslot/:lotId/:size", this.allotmentValidator.validateAllotmentRequest, this.allotmentController.allotSlot);
        this.router.post("/releaseslot/:lotId/:slotId", this.allotmentValidator.validateReleaseRequest, this.allotmentController.releaseSlot);
        return this.router;
    }
}
exports.AllotmentRoute = AllotmentRoute;
//# sourceMappingURL=AllotmentRoute.js.map