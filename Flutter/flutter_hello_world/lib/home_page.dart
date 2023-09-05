import 'dart:math';

import 'package:flutter/material.dart';

// class HomePage extends StatelessWidget {
//   var count = 0;

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Home'),
//       ),
//       body: Center(
//         child: Text(
//           'Você clicou $count vezes no Floating Action Button',
//           style: TextStyle(
//             fontSize: 18,
//             fontStyle: FontStyle.italic,
//             fontWeight: FontWeight.bold,
//             color: Colors.blue,
//           ),
//         ),
//       ),
//       floatingActionButton: FloatingActionButton(
//         child: const Icon(Icons.add),
//         onPressed: () {
//           count++;
//           print('count', $count);
//         },
//       ),
//     );
//   }
// }

class HomePage extends StatefulWidget {
  @override
  // ignore: no_logic_in_create_state
  State<StatefulWidget> createState() {
    return HomePageState();
  }
}

// class HomePageState extends State<HomePage> {
//   var count = 0;
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Home'),
//       ),
//       body: Center(
//         child: Text(
//           'Você clicou $count vezes no Floating Action Button',
//           style: TextStyle(
//             fontSize: 18,
//             fontStyle: FontStyle.italic,
//             fontWeight: FontWeight.bold,
//             color: Colors.blue,
//           ),
//         ),
//       ),
//       floatingActionButton: FloatingActionButton(
//         child: const Icon(Icons.add),
//         onPressed: () {
//           setState(
//             () {
//               count++;
//             },
//           );
//           print('count: $count');
//         },
//       ),
//     );
//   }
// }

class HomePageState extends State<HomePage> {
  final colors = List.generate(10, (index) {
    final totalDeCores = Colors.primaries.length;
    final indiceAleatorio = Random().nextInt(totalDeCores);
    return Colors.primaries[indiceAleatorio];
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tarefas'),
      ),
      body: Column(
        children: [
          // Padding(
          //   // padding: EdgeInsets.all(),
          // )
          Padding(
            padding: const EdgeInsets.all(15),
            child: Row(
              children: [
                Expanded(
                  child: const TextField(
                    decoration: InputDecoration(
                      labelText: 'Descreva a Tarefa',
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.add),
                )
              ],
            ),
          ),
        ],
      ),
      // body: SizedBox(
      //   width: double.infinity,
      //   height: double.infinity,
      //   child: ListView.builder(
      //     itemCount: 10,
      //     itemBuilder: (context, index) {
      //       final color = colors[index];
      //       return Container(
      //           width: double.infinity,
      //           height: 100,
      //           color: color,
      //           margin: const EdgeInsets.all(8));
      //     },
      //   ),
      //   // child: ListView(
      //   //   // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      //   //   // crossAxisAlignment: CrossAxisAlignment.center,
      //   //   // children: _buildContainers(),
      //   //   children: [
      //   //     for (final color in colors)
      //   //       Container(
      //   //         // width: 80,
      //   //         width: double.infinity,
      //   //         height: 80,
      //   //         color: color,
      //   //         margin: const EdgeInsets.all(8),
      //   //       ),
      //   //   ],
      //   // [
      //   // Container(
      //   //   height: 80,
      //   //   width: 80,
      //   //   color: Colors.red,
      //   // ),
      //   // Container(
      //   //   height: 80,
      //   //   width: 80,
      //   //   color: Colors.blue,
      //   // ),
      //   // Container(
      //   //   height: 80,
      //   //   width: 80,
      //   //   color: Colors.green,
      //   // ),
      //   // ]
      // ),
    );
    // );
  }

  // List<Widget> _buildContainers() {
  //   final List<Widget> containers = [];
  //   for (final color in colors) {
  //     containers.add(Container(
  //       width: 80,
  //       height: 80,
  //       color: color,
  //     ));
  //   }
  //   return containers;
  // }
}
