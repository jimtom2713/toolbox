$(function(){ // on dom ready

// photos from flickr with creative commons license
  
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
        'border-color': '#000',
        'border-width': 3,
        'border-opacity': 0.5,
        'background-image': 'http://www.charbase.com/images/glyph/127866'
      })
    .selector('.eating')
      .css({
        'border-color': 'red'
      })
    .selector('.eater')
      .css({
        'border-width': 9
      })
    .selector('edge')
      .css({
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa'
      }),
    /*.selector('#bird')
      .css({
        'background-image': 'http://www.charbase.com/images/glyph/127866'
      })
    .selector('#cat')
      .css({
        'background-image': 'http://www.charbase.com/images/glyph/127866'
      })
    .selector('#ladybug')
      .css({
        'background-image': 'http://www.charbase.com/images/glyph/127866'
      })
  .selector('#aphid')
      .css({
        'background-image': 'http://www.charbase.com/images/glyph/127866'
      })
  .selector('#rose')
      .css({
        'background-image': 'http://www.charbase.com/images/glyph/127866'
      })
  .selector('#grasshopper')
      .css({
        'background-image': 'http://www.charbase.com/images/glyph/127866'
      })
  .selector('#plant')
      .css({
        'background-image': 'http://www.charbase.com/images/glyph/127866'
      })
  .selector('#wheat')
      .css({
        'background-image': 'http://www.charbase.com/images/glyph/127866'
      }),
 */ 
  elements: {
    nodes: [
      { data: { id: 'cat', name: 'Jimmy' } },
      { data: { id: 'bird' } },
      { data: { id: 'ladybug' } },
      { data: { id: 'aphid' } },
      { data: { id: 'rose' } },
      { data: { id: 'grasshopper' } },
      { data: { id: 'plant' } },
      { data: { id: 'wheat' } }
    ],
    edges: [
      { data: { source: 'cat', target: 'bird' } },
      { data: { source: 'cat', target: 'ladybug' } },
      { data: { source: 'cat', target: 'grasshopper' } },
      { data: { source: 'cat', target: 'plant' } },
      { data: { source: 'cat', target: 'wheat' } },
      { data: { source: 'cat', target: 'aphid' } },
      { data: { source: 'cat', target: 'rose' } }
    ]
  },
    layout: {
      name: "circle",
      fit: true,
      padding: 30,
      avoidOverlap: true,
      radius: 50
    }
/*  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 10
  }*/
}); // cy init
  
cy.on('click', 'node', function(){
  var nodes = this;
  var tapped = nodes;
  var food = [];
  
  // nodes.addClass('eater');
  nodes.toggleClass('eater');
  
  for(;;){
    var connectedEdges = nodes.connectedEdges(function(){
      return !this.target().anySame( nodes );
    });
    
    var connectedNodes = connectedEdges.targets();
    
    Array.prototype.push.apply( food, connectedNodes );
    
    nodes = connectedNodes;
    
    if( nodes.empty() ){ break; }
  }
        
  var delay = 0;
  var duration = 500;
/*  for( var i = food.length - 1; i >= 0; i-- ){ (function(){
    var thisFood = food[i];
    var eater = thisFood.connectedEdges(function(){
      return this.target().same(thisFood);
    }).source();
            
    thisFood.delay( delay, function(){
      eater.addClass('eating');
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
        thisFood.remove();
      }
    });
    
    delay += duration;
  })(); }*/ // for
  
}); // on tap

}); // on dom ready