import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:park_assistance/bloc/login_provider.dart';
import 'package:park_assistance/network/repositories/login_repository.dart';

@GenerateMocks([LoginRepository])
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  group('onTextChange', () {
    test('registrationId is entered as string', () {
      final loginProvider = LoginProvider();
      loginProvider.onTextChange("text");
      expect(loginProvider.errorText,
          "Parking Lot Registration Id can only be an integer");
      expect(loginProvider.parkingLotId, null);
    });
    test('registrationId is entered as number', () {
      final loginProvider = LoginProvider();
      loginProvider.onTextChange("123");
      expect(loginProvider.errorText, "");
      expect(loginProvider.parkingLotId, 123);
    });
  });
}
