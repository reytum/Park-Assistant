
test("Mocker", () => {
    expect(1).toBe(1)
})

export const obRequestMock = {
    name: "BT Interview Mall",
    cityName: "Bengaluru",
    zipcode: "560081",
    stateCode: "KA",
    countryCode: "IN",
    latitude: 12.348934,
    longitude: 79.3243434,
    type: "mall",
    floors: [
        {
            name: "A",
            level: 1,
            smallCount: 1,
            mediumCount: 1,
            largeCount: 1,
            xLargeCount: 1
        }
    ],
    registrationId: "1"
}

export const obResponseMock = {
    id: 1,
    name: "BT Interview Mall"
}

export const parkingLotMock = {
    id: 1,
    name: "BT Interview Mall",
    cityName: "Bengaluru",
    zipcode: "560081",
    stateCode: "KA",
    countryCode: "IN",
    latitude: 12.348934,
    longitude: 79.3243434,
    type: "mall",
    registrationId: "1",
    createdAt: null,
    updatedAt: null,
    deletedAt: null
}