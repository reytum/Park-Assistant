"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingValidator = void 0;
const BadRequestError_1 = require("../../models/errors/BadRequestError");
class OnboardingValidator {
    validateRequest(req, res, next) {
        try {
            const obRequest = req.body;
            if (obRequest === null || Object.keys(obRequest).length == 0) {
                throw new BadRequestError_1.BadRequestError('OnboardingRequest body should not be null');
            }
            next();
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
    validateGetRequest(req, res, next) {
        try {
            if (!req.params.id) {
                throw new BadRequestError_1.BadRequestError('Registration Id should not be empty');
            }
            next();
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
exports.OnboardingValidator = OnboardingValidator;
//# sourceMappingURL=OnboardingValidator.js.map