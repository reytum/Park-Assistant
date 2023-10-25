"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    loggerMiddleware(request, response, next) {
        //console.log(`${JSON.stringify(request.body)} ${JSON.stringify(response)}`);
        next();
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map