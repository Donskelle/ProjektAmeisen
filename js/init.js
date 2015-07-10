/**
 * Init
 */
$(function() {
	var stage, output;
	stage = new createjs.Stage("demoCanvas");
	

	stage.canvas.width = $(window).width();
	stage.canvas.height = $(window).height(); 

	stage.enableMouseOver();
				

				
	// draw line
	createjs.Ticker.addEventListener("tick", tick);

	stage.enableMouseOver();
	var connection = null;

	for (var i=0; i<5; i++) {
	    var end = new createjs.Shape().set({
	        x: Math.random()*stage.canvas.width,
	        y: Math.random()*stage.canvas.height,
	        cursor: "pointer",
	        name:"target"
	    });
	    end.graphics.f(createjs.Graphics.getRGB(Math.random()*0xFFFFFF))
	        .dc(0,0,20);
	    stage.addChild(end);
	    end.on("dblclick", handlePress);
	    end.on("pressmove", handleMove);
	}

	$('body').on('contextmenu', '#demoCanvas', function(e){ return false; });

	function handleMove(evt) {
		// currentTarget will be the container that the event listener was added to:
		evt.currentTarget.x = evt.stageX;
		evt.currentTarget.y = evt.stageY;
		// make sure to redraw the stage to show the change:
		stage.update();   
	}


	function handlePress(event) {
	    connection = new createjs.Shape().set({
	        x:event.target.x, 
	        y:event.target.y,
	        mouseEnabled:false,
	        graphics: new createjs.Graphics().s("#00f").dc(0,0,50)
	    });
	    stage.addChild(connection);
	    stage.addEventListener("stagemousemove", drawLine);
	    stage.addEventListener("stagemouseup", endDraw);
	}

	function drawLine(event) {
	    connection.graphics.clear()
	        .s("#f00")
	        .mt(0,0).lt(stage.mouseX-connection.x, stage.mouseY-connection.y);
	}

	function endDraw() {
	    var target, targets = stage.getObjectsUnderPoint(stage.mouseX, stage.mouseY);
	    console.log(targets);
	    for (var i=0; i<targets.length; i++) {
	        if (targets[i].name == "target") { target = targets[i]; break; }   
	    }
	    
	    if (target != null) {
	        connection.graphics.clear()
	        .s("#00f")
	        .mt(0,0).lt(target.x-connection.x, target.y-connection.y);
	    } else {
	        stage.removeChild(connection);
	    }
	    
	    stage.removeEventListener("stagemousemove", drawLine);
	    stage.removeEventListener("stagemouseup", endDraw);
	}

	function tick(event) {
	    stage.update();
	}


	$(function() {
		$( ".draggable" ).draggable({ snap: ".draggable", containment: 'parent',  handle: ".handle" });
		// $( "#draggable2" ).draggable({ snap: ".draggable" });
		// $( "#draggable3" ).draggable({ snap: ".ui-widget-header", snapMode: "outer" });
		// $( "#draggable4" ).draggable({ grid: [ 20, 20 ] });
		// $( "#draggable5" ).draggable({ grid: [ 80, 80 ] });
	});

	stage.update();
});

