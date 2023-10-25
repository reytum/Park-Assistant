import 'dart:collection';

import 'package:dio/dio.dart';

class HeaderInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    final headers = HashMap<String, dynamic>();
    headers["content-type"] = "application/json";
    options.headers.addAll(headers);
    super.onRequest(options, handler);
  }
}