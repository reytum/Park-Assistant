class ParkingLotResponse {
  num? id;
  String? registrationId;
  String? name;

  toJson() => {"id": id, "registrationId": registrationId, "name": name};

  static ParkingLotResponse fromJson(dynamic map) {
    final response = ParkingLotResponse();
    if (map != null) {
      response.id = map["id"];
      response.registrationId = map["registrationId"];
      response.name = map["name"];
    }
    return response;
  }
}
