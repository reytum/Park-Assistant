import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:park_assistance/bloc/slot_allot_provider.dart';
import 'package:provider/provider.dart';

class SlotAllotmentPage extends StatelessWidget {
  const SlotAllotmentPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<SlotAllotmentProvider>(
        create: (context) => SlotAllotmentProvider(),
        child: Consumer<SlotAllotmentProvider>(
            builder: (context, slotProvider, child) => Scaffold(
                    body: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text("Choose a slot",
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 18)),
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            AllotSizeWidget(size: 1),
                            AllotSizeWidget(size: 2)
                          ],
                        ),
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            AllotSizeWidget(size: 3),
                            AllotSizeWidget(size: 4)
                          ],
                        ),
                        Padding(
                          padding: const EdgeInsets.only(top: 16.0),
                          child: Text(slotProvider.messageHeader,
                              style: const TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 18)),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(5.0),
                          child: Text(slotProvider.messageBody,
                              style: const TextStyle(
                                  fontWeight: FontWeight.normal, fontSize: 14)),
                        )
                      ],
                    ))));
  }
}

showLoaderDialog(BuildContext context) {
  AlertDialog alert = AlertDialog(
    content: Row(
      children: [
        const CircularProgressIndicator(),
        Container(
            margin: const EdgeInsets.only(left: 7),
            child: const Text("Looking for suitable slot...")),
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

class AllotSizeWidget extends StatelessWidget {
  final int size;

  String getSize() {
    switch (size) {
      case 1:
        return "Small";
      case 2:
        return "Medium";
      case 3:
        return "Large";
      default:
        return "Extra Large";
    }
  }

  Color getColor() {
    switch (size) {
      case 1:
        return Colors.deepOrange;
      case 2:
        return Colors.amber;
      case 3:
        return Colors.blueAccent;
      default:
        return Colors.pinkAccent;
    }
  }

  const AllotSizeWidget({super.key, required this.size});

  @override
  Widget build(BuildContext context) {
    return InkWell(
        onTap: () {
          showLoaderDialog(context);
          Provider.of<SlotAllotmentProvider>(context, listen: false)
              .bookSlot(size)
              .then((value) {
            Navigator.of(context, rootNavigator: true).pop();
          });
        },
        child: Container(
            width: 150,
            decoration: BoxDecoration(
                borderRadius: const BorderRadius.all(Radius.circular(10)),
                color: getColor()),
            margin: const EdgeInsets.only(left: 16, top: 16),
            padding: const EdgeInsets.symmetric(vertical: 40),
            child: Center(
              child: Text(
                getSize(),
                style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white),
              ),
            )));
  }
}
