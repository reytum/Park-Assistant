import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:park_assistance/bloc/slot_allot_provider.dart';
import 'package:provider/provider.dart';

class SlotReleasePage extends StatelessWidget {
  const SlotReleasePage({super.key});

  showLoaderDialog(BuildContext context) {
    AlertDialog alert = AlertDialog(
      content: Row(
        children: [
          const CircularProgressIndicator(),
          Container(
              margin: const EdgeInsets.only(left: 7),
              child: const Text("Releasing slot...")),
        ],
      ),
    );
    showDialog(
      barrierDismissible: false,
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<SlotAllotmentProvider>(
        create: (context) => SlotAllotmentProvider(),
        child: Consumer<SlotAllotmentProvider>(
          builder: (context, allotmentProvider, child) => Scaffold(
            body: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: TextField(
                    onChanged: allotmentProvider.onTextChange,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      hintText: 'Enter the Slot Id',
                    ),
                  ),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ElevatedButton(
                      onPressed: () {
                        showLoaderDialog(context);
                        allotmentProvider.releaseSlot().then((value) {
                          Navigator.of(context, rootNavigator: true).pop();
                        });
                      },
                      child: const SizedBox(
                          height: 36,
                          child: Center(child: Text("Release Slot")))),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Text(allotmentProvider.messageBody,
                      style: const TextStyle(fontSize: 14, color: Colors.red)),
                )
              ],
            ),
          ),
        ));
  }
}
