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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const testSequelizeConnection = new sequelize_1.Sequelize({
    dialect: "postgres",
    storage: ":memory:",
    logging: console.log,
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testSequelizeConnection.sync({ force: true });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
}));
describe('Onboarding Service', () => {
    it('should add parking lot, floors and slots', () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
//# sourceMappingURL=OnboardingServiceTest.js.map