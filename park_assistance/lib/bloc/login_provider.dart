import 'package:flutter/cupertino.dart';
import 'package:park_assistance/network/repositories/login_repository.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../utils/constants.dart';

class LoginProvider extends ChangeNotifier {
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
  final LoginRepository _loginRepository = LoginRepository();
  bool? isLoggedIn;
  int? parkingLotId = -1;
  String errorText = "";

  LoginProvider() {
    _prefs.then((value) {
      isLoggedIn = (value.getInt(Constants.parkingLotId) ?? 0) > 0;
      notifyListeners();
    });
  }

  Future<bool> logout() async {
    final prefs = await _prefs;
    prefs.setInt(Constants.parkingLotId, -1);
    isLoggedIn = false;
    return true;
  }

  onTextChange(String text) {
    if (text.isEmpty) {
      parkingLotId = null;
      errorText = "";
      notifyListeners();
    } else {
      parkingLotId = int.tryParse(text);
      if (parkingLotId == null) {
        errorText = "Parking Lot Registration Id can only be an integer";
        notifyListeners();
      }
    }
  }

  Future<bool> authenticateParkingLot() async {
    if (parkingLotId == null) {
      errorText = "Invalid Parking Lot Registration Id";
      notifyListeners();
      return false;
    } else {
      try {
        final result =
            await _loginRepository.authenticateParkingLot(parkingLotId!);
        if (result.data?.id != null) {
          final prefs = await _prefs;
          prefs.setInt(Constants.parkingLotId, result.data!.id!.toInt());
          isLoggedIn = true;
          errorText = "";
          notifyListeners();
          return true;
        } else {
          errorText = result.error?.message ?? "Some error occurred";
          notifyListeners();
        }
      } catch (err) {
        errorText = "$err";
        notifyListeners();
      }
    }
    return false;
  }
}
