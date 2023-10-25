"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(code, message) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map