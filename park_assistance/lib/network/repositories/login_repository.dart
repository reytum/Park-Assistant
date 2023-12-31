import 'package:park_assistance/data/models/parking_lot_response.dart';
import 'package:park_assistance/data/models/ui_result.dart';
import 'package:park_assistance/network/repositories/base_repository.dart';

class LoginRepository extends BaseRepository {
  final String _parkingLotAuthUrl = "/onboarding";

  LoginRepository(super.apiProvider);

  Future<UiResult<ParkingLotResponse>> authenticateParkingLot(
      int parkingLotId) async {
    if (parkingLotId <= 0) {
      return UiResult(null, PaError(message: "parkingLotId cannot be null"));
    }
    final result = await apiProvider.get("$_parkingLotAuthUrl/$parkingLotId");
    if (result?.response?.data != null) {
      return UiResult(
          ParkingLotResponse.fromJson(result?.response?.data), null);
    }
    return UiResult(null, PaError.fromJson(result?.error));
  }
}
