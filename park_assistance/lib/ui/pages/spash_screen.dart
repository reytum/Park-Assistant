import 'package:flutter/material.dart';
import 'package:park_assistance/bloc/login_provider.dart';
import 'package:park_assistance/ui/pages/login_page.dart';
import 'package:park_assistance/ui/pages/selection_page.dart';
import 'package:provider/provider.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      loginProvider.checkAuth();
    });

    return ChangeNotifierProvider<LoginProvider>(
      create: (context) => loginProvider,
      child: Consumer<LoginProvider>(
        builder: (context, themeProvider, child) => MaterialApp(
          theme: ThemeData(
            primarySwatch: Colors.blue,
            appBarTheme: const AppBarTheme(),
          ),
          home: themeProvider.isLoggedIn == null
              ? const Column(
                  children: [
                    SizedBox(height: 120),
                    Icon(color: Colors.deepOrange, size: 200, Icons.car_rental),
                    Text("Park Assistance",
                        style: TextStyle(
                            color: Colors.deepOrange,
                            fontStyle: FontStyle.normal))
                  ],
                )
              : (themeProvider.isLoggedIn!
                  ? const SelectionPage()
                  : const LoginPage()),
        ),
      ),
    );
  }
}
