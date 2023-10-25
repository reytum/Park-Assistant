import { BadRequestError } from "../../models/errors/BadRequestError";

export class OnboardingValidator {
    validateRequest(req, res, next) {
        try {
            const obRequest = req.body as OnboardingRequest
            if (obRequest === null || Object.keys(obRequest).length == 0) {
                throw new BadRequestError('OnboardingRequest body should not be null');
            }
            next()
        } catch (err) {
            if (err instanceof BadRequestError) {
                res.status(400).json({ error: err.message });
            } else {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    validateGetRequest(req, res, next) {
        try {
            if (!req.params.id) {
                throw new BadRequestError('Registration Id should not be empty');
            }
            next()
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