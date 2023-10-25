import 'package:flutter/material.dart';
import 'package:park_assistance/ui/pages/login_page.dart';
import 'package:park_assistance/ui/pages/slot_allotment_page.dart';
import 'package:park_assistance/ui/pages/slot_release_page.dart';
import 'package:provider/provider.dart';

import '../../bloc/login_provider.dart';

class SelectionPage extends StatelessWidget {
  const SelectionPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                  padding:
                  const EdgeInsets.symmetric(horizontal: 32, vertical: 10),
                  child: SizedBox(
                    width: 200,
                    child: ElevatedButton(
                        onPressed: () =>
                        {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                  const SlotAllotmentPage()))
                        },
                        child: const Text("Open Allotment Page")),
                  )),
              Padding(
                  padding:
                  const EdgeInsets.symmetric(horizontal: 32, vertical: 10),
                  child: SizedBox(
                    width: 200,
                    child: ElevatedButton(
                        onPressed: () =>
                        {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                  const SlotReleasePage()))
                        },
                        child: const Text("Open Release Page")),
                  )),
              Padding(
                  padding:
                  const EdgeInsets.symmetric(horizontal: 32, vertical: 10),
                  child: SizedBox(
                    width: 200,
                    child: ElevatedButton(
                        onPressed: () {
                          final loginProvider =
                          Provider.of<LoginProvider>(context, listen: false);
                          loginProvider.logout().then((value) {
                            /*Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                    const LoginPage()));*/
                            Navigator.of(context).pushAndRemoveUntil(
                                MaterialPageRoute(
                                    builder: (context) => const LoginPage()),
                                    (Route route) => false);
                          });
                        },
                        child: const Text("Logout")),
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
