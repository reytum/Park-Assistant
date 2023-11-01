"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OnboardingRoute_1 = require("./api/routes/OnboardingRoute");
const AllotmentRoute_1 = require("./api/routes/AllotmentRoute");
const Logger_1 = require("./api/middlewares/Logger");
const config_1 = __importDefault(require("./database/config"));
const SlotCache_1 = require("./database/SlotCache");
const AllotmentDal_1 = require("./database/dal/AllotmentDal");
//import { AllotmentRoute } from './api/routes/AllotmentRoute'
const app = (0, express_1.default)();
const port = 3000;
const router = express_1.default.Router();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(new Logger_1.Logger().loggerMiddleware);
app.use(function (req, res, next) {
    console.log('Request body : ' + JSON.stringify(req.body));
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
let slotCache = new SlotCache_1.SlotCache(new AllotmentDal_1.AllotmentDal());
app.use('/api', router);
//router.use('/onboarding', router)
app.get('/', (req, res) => {
    return res.status(200).send(`Welcome to Park Assistant! \n Endpoints available at http://localhost:${port}/api/v1`);
});
app.set('sequelizeClient', config_1.default);
router.use('/onboarding', new OnboardingRoute_1.OnboardingRoute(router, slotCache).routes());
router.use('/', new AllotmentRoute_1.AllotmentRoute(router, slotCache).routes());
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield config_1.default.sync({
            force: false
        });
        app.listen(port, () => {
            return console.log(`Park Assistant is listening at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(`Error occurred while running server: ${error.message}`);
    }
});
void start();
//# sourceMappingURL=app.js.map