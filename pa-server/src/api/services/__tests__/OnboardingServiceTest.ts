import { faker } from '@faker-js/faker';
import { OnboardingService } from '../OnboardingService';
import { Sequelize } from 'sequelize';

const testSequelizeConnection = new Sequelize({
    dialect: "postgres",
    storage: ":memory:",
    logging: console.log,
});

beforeAll(async () => {
    await testSequelizeConnection.sync({ force: true });
})

afterAll(async () => {

})

describe('Onboarding Service', () => {

    it('should add parking lot, floors and slots', async () => {
        const res = await OnboardingService()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('users')
    })

})