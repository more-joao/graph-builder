/**
 * MODES
 * 0 - select/move
 * 1 - add vertex
 * 2 - add edge
 * 3 - remove
 * 4 - edit
 */
 
class Vertex {
  constructor(label, degree, posOnCanvas, object) {
    this.label = label;
    this.degree = degree;
    this.posOnCanvas = posOnCanvas;
    this.object = object;
  }
  
  getDegree() {
    return this.degree;
  }
  
  setDegree(newDegree) {
    this.degree = newDegree;
  }
  
  getObject() {
    return this.object;
  }
}

class Edge {
  constructor(weight, vertices, object) {
    this.weight = weight;
    this.vertices = vertices;
    this.object = object;
  }
  
  getWeight() {
    return this.weight;
  }
  
  setWeight(newWeight) {
    this.weight = newWeight;
  }
  
  getObject() {
    return this.object;
  }
}

ACTIVE_MODE = 0
VERTICES = []
EDGES = []
LABEL = 0

window.onload = function () {
  const canvas = document.getElementById("canvas");
  const toolsContainer = document.getElementById("toolbar");
  const canvasContainer = document.getElementById("graph_canvas");
  const ctx = canvas.getContext("2d");
  const addVertexButton = document.getElementById("add_vertex");
  const newEdgeButton = document.getElementById("new_edge");
  const removeButton = document.getElementById("remove");
  const moveButton = document.getElementById("move");
  
  var buttonController = [moveButton, addVertexButton, newEdgeButton, removeButton];
  
  canvas.height = canvasContainer.offsetHeight;
  canvas.width = canvasContainer.offsetWidth;
  
  window.addEventListener('resize', function(event) {
    canvas.height = canvasContainer.offsetHeight;
    canvas.width = canvasContainer.offsetWidth;
    
    for (i=0;i<VERTICES.length;i++) {
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 5;
      ctx.stroke(VERTICES[i].object);
	    ctx.fill(VERTICES[i].object);
    }
  });

  /* BUTTON TOGGLING */
  
  moveButton.addEventListener('click', (event) => {
    if (ACTIVE_MODE != 0) {
      buttonController[ACTIVE_MODE].style.backgroundColor = "white";
    }
    buttonController[0].style.backgroundColor = "red";
    ACTIVE_MODE = 0;
  });
  
  addVertexButton.addEventListener('click', (event) => {
    if (ACTIVE_MODE == 1) {
	  buttonController[1].style.backgroundColor = "white";
      ACTIVE_MODE = 0;
    } else {
      buttonController[ACTIVE_MODE].style.backgroundColor = "white";
      buttonController[1].style.backgroundColor = "red";
      ACTIVE_MODE = 1;
    }
  });
    
  newEdgeButton.addEventListener('click', (event) => {
    if (ACTIVE_MODE == 2) {
	  buttonController[2].style.backgroundColor = "white";
      ACTIVE_MODE = 0;
    } else {
      buttonController[ACTIVE_MODE].style.backgroundColor = "white";
      buttonController[2].style.backgroundColor = "red";
      ACTIVE_MODE = 2;
    }
  });
    
  removeButton.addEventListener('click', (event) => {
    if (ACTIVE_MODE == 3) {
	  buttonController[3].style.backgroundColor = "white";
      ACTIVE_MODE = 0;
    } 
		
	else {
      buttonController[ACTIVE_MODE].style.backgroundColor = "white";
      buttonController[3].style.backgroundColor = "red";
      ACTIVE_MODE = 3;
    }
  });
  
  canvas.addEventListener('click', function(event) {
    if (ACTIVE_MODE == 1) {
      var circle = new Path2D();
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 5;
      circle.moveTo(event.x, event.y);
      circle.arc(event.x, event.y, 10, 0, 2 * Math.PI);
      ctx.stroke(circle);
	    ctx.fill(circle);
      var vertex = new Vertex(LABEL, 0, [event.x, event.y], circle);
	    VERTICES.push(vertex);
	    LABEL = LABEL+1;
    }
    
    else if (ACTIVE_MODE == 2) {
      console.log("add edge");
    }
    
    else if (ACTIVE_MODE == 3) {
      console.log("remove");
    }
    
    else if (ACTIVE_MODE == 0) {
      console.log("move");
    }
  });
};
