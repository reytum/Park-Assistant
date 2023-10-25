interface OnboardingRequest {
    name: string | null;
    stateCode: string;
    cityName: string;
    zipcode: string;
    type: string;
    latitude: number;
    longitude: number;
    countryCode: number;
    registrationId: string;
    floors: FloorRequest[];
}

interface FloorRequest {
    name: string | null;
    level: number;
    smallCount: number;
    mediumCount: number;
    largeCount: number;
    xLargeCount: number;
    parkingLots?: ParkingLotRequest[];
}

interface ParkingLotRequest {
    type: string;
    name: string | null;
}