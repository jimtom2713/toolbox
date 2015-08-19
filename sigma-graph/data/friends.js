var users = [
  { 
    // "_id" : ObjectId("55d36ff989c41de4603528ed"),  
    "username" : "iemanatemire", 
    "password" : "$2a$10$6TFGz7nDdQSCFwAxLDqPjubj.3FITqxM.tAfOdqZ2t4pKh7cTz3y6", 
    "network" : { 
      "dRosson" : 3, 
      "mKurrel" : 0, 
      "Vandres" : 2, 
      "stvnwu" : -1 
      }, 
    "__v" : 0 
  },
  { 
    // "_id" : ObjectId("55d36ff989c41de4603528ee"), 
    "username" : "stvnwu", 
    "password" : "$2a$10$UPTvShFGQ3tg7TDUs3Gl8e/prXRWwgPhoVqZAXctRoWsEkESRwlae", 
    "network" : { 
      "dRosson" : -3, 
      "mKurrel" : 2, 
      "Vandres" : 0, 
      "iemanatemire" : 1 
      }, 
    "__v" : 0 
  },
  { 
    // "_id" : ObjectId("55d36ff989c41de4603528ef"), 
    "username" : "Vandres", 
    "password" : "$2a$10$N3xRV.KKgbmP7Fhhglvrbe8ZmhtZsv3y9hpJfwSNDt5DTEJew2AQ2", 
    "network" : { 
      "dRosson" : 0, 
      "mKurrel" : 1, 
      "iemanatemire" : -2, 
      "stvnwu" : 0 
      }, 
    "__v" : 0 
  },
  { 
    // "_id" : ObjectId("55d36ff989c41de4603528f0"), 
    "username" : "mKurrel", 
    "password" : "$2a$10$VbD.LPqeevN38xnCSwfeUO69zkwefRXAglu0ZLdVvEqSR4Z9QRkN6", 
    "network" : { 
      "dRosson" : 3, 
      "iemanatemire" : 0, 
      "Vandres" : -1, 
      "stvnwu" : -2 
      }, 
    "__v" : 0 
  },
  { 
    // "_id" : ObjectId("55d36ff989c41de4603528f1"), 
    "username" : "dRosson", 
    "password" : "$2a$10$r1Ft567W0WM/em47PSUUTuXbnKqFgEhTZiCR62oYxs4sfRS9lZTKa", 
    "network" : { 
      "allenJPrice" : -1, 
      "iemanatemire" : -3, 
      "mKurrel" : -3, 
      "Vandres" : 0, 
      "stvnwu" : 3 
      }, 
    "__v" : 0 
  },
  { 
    // "_id" : ObjectId("55d36ff989c41de4603528f2"), 
    "username" : "allenJPrice", 
    "password" : "$2a$10$rMbHZxA6x5LZntcIY6ZGpOWsYvWBZc4JLdsluOt16i89c4zZFlKdm", 
    "network" : { 
      "dRosson" : 1 
      }, 
    "__v" : 0 
  },
  { 
    // "_id" : ObjectId("55d3703889c41de4603528f3"), 
    "username" : "jimmy", 
    "password" : "$2a$10$U3Hp4jqhyf4mPUwvQ4sdweFY9RMGoAKlNyFmEAudeezYdcC2y8Rxm", 
    "__v" : 0 
  },
  { 
    // "_id" : ObjectId("55d3710b89c41de4603528f4"), 
    "username" : "tom", 
    "password" : "$2a$10$l/ztUPKqNvK4gMcX0ls5COqw3A/CV2xy9AXEldKGBAJsyEl2MwuEy", 
    "__v" : 0 
  }
];

var graph = {
  nodes:[],
  edges:[]
}
var size = 50;
var counter = 0;
var createNode = function(username){
  graph.nodes.push({
    "id": "node" + username,
    "label": username, 
    // "x": 100 * Math.cos(2 * counter * Math.PI / 100),
    // "y": 100 * Math.sin(2 * counter * Math.PI / 100),
    "size": size
  })
}
var createEdges = function(network, mainUser){
  for(var key in network){
    console.log(key);
    graph.edges.push({
      "id": "edge" + key,
      "source": "node" + key, 
      "target": "node" + mainUser
    })
  }
}
var createGraph = function(userObject){
  createNode(userObject.username)
  for(var key in userObject.network){
    createNode(key);
  }
  createEdges(userObject.network, userObject.username)
  graph.nodes.forEach(function(node, i, nodes){
    node.x = Math.cos(2 * i * Math.PI / 10);
    node.y = Math.cos(2 * i * Math.PI / 10);
    counter++;
  })
}
// for(var i=0; i<users.length; i++){
//   createNode(users[i], i);
//   size = 25;
// }
createGraph(users[0]);
console.log(graph);
s = new sigma({ 
  graph: graph,
  container: 'graph-container',
  settings: {
      defaultNodeColor: '#ec5148',
      drawEdges: true
  }
});
// s.startForceAtlas2({worker: true, barnesHutOptimize: false});