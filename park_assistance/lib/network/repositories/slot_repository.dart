import 'package:park_assistance/data/models/slot_response.dart';
import 'package:park_assistance/data/models/ui_result.dart';
import 'package:park_assistance/network/base_api_provider.dart';

class SlotRepository extends BaseApiProvider {
  final _allotSlotUrl = "/getslot";
  final _releaseSlotUrl = "/releaseslot";
  final sizeMap = {1: "small", 2: "medium", 3: "large", 4: "xlarge"};

  Future<UiResult<AllotmentResponse>> bookSlot(int lotId, int size) async {
    if (size < 1 && size > 4) {
      return UiResult(null, PaError(message: "Invalid size"));
    }
    final result =
        await post("$_allotSlotUrl/$lotId/${sizeMap[size]}", data: {});
    if (result?.response?.data != null) {
      final response = AllotmentResponse.fromJson(result?.response?.data);
      return UiResult(response, null);
    }
    return UiResult(null, PaError.fromJson(result?.error));
  }

  Future<UiResult<ReleaseResponse>> releaseSlot(int lotId, int slotId) async {
    final result = await post("$_releaseSlotUrl/$lotId/$slotId", data: {});
    if (result?.response?.data != null) {
      final response = ReleaseResponse.fromJson(result?.response?.data);
      return UiResult(response, null);
    }
    return UiResult(null, PaError.fromJson(result?.error));
  }
}
