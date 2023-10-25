"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseUtils = void 0;
const ApiError_1 = require("../api/models/errors/ApiError");
class ApiResponseUtils {
    static sendSuccessResponse(res, data) {
        //For now allowing wildcard
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).send(data);
    }
    static sendErrorResponse(code, res, error) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (error instanceof ApiError_1.ApiError) {
            res.status(error.code).send(error.message);
        }
        else {
            res.status(code).send(JSON.stringify(error));
        }
    }
}
exports.ApiResponseUtils = ApiResponseUtils;
//# sourceMappingURL=ApiResponseUtils.js.map