import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:park_assistance/bloc/login_provider.dart';
import 'package:park_assistance/data/models/api_result.dart';
import 'package:park_assistance/network/base_api_provider.dart';
import 'package:park_assistance/network/repositories/login_repository.dart';
import 'package:park_assistance/utils/constants.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../repositories/slot_repository_test.mocks.dart';

@GenerateMocks([BaseApiProvider])
void main() {
  late LoginRepository loginRepository;
  late LoginProvider loginProvider;
  late MockBaseApiProvider baseApiProvider;

  setUp(() {
    TestWidgetsFlutterBinding.ensureInitialized();
    baseApiProvider = MockBaseApiProvider();
    loginRepository = LoginRepository(baseApiProvider);
    SharedPreferences.setMockInitialValues({Constants.parkingLotId: -1});
    loginProvider =
        LoginProvider(SharedPreferences.getInstance(), loginRepository);
  });

  group('onTextChange', () {
    test('registrationId is entered as string', () {
      loginProvider.onTextChange("text");
      expect(loginProvider.errorText,
          "Parking Lot Registration Id can only be an integer");
      expect(loginProvider.parkingLotId, null);
    });
    test('registrationId is entered as number', () {
      loginProvider.onTextChange("123");
      expect(loginProvider.errorText, "");
      expect(loginProvider.parkingLotId, 123);
    });
  });

  group('authenticateParkingLot', () {
    test('registrationId is invalid', () async {
      loginProvider.parkingLotId = null;
      final result = await loginProvider.authenticateParkingLot();
      expect(loginProvider.errorText, "Invalid Parking Lot Registration Id");
      expect(result, false);
    });

    test('registrationId does not exist', () async {
      loginProvider.parkingLotId = -1;
      final result = await loginProvider.authenticateParkingLot();
      expect(result, false);
      expect(loginProvider.errorText, "parkingLotId cannot be null");
    });

    test('Successful authentication', () async {
      loginProvider.parkingLotId = 1;
      when(baseApiProvider.get("/onboarding/${loginProvider.parkingLotId}"))
          .thenAnswer((_) async => ApiResult(
              Response(data: {
                "id": loginProvider.parkingLotId,
                "registrationId": loginProvider.parkingLotId.toString(),
                "name": "BT Mall"
              }, requestOptions: RequestOptions(path: "")),
              null));
      final result = await loginProvider.authenticateParkingLot();
      expect(loginProvider.isLoggedIn, true);
      expect(result, true);
      final lotIdInPrefs = (await SharedPreferences.getInstance())
          .getInt(Constants.parkingLotId);
      expect(lotIdInPrefs, loginProvider.parkingLotId);
    });

    test('Authentication failed', () async {
      loginProvider.parkingLotId = 1;
      loginProvider.isLoggedIn = false;
      when(baseApiProvider.get("/onboarding/${loginProvider.parkingLotId}"))
          .thenAnswer((_) async =>
              ApiResult(null, "No Parking lot found by given registrationId"));
      final result = await loginProvider.authenticateParkingLot();
      expect(loginProvider.isLoggedIn, false);
      expect(result, false);
      expect(loginProvider.errorText,
          "No Parking lot found by given registrationId");
    });
  });
}
