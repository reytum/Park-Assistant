// Mocks generated by Mockito 5.4.2 from annotations
// in park_assistance/test/bloc/login_provider_test.dart.
// Do not manually edit this file.

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'dart:async' as _i5;

import 'package:mockito/mockito.dart' as _i1;
import 'package:park_assistance/data/models/parking_lot_response.dart' as _i6;
import 'package:park_assistance/data/models/ui_result.dart' as _i3;
import 'package:park_assistance/network/base_api_provider.dart' as _i2;
import 'package:park_assistance/network/repositories/login_repository.dart'
    as _i4;

// ignore_for_file: type=lint
// ignore_for_file: avoid_redundant_argument_values
// ignore_for_file: avoid_setters_without_getters
// ignore_for_file: comment_references
// ignore_for_file: implementation_imports
// ignore_for_file: invalid_use_of_visible_for_testing_member
// ignore_for_file: prefer_const_constructors
// ignore_for_file: unnecessary_parenthesis
// ignore_for_file: camel_case_types
// ignore_for_file: subtype_of_sealed_class

class _FakeBaseApiProvider_0 extends _i1.SmartFake
    implements _i2.BaseApiProvider {
  _FakeBaseApiProvider_0(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

class _FakeUiResult_1<T> extends _i1.SmartFake implements _i3.UiResult<T> {
  _FakeUiResult_1(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

/// A class which mocks [LoginRepository].
///
/// See the documentation for Mockito's code generation for more information.
class MockLoginRepository extends _i1.Mock implements _i4.LoginRepository {
  MockLoginRepository() {
    _i1.throwOnMissingStub(this);
  }

  @override
  _i2.BaseApiProvider get apiProvider => (super.noSuchMethod(
        Invocation.getter(#apiProvider),
        returnValue: _FakeBaseApiProvider_0(
          this,
          Invocation.getter(#apiProvider),
        ),
      ) as _i2.BaseApiProvider);

  @override
  set apiProvider(_i2.BaseApiProvider? _apiProvider) => super.noSuchMethod(
        Invocation.setter(
          #apiProvider,
          _apiProvider,
        ),
        returnValueForMissingStub: null,
      );

  @override
  _i5.Future<_i3.UiResult<_i6.ParkingLotResponse>> authenticateParkingLot(
          int? parkingLotId) =>
      (super.noSuchMethod(
        Invocation.method(
          #authenticateParkingLot,
          [parkingLotId],
        ),
        returnValue: _i5.Future<_i3.UiResult<_i6.ParkingLotResponse>>.value(
            _FakeUiResult_1<_i6.ParkingLotResponse>(
          this,
          Invocation.method(
            #authenticateParkingLot,
            [parkingLotId],
          ),
        )),
      ) as _i5.Future<_i3.UiResult<_i6.ParkingLotResponse>>);
}
