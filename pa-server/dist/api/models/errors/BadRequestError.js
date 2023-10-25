"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map