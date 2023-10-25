import { Router } from "express"
import { AllotmentController } from "../controllers/AllotmentController"
import { AllotmentService } from "../services/AllotmentService"
import { AllotmentDal } from "../../database/dal/AllotmentDal"
import { AllotmentValidator } from "../middlewares/validations/AllotmentValidator"

export class AllotmentRoute {
    //Normally we should inject these dependencies
    //for simplicity using like this
    private readonly allotmentController: AllotmentController = new AllotmentController(new AllotmentService(new AllotmentDal))
    private readonly allotmentValidator: AllotmentValidator = new AllotmentValidator()

    constructor(private readonly router: Router) {
    }

    routes(): Router {
        this.router.post("/getslot/:lotId/:size", this.allotmentValidator.validateAllotmentRequest, this.allotmentController.allotSlot)
        this.router.post("/releaseslot/:lotId/:slotId", this.allotmentValidator.validateReleaseRequest, this.allotmentController.releaseSlot)
        return this.router
    }
}