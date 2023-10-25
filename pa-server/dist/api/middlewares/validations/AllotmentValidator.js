"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllotmentValidator = void 0;
const ObjectMapper_1 = require("../../../utils/ObjectMapper");
const BadRequestError_1 = require("../../models/errors/BadRequestError");
class AllotmentValidator {
    validateAllotmentRequest(req, res, next) {
        try {
            if (req.params.lotId && req.params.size && !isNaN(+req.params.lotId) && ObjectMapper_1.ObjectMapper.slotMap.has(req.params.size)) {
                next();
            }
            else {
                throw new BadRequestError_1.BadRequestError('Invalid parking lot id or slot size');
            }
        }
        catch (err) {
            if (err instanceof BadRequestError_1.BadRequestError) {
                res.status(400).json({ error: err.message });
            }
            else {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    validateReleaseRequest(req, res, next) {
        try {
            if (req.params.lotId && req.params.slotId && !isNaN(+req.params.lotId) && !isNaN(+req.params.slotId)) {
                next();
            }
            else {
                throw new BadRequestError_1.BadRequestError('Invalid parking slot id');
            }
        }
        catch (err) {
            if (err instanceof BadRequestError_1.BadRequestError) {
                res.status(400).json({ error: err.message });
            }
            else {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
exports.AllotmentValidator = AllotmentValidator;
//# sourceMappingURL=AllotmentValidator.js.map