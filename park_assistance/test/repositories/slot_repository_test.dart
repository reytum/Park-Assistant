import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:park_assistance/data/models/api_result.dart';
import 'package:park_assistance/data/models/ui_result.dart';
import 'package:park_assistance/network/repositories/slot_repository.dart';

@GenerateMocks([Dio])
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  group('bookSlot', () {
    final slotRepository = SlotRepository();
    test('Invalid size is entered', () async {
      final result = await slotRepository.bookSlot(1, 5);
      assert(result.error != null);
      expect(result.error?.message, "Invalid size");
    });

    test('successfully booked a slot', () async {
      when(slotRepository.get("/getslot/1/1"))
          .thenAnswer((realInvocation) async => ApiResult(
              Response(data: {
                "slotId": 36,
                "floorId": 1,
                "floorName": "A",
                "slotName": "AS36",
                "level": 1,
                "slot": "1-36"
              }, requestOptions: RequestOptions(path: '')),
              null));
      expect(await slotRepository.bookSlot(1, 1), isA<UiResult>());
    });
  });
}
