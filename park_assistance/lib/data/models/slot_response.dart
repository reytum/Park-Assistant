class AllotmentResponse {
  num? slotId;
  num? floorId;
  String? floorName;
  String? slotName;
  num? level;
  String? slot;

  toJson() => {
        "slotId": slotId,
        "floorId": floorId,
        "floorName": floorName,
        "slotName": slotName,
        "level": level,
        "slot": slot
      };

  static AllotmentResponse fromJson(dynamic map) {
    final response = AllotmentResponse();
    response.slotId = map["slotId"];
    response.floorId = map["floorId"];
    response.floorName = map["floorName"];
    response.slotName = map["slotName"];
    response.level = map["level"];
    response.slot = map["slot"];
    return response;
  }
}

class ReleaseResponse {
  String? message;

  toJson() => {"message": message};

  static ReleaseResponse fromJson(dynamic map) {
    final response = ReleaseResponse();
    response.message = map["message"];
    return response;
  }
}
