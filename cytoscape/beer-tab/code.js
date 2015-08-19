$(function(){ // on dom ready

// photos from flickr with creative commons license

// var user =   { 
//     // "_id" : ObjectId("55d36ff989c41de4603528ed"),  
//     "username" : "iemanatemire", 
//     "password" : "$2a$10$6TFGz7nDdQSCFwAxLDqPjubj.3FITqxM.tAfOdqZ2t4pKh7cTz3y6", 
//     "network" : { 
//       "dRosson" : 3, 
//       "mKurrel" : 0, 
//       "Vandres" : 2, 
//       "stvnwu" : -1 
//       }, 
//     "__v" : 0 
//   };

var user = {
  username: 'mack',
  password: 'argleBargle1',
  network: {'trevor': -3, 'kyle': 0, 'jimmy': 1}
};

var createGraph = function(user){
  var g = {};
  g.nodes = [];
  g.edges = [];
  g.nodes.push({
    data:{
      id: user.username,
      name: user.username
    }
  });
  for(var key in user.network){
    g.nodes.push({
      data:{
        id: key,
        name: key + ': ' + user.network[key],
        beerDebt: user.network[key]
      }
    });
    g.edges.push({
      data:{
        source: user.username,
        target: key,
        beerStatus: user.network[key] < 0 ? 'Buy a beer for' : 'Get a beer from'
      }
    })
  }
  g.edges.push({
    data:{
      source: 'jimmy',
      target: 'mack'
    }
  })
  return g;
};
  
var cy = cytoscape({
  container: document.getElementById('cy'),
  
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(name)',
        'text-valign': 'center',
        'color': 'black',
        'height': 80,
        'width': 80,
        'background-fit': 'cover',
        'border-color': '#162FCE',
        'border-width': 9,
        'border-opacity': 0.5,
        // 'background-image': 'http://www.charbase.com/images/glyph/127866'
        'background-image': 'beerMug.png'
      })
    .selector('.owed')
      .css({
        'border-color': 'red'
      })
    .selector('.owe')
      .css({
        // 'border-width': 9
        'border-color': 'green'
      })
    .selector('edge')
      .css({
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#162FCE',
        'target-arrow-color': '#162FCE',
        'content': 'data(beerStatus)',
        'font-size': 8
      }),
  
  elements: createGraph(user),
    layout: {
      name: "circle",
      fit: true,
      padding: 30,
      avoidOverlap: true,
      radius: 50
    }
}); // cy init

cy.ready(function(){
  var nodes = this;
  // console.log(nodes.elements());
  nodes.elements().forEach(function(element){
    // console.log(element._private.group);
    if(element._private.group === "nodes"  && element._private.data.beerDebt !== undefined){
      // console.log(element._private);
      // element.addClass('owed');
      if(element._private.data.beerDebt > 0){
        element.addClass('owed');
      }else if(element._private.data.beerDebt <= 0){
        element.addClass('owe');
      }
    }
    // stuff.toggleClass('owe');
  })
})
cy.on('click', 'node', function(){
 /* var nodes = this;
  var tapped = nodes;
  var Beer = [];

  for(;;){
    var connectedEdges = nodes.connectedEdges(function(){
      return !this.target().anySame( nodes );
    });
    
    var connectedNodes = connectedEdges.targets();
    
    Array.prototype.push.apply( Beer, connectedNodes );
    
    nodes = connectedNodes;
    
    if( nodes.empty() ){ break; }
  }
        
  var delay = 0;
  var duration = 500;
  for( var i = Beer.length - 1; i >= 0; i-- ){ (function(){
    var thisBeer = Beer[i];
    var eater = thisBeer.connectedEdges(function(){
      return this.target().same(thisBeer);
    }).source();
            
    thisBeer.delay( delay, function(){
      // eater.addClass('owed');
    } ).animate({
      position: eater.position(),
      css: {
        'width': 10,
        'height': 10,
        'border-width': 0,
        'opacity': 0
      }
    }, {
      duration: duration,
      complete: function(){
        thisBeer.remove();
      }
    });
    
    delay += duration;
  })(); }*/ // for
  
}); // on tap

}); // on dom ready