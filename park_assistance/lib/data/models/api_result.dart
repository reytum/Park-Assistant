import 'package:dio/dio.dart';

class ApiResult<T> {
  Response<T>? response;
  dynamic error;

  ApiResult(this.response, this.error);
}
