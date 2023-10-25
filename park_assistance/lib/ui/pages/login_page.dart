import 'package:flutter/material.dart';
import 'package:park_assistance/ui/pages/selection_page.dart';
import 'package:provider/provider.dart';

import '../../bloc/login_provider.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<LoginProvider>(
        create: (context) => LoginProvider(),
        child: Consumer<LoginProvider>(
          builder: (context, loginProvider, child) => Scaffold(
            body: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: TextField(
                    onChanged: loginProvider.onTextChange,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      hintText: 'Enter the Parking Lot Registration Id',
                    ),
                  ),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ElevatedButton(
                      onPressed: () =>
                          loginProvider.authenticateParkingLot().then((value) {
                            if (value) {
                              Navigator.of(context).pushAndRemoveUntil(
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          const SelectionPage()),
                                  (Route route) => false);
                            }
                          }),
                      child: const SizedBox(
                          height: 36,
                          child: Center(child: Text("Authenticate")))),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Text(loginProvider.errorText,
                      style: const TextStyle(fontSize: 14, color: Colors.red)),
                )
              ],
            ),
          ),
        ));
  }
}
