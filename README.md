# Prequesite
Below operations need to be perfomed before running the app.

## Node installation
Make sure you have node installed on your system.
Refer this documentation for setting up node: https://nodejs.org/en/download

Once node is installed, navigate to pa-server directory and run:
```npm install```

## Postgres Installation
We would be using postgres for this app as our data store. 
So we need to install postgres on the machine.

MacOS:
```brew install postgresql```

Linux:
``````sudo apt install postgresql``````

## Database Setup (Mac)
To start the DB, run the below command:
```brew services start postgresql```

To stop the DB, run the below command:
```brew services stop postgresql```

### Configure the DB
Open the Query terminal by running the below command:
```psql postgres```

To setup a user, run the below command:

```sql
CREATE ROLE admin WITH LOGIN PASSWORD 'StrongPass';
ALTER ROLE admin CREATEDB;
```

Quit and login using the below commands:
```sql
\q
psql postgres -U admin;
```

Create the Database and grant all privileges to the above user:
```sql
CREATE DATABASE park_assistant_db WITH OWNER = admin;
GRANT ALL PRIVILEGES ON DATABASE park_assistant_db TO admin;
```

### Commands to verify the process
 List all users:
 ```\du```

 List all databases:
 ```\list```

 Connect to database:
 ```\c park_assistant_db```

 List all tables:
 ```\dt```

 Quit psql terminal:
 ```\q```


# Running the Project
## Prerequesite
The Assumption is made that Node, Postgres and Flutter is already installed on the system.

## Backend
1) Navigate to the ```pa-server``` directory and run ```npm install```
2) Run the server: ```npm run start```
3) Onboard a Parking Lot using below API from Postman:
   POST -> http://localhost:3000/api/onboarding/
   Body -> 
```json
   {
  "name": "Pacific Mall",
  "cityName": "Dehradun",
  "zipcode": "248001",
  "stateCode": "UK",
  "countryCode": "IN",
  "latitude": 12.348934,
  "longitude": 78.3243434,
  "type": "mall",
  "floors": [
    {
      "name": "A",
      "level": 1,
      "smallCount": 10,
      "mediumCount": 10,
      "largeCount": 10,
      "xLargeCount": 10
    },
    {
      "name": "B",
      "level": 2,
      "smallCount": 10,
      "mediumCount": 10,
      "largeCount": 10,
      "xLargeCount": 10
    },
    {
      "name": "C",
      "level": 3,
      "smallCount": 10,
      "mediumCount": 10,
      "largeCount": 10,
      "xLargeCount": 10
    }
  ],
  "registrationId": 4 //This is assumed to be unique for a Parking Lot. It can be the emailId, phone number, registrationId etc of the Parking Lot.
}
```

 The mobile app will need the registrationId to login to a ParkingLot.

 ## Mobile App
 Navigate to ```park_assistance``` and run ```flutter pub get```.
 The app needs to run in debug mode on chrome due to localhost. 
 Running the app in web:
 ```shell
 flutter run -d chrome --web-browser-flag "--disable-web-security"
```

The app can also be run on Android emulator. 
To do so we need to change the `baseUrl` in `BaseApiRepository` class from ```"http://localhost:3000/api";``` to ```"http://10.0.2.2:3000/api";```

# Requirement Traceability Matrix
## Backend
Packages used:
1) express -> Framework for node apps
2) sequelize -> ORM for RDBMS. We are using Postgres
3) type-script -> using type checks
4) linter -> For code linting
5) dotenv -> For handling process based environment variables

The structure looks as below:
`app.ts -> routes -> validations -> controllers -> services -> Dals(Data Access Layer)`

There are two Api Services created:
1) Onboarding -> To Register a new ParkingLot
2) Allot/Release Slot -> To Allot or release a Parking Slot

## Database structure
Three tables are created for:
1) Parking Lot -> ParkingLots
2) Floor -> Floors
3) Parking Slot -> ParkingSlots

`ParkingLots` has a column `registrationId` which is assumed to be unique. It can be the emailId, phone number, registrationId etc of the Parking Lot.
`ParkingLots` has many `Floors`
`Floor` has many `ParkingSlots`

`ParkingLots` has fields like name, city, stateCode, countryCode, type etc. 
`Floors` has fields like name, level, ParkinLotId(ForeignKey) etc
`ParkingSlots` has Fields like name, FloorId(ForeignKey), vehicleNumber and size(1 - small, 2 - medium, 3 - large, 4 - xLarge)

The vehicleNumber is a string field which is NULL by default. It can have the vehicle number of the parked vehicle. 
For now we are just updating it to "1" if the slot is booked, and NULL to release the slot.

### Onboarding (POST)
The onboarding API call can only be done from Postman. Its not integrated right now with the App.
The body takes below fields:
```json
{
  "name": "Pacific Mall",
  "cityName": "Dehradun",
  "zipcode": "248001",
  "stateCode": "UK",
  "countryCode": "IN",
  "latitude": 12.348934,
  "longitude": 78.3243434,
  "type": "mall",
  "floors": [
    {
      "name": "A",
      "level": 1,
      "smallCount": 1,
      "mediumCount": 1,
      "largeCount": 1,
      "xLargeCount": 1
    },
    {
      "name": "B",
      "level": 2,
      "smallCount": 1,
      "mediumCount": 1,
      "largeCount": 1,
      "xLargeCount": 1
    },
    {
      "name": "C",
      "level": 3,
      "smallCount": 1,
      "mediumCount": 1,
      "largeCount": 1,
      "xLargeCount": 1
    }
  ],
  "registrationId": 4
}
```
registrationId is mandatory field.
floors: Array of Floor JSON.
The floor contains the data like the name of the floor (I have used A, B, C), level of the floor (Like 1, 2, 3, 4) and the counts of number of slots.
The slots are generated based on the above count.
slotName -> floorName+Size(S, M, L, X)+index(1, 2, 3)
For e.g the 5th Medium Slot on the B Floor will be named as -> BM5

### Get Parking Slot (GET)
The API endpoint is:
```
http://localhost:3000/api/onboarding/<registrationId>
```
E.g:
```
http://localhost:3000/api/onboarding/1
```
This API is called from the app when the user logs into the app.
RegistrationId is required to login.

The response returned is:
```json
{
    "id": 1,
    "registrationId": "2",
    "name": "Pacific Mall"
}
```
The ```id``` is used to authenticate the other APIs.

If No Parking Lot is found with the given registrationId, below response is returned with 404 error code:
```json
 No Parking lot found by given registrationId
```

### Alottment (POST)
The below Endpoint is called:
```
http://localhost:3000/api/getslot/<Parking-Lot-Id>/<size>
```
E.g: 
```
http://localhost:3000/api/getslot/1/small
```

Size needs to be a string and can have values: small, medium, large, xlarge

The below response is returned:
```json
{
    "slotId": 36,
    "floorId": 1,
    "floorName": "A",
    "slotName": "AS36",
    "level": 1,
    "slot": "1-36"
}
```

In case no slot is found, the below error is returned to the user with 500 code:
```
Sorry! All slots are full
```

### Release (POST)
The below endpoint is called:
```
http://localhost:3000/api/releaseslot/<Parking-Lot-Id>/<Slot-Id>
```
E.g:
```
http://localhost:3000/api/releaseslot/1/1202
```

The below response is returned:
```json
{
    "message": "The slot is released"
}
```

## Front-End
The front end is built in flutter.
Libraries used:
1) Dio -> Network
2) Provider -> State management
3) Shared Preferences -> Storage

The flow looks as below:
UI -> Provider -> Repository -> BaseApiProvider

Pages: SplashScreen -> LoginPage || SelectionPage -> SelectionPage -> AllotmentPage || ReleasePage || LogingPage(From logout option)

![login](https://github.com/reytum/Park-Assistant/blob/main/images/login.png)
![select](https://github.com/reytum/Park-Assistant/blob/main/images/select.png)
![allot](https://github.com/reytum/Park-Assistant/blob/main/images/allot.png)
![allot_err](https://github.com/reytum/Park-Assistant/blob/main/images/allot_error.png)
![release](https://github.com/reytum/Park-Assistant/blob/main/images/release.png)

# Atomicity
The DB used is postgres, so the Atomicity is maintained. 
While booking a slot, we are running 2 quering:
1) Get a slot where the vehicleNumber is null sorted by size ASC, where size >= requiredSize LIMIT 1
2) Update the SLOT set vehicleNumber as "1"

The above two queries are running in a single transaction, so its either all done or complete rollback.
We are ensured that a single slot is not allocated to multiple vehicles.

# Scaling the application
Due to time restrictions and system boundations, I was not able to setup docker.
Usually the DB setup and deployment would happen from the Docker file.
Here we are just running the app in a single container.

Once the application grows, we will monitor the application server spikes and database connection spikes.
The database server will be scaled vertically.
The application server will be scaled horizontally.

To scale the server horizontally, we would need a load balancer to ditribute our requests accross multiple instances.
We would be using PM2 for our node application.

```
npm install pm2 -g
```

To run the app using pm2, we will use the below command:
```
pm2 start app.ts -i 2
```
2 in the above command means we would be distributing the load into 2 instances.

# Logging and Tracing a call
For Mobile app we can use firebase performance sdk for tracing API metrics and the widget build times and firebase crashlytics to log catched errors which are veri helpfull in identify prod issues. We can log into sentry as well.

For server app, we can use kibana to log the requests.

## Tracing
To trace the API calls, we can use a header x-tracker in all the API requests. The x-tracker can be generated from the clients using a uuid generator and sent into all the API calls. This tracker would be helpfull to trace the API call in kibana logs and identify what happened with the request if anything unsual happens.
We can integrate New Relic to see the metrics on how the server is performing.

# Test coverage
Due to time constraint, I have added only few test cases in the app as well as the server just to display how we can write the tests.

Frameworks Used
## Node
1) jest
2) ts-mockito

### Run the tests
To run the tests, we need to enable in-memory database in our sequelizeConnection.
Open the file ```src/database/config.ts``` and uncomment the below line:
```
//storage: ":memory:" //UnComment for test
```
Note: This can be done via env variables directly, But had some issues with setting it up.

The run the below command:
```
npm run test
```

Below is the coverage report for the same:

![login](https://github.com/reytum/Park-Assistant/blob/main/images/node-test.png)

## Flutter
1) mockito
2) test

# Few cases not handled
Few of the edge cases have not been handled in the server due to time constraint. The comments are addeed for the same
1) Validations -> Only null check are added as of now, we need to add more precise validations to errors are precise.
2) In Allotment, to join the tables and get the first empty slot, I have used raw query, will have to use ORM to do this. 
3) In Allotment two queries are used in a single transaction, we can do the get and update in a single query.
4) Proper errors are not thrown right now, generic error messages and codes are thrown.
5) Test coverage report is not 100 percent.
6) Docker file not added to set ENV variables for database config. 
7) DI not used in app along with MVVM and Clean architecture.












