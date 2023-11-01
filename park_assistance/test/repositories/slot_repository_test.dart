import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:park_assistance/data/models/api_result.dart';
import 'package:park_assistance/data/models/slot_response.dart';
import 'package:park_assistance/data/models/ui_result.dart';
import 'package:park_assistance/network/base_api_provider.dart';
import 'package:park_assistance/network/repositories/slot_repository.dart';
import 'slot_repository_test.mocks.dart';

@GenerateNiceMocks([MockSpec<BaseApiProvider>()])
void main() {
  late MockBaseApiProvider apiProvider;
  late SlotRepository slotRepository;

  setUp(() {
    TestWidgetsFlutterBinding.ensureInitialized();
    apiProvider = MockBaseApiProvider();
    slotRepository = SlotRepository(apiProvider);
  });

  group('bookSlot', () {
    test('Invalid size is entered', () async {
      final result = await slotRepository.bookSlot(1, 5);
      assert(result.error != null);
      expect(result.error?.message, "Invalid size");
    });

    test('Successfully booked a slot', () async {
      when(apiProvider.post("/getslot/1/small"))
          .thenAnswer((_) async => ApiResult(
              Response(data: {
                "slotId": 36,
                "floorId": 1,
                "floorName": "A",
                "slotName": "AS36",
                "level": 1,
                "slot": "1-36"
              }, requestOptions: RequestOptions(path: '')),
              null));
      final result = await slotRepository.bookSlot(1, 1);
      expect(result, isA<UiResult<AllotmentResponse>>());
      expect(result.data!.slotId, 36);
    });

    test('Slot not available error as text', () async {
      when(apiProvider.post("/getslot/1/large")).thenAnswer(
          (_) async => ApiResult(null, "Sorry! All slots are full!!!"));
      final result = await slotRepository.bookSlot(1, 3);
      assert(result.error != null);
      expect(result.error?.message, "Sorry! All slots are full!!!");
    });

    test('Slot not available error as json', () async {
      when(apiProvider.post("/getslot/1/large")).thenAnswer((_) async =>
          ApiResult(null, {"error": "Sorry! All slots are full!!!"}));
      final result = await slotRepository.bookSlot(1, 3);
      assert(result.error != null);
      expect(result.error?.message, "Sorry! All slots are full!!!");
    });
  });

  group('releaseSlot', () {
    test("Release slot successfully", () async {
      when(apiProvider.post("/releaseslot/1/1")).thenAnswer((_) async => null);
      final result = await slotRepository.releaseSlot(1, 1);
    });
  });
}
