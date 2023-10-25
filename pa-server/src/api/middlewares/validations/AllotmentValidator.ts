import { ApiResponseUtils } from "../../../utils/ApiResponseUtils";
import { ObjectMapper } from "../../../utils/ObjectMapper";
import { BadRequestError } from "../../models/errors/BadRequestError";

export class AllotmentValidator {
    validateAllotmentRequest(req, res, next) {
        try {
            if (req.params.lotId && req.params.size && !isNaN(+req.params.lotId) && ObjectMapper.slotMap.has(req.params.size)) {
                next()
            } else {
                throw new BadRequestError('Invalid parking lot id or slot size');
            }
        } catch (err) {
            if (err instanceof BadRequestError) {
                res.status(400).json({ error: err.message });
            } else {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    validateReleaseRequest(req, res, next) {
        try {
            if (req.params.lotId && req.params.slotId && !isNaN(+req.params.lotId) && !isNaN(+req.params.slotId)) {
                next()
            } else {
                throw new BadRequestError('Invalid parking slot id');
            }
        } catch (err) {
            if (err instanceof BadRequestError) {
                res.status(400).json({ error: err.message });
            } else {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}