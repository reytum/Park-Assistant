import 'package:dio/dio.dart';
import 'package:park_assistance/network/interceptors/header_interceptor.dart';

import '../data/models/api_result.dart';

class BaseApiProvider {
  final _defaultConnectTimeout = 15000;
  final _defaultReceiveTimeout = 15000;
  //final baseUrl = "http://localhost:3000/api";
  final baseUrl = "http://10.0.2.2:3000/api";
  late Dio _dio;

  BaseApiProvider() {
    _dio = Dio();
    _dio.options = BaseOptions(
        receiveTimeout: _defaultReceiveTimeout,
        connectTimeout: _defaultConnectTimeout);
    _dio.interceptors.add(HeaderInterceptor());
  }

  Dio getDio() {
    return _dio;
  }

  url(path) {
    return "$baseUrl$path";
  }

  Future<ApiResult?> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final Response response = await _dio.get(
        url(path),
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onReceiveProgress: onReceiveProgress,
      );
      return ApiResult(response, null);
    } catch (e) {
      return ApiResult(null, e);
    }
  }

  Future<ApiResult?> post(
    String path, {
    data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final Response response = await _dio.post(
        url(path),
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return ApiResult(response, null);
    } catch (e) {
      return ApiResult(null, e);
    }
  }
}
