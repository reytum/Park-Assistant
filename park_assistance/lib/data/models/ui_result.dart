import 'package:dio/dio.dart';

class UiResult<T> {
  T? data;
  PaError? error;

  UiResult(this.data, this.error);
}

class PaError {
  String? message;

  PaError({this.message});

  static PaError fromJson(dynamic map) {
    final error = PaError();
    if (map is String) {
      error.message = map;
    } else if (map is Map) {
      error.message = map["error"];
    } else if (map is DioError) {
      return fromJson(map.response?.data);
    } else {
      error.message = "Some error occurred";
    }
    return error;
  }
}
