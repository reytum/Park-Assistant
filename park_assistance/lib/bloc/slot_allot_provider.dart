import 'package:flutter/cupertino.dart';
import 'package:park_assistance/network/repositories/slot_repository.dart';
import 'package:park_assistance/utils/constants.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SlotAllotmentProvider extends ChangeNotifier {
  final SlotRepository _slotRepository = SlotRepository();
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
  String messageHeader = "";
  String messageBody = "";
  int? slotId;

  Future<bool> bookSlot(int size) async {
    messageHeader = "";
    messageBody = "";
    notifyListeners();
    final prefs = await _prefs;
    final lotId = prefs.getInt(Constants.parkingLotId);
    if (lotId != null) {
      final result = await _slotRepository.bookSlot(lotId, size);
      if (result.data != null) {
        messageHeader = "Booked Successfully!!!";
        messageBody =
            "SlotId: ${result.data!.slotId}\nSlot tag: ${result.data!.slot}\nFloor level: ${result.data!.level}\nSlot name: ${result.data!.slotName}";
        notifyListeners();
        return true;
      } else {
        notifyError("Error in booking Slot", result.error?.message);
      }
    } else {
      notifyError("Error in booking Slot", "Parking Lot is Invalid");
    }
    return false;
  }

  notifyError(String? header, String? message) {
    messageHeader = header ?? "";
    messageBody = message ?? "";
    notifyListeners();
  }

  onTextChange(String text) {
    if (text.isEmpty) {
      slotId = null;
      notifyError(null, null);
    } else {
      slotId = int.tryParse(text);
      if (slotId == null) {
        notifyError(null, "Slot Id can only be an integer");
      }
    }
  }

  Future<bool> releaseSlot() async {
    if (slotId == null) {
      notifyError(null, "Invalid slot Id");
      return false;
    } else {
      final prefs = await _prefs;
      final lotId = prefs.getInt(Constants.parkingLotId);
      if (lotId != null) {
        final result = await _slotRepository.releaseSlot(lotId, slotId!);
        if (result.data != null) {
          notifyError("Slot released successfully!!!", result.data?.message);
          return true;
        } else {
          notifyError("Error in releasing slot", result.error?.message);
        }
      }
    }
    return false;
  }
}
