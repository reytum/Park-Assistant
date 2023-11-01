import express from 'express';
import { OnboardingRoute } from './api/routes/OnboardingRoute'
import { AllotmentRoute } from './api/routes/AllotmentRoute';
import { Logger } from './api/middlewares/Logger'
import sequelizeConnection from './database/config';
import { SlotCache } from './database/SlotCache';
import { AllotmentDal } from './database/dal/AllotmentDal';
//import { AllotmentRoute } from './api/routes/AllotmentRoute'

const app = express();
const port = 3000;
const router = express.Router()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(new Logger().loggerMiddleware)
app.use(function (req, res, next) {
  console.log('Request body : ' + JSON.stringify(req.body));
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
let slotCache = new SlotCache(new AllotmentDal())
app.use('/api', router)

//router.use('/onboarding', router)
app.get('/', (req, res) => {
  return res.status(200).send(`Welcome to Park Assistant! \n Endpoints available at http://localhost:${port}/api/v1`);
});

app.set('sequelizeClient', sequelizeConnection)

router.use('/onboarding', new OnboardingRoute(router, slotCache).routes())
router.use('/', new AllotmentRoute(router, slotCache).routes())

const start = async (): Promise<void> => {
  try {
    await sequelizeConnection.sync({
      force: false
    });
    app.listen(port, () => {
      return console.log(`Park Assistant is listening at http://localhost:${port}`)
    });
  } catch (error) {
    console.log(`Error occurred while running server: ${error.message}`)
  }
};

void start();