"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingValidator = void 0;
class OnboardingValidator {
    validateRequest(req, res, next) {
        try {
            const obRequest = req.body;
            if (obRequest == null) {
                throw new BadRequestError('OnboardingRequest body should not be null');
            }
        }
        catch (err) {
            if (err instanceof BadRequestError) {
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