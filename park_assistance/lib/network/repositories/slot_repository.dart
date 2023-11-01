import 'package:park_assistance/data/models/slot_response.dart';
import 'package:park_assistance/data/models/ui_result.dart';
import 'package:park_assistance/network/repositories/base_repository.dart';

class SlotRepository extends BaseRepository {
  final _allotSlotUrl = "/getslot";
  final _releaseSlotUrl = "/releaseslot";
  final sizeMap = {1: "small", 2: "medium", 3: "large", 4: "xlarge"};

  SlotRepository(super.apiProvider);

  Future<UiResult<AllotmentResponse>> bookSlot(int lotId, int size) async {
    if (size < 1 || size > 4) {
      return UiResult(null, PaError(message: "Invalid size"));
    }
    final result = await apiProvider
        .post("$_allotSlotUrl/$lotId/${sizeMap[size]}");
    if (result?.response?.data != null) {
      final response = AllotmentResponse.fromJson(result?.response?.data);
      return UiResult(response, null);
    }
    return UiResult(null, PaError.fromJson(result?.error));
  }

  Future<UiResult<ReleaseResponse>> releaseSlot(int lotId, int slotId) async {
    final result =
        await apiProvider.post("$_releaseSlotUrl/$lotId/$slotId");
    if (result?.response?.data != null) {
      final response = ReleaseResponse.fromJson(result?.response?.data);
      return UiResult(response, null);
    }
    return UiResult(null, PaError.fromJson(result?.error));
  }
}
