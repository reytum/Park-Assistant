import 'package:park_assistance/data/models/parking_lot_response.dart';
import 'package:park_assistance/data/models/ui_result.dart';
import 'package:park_assistance/network/base_api_provider.dart';

class LoginRepository extends BaseApiProvider {
  final String _parkingLotAuthUrl = "/onboarding";

  Future<UiResult<ParkingLotResponse>> authenticateParkingLot(
      int parkingLotId) async {
    if (parkingLotId <= 0) {
      null;
    }
    final result = await get("$_parkingLotAuthUrl/$parkingLotId");
    if (result?.response?.data != null) {
      return UiResult(
          ParkingLotResponse.fromJson(result?.response?.data), null);
    }
    return UiResult(null, PaError.fromJson(result?.error));
  }
}
