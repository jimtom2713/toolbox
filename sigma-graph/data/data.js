/**
 * Just a simple example to show how to use the sigma.layout.forceAtlas2
 * plugin:
 *
 * A random graph is generated, such that its nodes are separated in some
 * distinct clusters. Each cluster has its own color, and the density of
 * links is stronger inside the clusters. So, we expect the algorithm to
 * regroup the nodes of each cluster.
 */
var i,
    s,
    o,
    N = 10,
    E = 50,
    C = 5,
    d = 0.5,
    cs = [],
    g = {
      nodes: [],
      edges: []
    };
// Generate the graph:
for (i = 0; i < C; i++)
  cs.push({
    id: i,
    nodes: [],
    color: '#' + (
      Math.floor(Math.random() * 16777215).toString(16) + '000000'
    ).substr(0, 6)
  });
for (i = 0; i < N; i++) {
  o = cs[(Math.random() * C) | 0];
  g.nodes.push({
    id: 'n' + i,
    label: 'Node' + i,
    x: 100 * Math.cos(2 * i * Math.PI / N),
    y: 100 * Math.sin(2 * i * Math.PI / N),
    size: Math.random(),
    color: o.color
  });
  o.nodes.push('n' + i);
}
for (i = 0; i < E; i++) {
  if (Math.random() < 1 - d)
    g.edges.push({
      id: 'e' + i,
      source: 'n' + ((Math.random() * N) | 0),
      target: 'n' + ((Math.random() * N) | 0)
    });
  else {
    o = cs[(Math.random() * C) | 0]
    g.edges.push({
      id: 'e' + i,
      source: o.nodes[(Math.random() * o.nodes.length) | 0],
      target: o.nodes[(Math.random() * o.nodes.length) | 0]
    });
  }
}
s = new sigma({
  graph: g,
  container: 'graph-container',
  settings: {
    drawEdges: false
  }
});
// Start the ForceAtlas2 algorithm:
s.startForceAtlas2({worker: true, barnesHutOptimize: false});


/*var data = {
  "nodes": [
    {
      "id": "n0",
      "label": "A node",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n1",
      "label": "Another node",
      "x": 3,
      "y": 1,
      "size": 2
    },
    {
      "id": "n2",
      "label": "And a last one",
      "x": 1,
      "y": 3,
      "size": 1
    }
  ],
  "edges": [
    {
      "id": "e0",
      "source": "n0",
      "target": "n1"
    },
    {
      "id": "e1",
      "source": "n1",
      "target": "n2"
    },
    {
      "id": "e2",
      "source": "n2",
      "target": "n0"
    }
  ]
};

// sigma.parsers.json(data, {
//   container: 'container',
//   settings: {
//     defaultNodeColor: '#ec5148'
//   }
// });

var s = new sigma({ 
        graph: data,
        container: 'container',
        settings: {
            defaultNodeColor: '#ec5148'
        }
});
*/