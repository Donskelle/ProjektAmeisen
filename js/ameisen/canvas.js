function Canvas(_options) {
	var stage;
	var ctx;
	var stageW;
	var stageH;
	var preload;
	var progress;
	var options;
	var bounds;
	var eles = new Array();
	var connections = new Array();

	function init() {
		options = _options;
		var canv = zid(options.canvas);
		//resizeMe();	

		// for mobile - pan to the bottom, hides the location bar
		// need to set a delay though
		setTimeout(function() {window.scrollTo(0, 1);}, 100); 
		
		stageW = window.innerWidth;
		stageH = window.innerHeight;

		bounds = new createjs.Rectangle(
		 	50,
			50,
			stageW - 100,
			stageH - 100
		);

		stage = new createjs.Stage(options.canvas);

		stage.enableMouseOver(10); // if you need mouse rollover
		console.log(stage);
		createjs.Touch.enable(stage, true); // added for mobile	
		
		//makeProgress();
		
		create(); // comment this out when you have preload going
	}

	function makeProgress() {
		
		progress = new createjs.Container();
		// more code in here to make bar or text or whatever, etc.
		// we do not animate the progress here - we do that in preloadProgress()
		stage.addChild(progress);
		stage.update();
		
	}

	function animateProgress(e) {
		
		// zog("progress " + e.target.progress);	
		// this event runs quite quickly and often
		// e.target is the preload object in this case
		// the progress property gives a number from 0-1 representing progress
		// in percent we would multiply by 100
		// we would operate on the progress object we established in makeProgress() 

	}

	function create() {
		
		zog("____ ZIM Create Examples ____"); 
		
		var titleText = "ZIM Create Module";
		var title = makeTitle(titleText);
		
		var circle = zimCircle();
		stage.addChild(circle);
		circle.x = 260; circle.y = 230;
		
		// DRAGGING
		// assuming that we have a createjs stage
		// and two createjs shapes (or bitmaps, etc) called circle and square
		// these could be nested inside various containers (or not)
		// the code behind the zim.drag() function is quite complicated
		
		// to set up dragging and dropping the circle we simply use:
		
		// zim.drag(circle);
		
		
		

			
		// you can make a slider behavior like so:
		var circle2 = zimCircle();
		//stage.addChildcanvCon(circle2,0);	
		
		var slideBounds = new createjs.Rectangle(100,500,600,0); // no y movement
		
		//.drag(circle2, slideBounds, "pointer", "ew-resize", null, true);
		// the tween later needs to capture mousedowns so set that to true above
		// if swiping we usually want that to be false ;-) so it is false by default
		
		// note, here we specify the cursors too
		// to turn off the ability to drag we use:	
		
		// zim.noDrag(circle);
		
		
		// HIT TESTS
		// there are five hit tests available in ZIM
		
		// 1. zim.hitTestPoint(a, x, y)
		// tests to see if a shape (a) is hitting a point (x, y)
		// this is similar to the native hitTest() in createjs
		// but it tests to see if a point on the global stage
		// is hitting the shape even if the shape is
		// nested, rotated, moved or has had a registration change
		// makes use of globalToLocal - always tricky...
		
		var target = makeTarget();
		target.x = stageW/2;
		target.y = stageH/2;
		stage.addChildAt(target,0);	// just to visualize center stage
		

		var hitCheck1 = false;
		circle.on("pressmove", function() {
			if ( zim.hitTestPoint(circle, stageW/2, stageH/2) ) {
				if (!hitCheck1) { // if it was not hitting, now it is...
					hitCheck1 = true;
					zog("hitting stage center");
					title.text = titleText + " :: circle hitting stage center";
					stage.update();
				}				
			} else {
				if (hitCheck1) {// if it was hitting, now it is not...	
					title.text = titleText;				
					hitCheck1 = false;
					stage.update();		
				}
			}
		});
		
		// 2. zim.hitTestReg(a, b)
		// checks to see if a shape (a) is hitting the registration point of an object (b)
		// good for shapes hitting small objects.  Works even if objects are
		// nested, rotated, moved or have had registration changes
		// also handy for snapping (set registration point to middle)
		// makes use of localToLocal - always tricky
		
		// put a square in a container
		var container = new createjs.Container();
		var backing = new createjs.Shape();	
		var w = 200; var h = 100;
		container.setBounds(0,0,w,h);
		backing.graphics.f("#ccc").dr(0,0,w,h);
		container.addChild(backing);
		
		var square = new createjs.Shape();
		var size = 300;
		square.setBounds(0,0,size,size);6543
		square.graphics.f("#666").dr(0,0,size,size);
		container.addChild(square);
		container.x = 600; container.y = 450;
		stage.addChildAt(container,0);
		
		// FIT
		// fit an object into bounds - actually scales and moves
		// obj, left, top, width, height, inside
		var padding = 20;
		zim.fit(square, padding, padding, w-padding*2, h-padding*2);
		
		
		// OUTLINE
		// outline is extremely handy to visualize objects
		// especially with unusual bounds and registration points set	
		// the rectangle shows the bounds, the circle the registration point
		// and the cross shows the origin inside the object (0,0)
		// in this case it is nothing unusual - these all align	
		zim.outline(square);	
		
			
		// check to see if smaller circle hitting reg of nested square
		var hitCheck2 = false;
		circle2.on("pressmove", function() {
			if ( zim.hitTestReg(circle2, square) ) {
				if (!hitCheck2) { // if it was not hitting, now it is...
					hitCheck2 = true;
					zog("hitting registration point of square");
					title.text = titleText + " :: hitting registration point of square";
					stage.update();
				}				
			} else {
				if (hitCheck2) {// if it was hitting, now it is not...	
					title.text = titleText;	
					hitCheck2 = false;
					stage.update();	
				}
			}
		});	
		

		// 3. zim.hitTestRect(a, b, num)
		// checks to see if a shape (a) is hitting a number of points on a rectangle
		// the second parameter (b) is an object with a getBounds() available 
		// this bounds is used as the rectangle
		// the third parameter (num) is how many points along each side of the rectangle
		// get tested - default is 0 which tests only the corners of the rectangle
		// num = 2 would test the corners and two extra points distributed on each side
		// so this would be 4 + 2*4 = 12 points total
		// this technique gives a good way to test a shape and rectangle
		// but watch out for performance at larger numbers - usually 2 or 3 is fine
		// makes use of localToLocal - always tricky
		
		
		// would normally only have one pressmove ;-)
		var hitCheck3 = false;
		circle.on("pressmove", function() {
			if ( zim.hitTestRect(circle, container, 2) ) {
				if (!hitCheck3) { // if it was not hitting, now it is...
					hitCheck3 = true;
					zog("hitting points on rectangle");
					title.text = titleText + " :: hitting points on rectangle";
					stage.update();
				}				
			} else {
				if (hitCheck3) {// if it was hitting, now it is not...	
					title.text = titleText;				
					hitCheck3 = false;
					stage.update();	
				}
			}
		});	
		
		
		// 4. zim.hitTestCircle(a, b, num)
		// checks to see if a shape (a) is hitting a number of points on a circle
		// the second parameter (b) is an object with a getBounds() available 
		// this bounds is used to determine the circle
		// the circle diameter is set to the average of the width and height of the bounds
		// the third parameter (num) is how many points around the circle
		// get tested - default is 8 which tests from 0 every 45 degrees
		// this technique gives a good way to test a shape and circle
		// watch out for performance at larger numbers - usually 12 or so should be fine
		// makes use of localToLocal - always tricky
		// imagine we have a second circle, circle2:
		
		
		var circle3 = zimCircle();
		circle3.x = 714; circle3.y = 230; 
		stage.addChild(circle3);

		var bounds3 = new createjs.Rectangle(
			circle3.radius/2,
			circle3.radius/2,
			stageW-circle3.radius,
			stageH-circle3.radius );
		zim.drag(circle3, bounds3);
		
			
		var hitCheck4 = false;
		circle3.on("pressmove", function() {
			if ( zim.hitTestCircle(circle3, circle, 12) ) {
				if (!hitCheck4) { // if it was not hitting, now it is...
					hitCheck4 = true;
					zog("hitting points on circle");
					title.text = titleText + " :: hitting points on circle";
					stage.update();
				}
			} else {
				if (hitCheck4) {// if it was hitting, now it is not...	
					title.text = titleText;				
					hitCheck4 = false;
					stage.update();
				}
			}
		});		
		
		

		// 5. zim.hitTestBounds(a, b, demo)
		// checks if the bounds of two objects (a,b) are hitting
		// so the objects must have bounds set (setBounds)
		// works even if the shapes are nested, etc.
		// the last parameter (demo) shows the bounds of the objects (optional)
		// (demo should be an empty shape object on the stage)
		// if an object is rotated, the bounds expand 
		// to encompass the original bounding rectangle
		// so the bounding rectangles that are tested are never rotated
		// this is the like the hitTestObject method in Flash
			
		var hitCheck5 = false;
		circle3.on("pressmove", function() {
			if ( zim.hitTestBounds(circle3, container) ) {
				if (!hitCheck5) { // if it was not hitting, now it is...
					hitCheck5 = true;
					zog("bounds hitting");
					title.text = titleText + " :: bounds hitting";
					stage.update();
				}				
			} else {
				if (hitCheck5) {// if it was hitting, now it is not...	
					title.text = titleText;				
					hitCheck5 = false;
					stage.update();		
				}
			}
		});	
		
		// zim.boundsToGlobal is just a function that returns the bounds
		// of an object as a rectangle on the global stage
		// it is used in some of the hit tests
		
		var globalRect = zim.boundsToGlobal(circle);
		
		
		// SCALE
		// a most annoying thing is always having to set both x and y scales
		// 99% of the time these will both be the same
		// so zim.scale() takes care of setting both scaleX and scaleY
		// and the function throws in a stage.update() too!
		
		// zim.scale(circle, 2);
		
		// or use 
		// zim.scaleTo(circle, stage, null, 30); // 30% of stage height
		
		
		// MOVE 
		// use the zim.move(obj, x, y, milliseconds, ease); function to move an object
		// just a little wrapper function for the createjs.Tween
		// ease is optional and defaults to "quad" - use "elastic", "back", "bounce", etc.
		// handles removing the Ticker when the tween is done
		// use for the occasional movement as it makes a Ticker each time
		
		circle2.on("mousedown", function(){
			createjs.Tween.removeTweens(circle2);
		});
		
		circle2.on("pressup", function(){
			zim.move(circle2, 200, 500, 1500, "elasticOut");
		});
		

		// ANIMATE 
		// a wrapper for the createjs Tween class that makes and removes a Ticker
		// target, obj, t, ease, callBack, params, wait
		//circle3.alpha = 0;
		//zim.animate(circle3, {alpha:1}, 1000, null, null, null,500);
		
		
		
		// some helper functions ;-)

		function zimCircle() {
			var i = eles.length ;

			function create() {
				var c = new createjs.Shape();
				var g = c.graphics;
				c.radius = 100;
		

				g.f("#f58e25").dc(0,0,70);

				c.setBounds(-c.radius, -c.radius, c.radius*2, c.radius*2);
				eles[i] = c;
				return c;
			}
			

			function addDrag(c) {
				c.on("mousedown",function(e){
					e.target.graphics.beginStroke("black");
					e.target.graphics.f("rgba(0,0,0,0.1)").dc(0,0,150);
					zog(e.target);
					stage.addChild(e.target);
					console.log(i);
				}); 

				c.on("click",function(e){
					var Circle = create();
					Circle.x = e.target.x;
					Circle.y = e.target.y;

					stage.removeChild(e.target);
					stage.addChild(Circle);
					addDrag(Circle);
					stage.update();
					console.log(i);
					console.log(eles);
				});
				zim.drag(c, bounds);

				for (var j = 0; j < eles.length; j++) {
					if(i == j) {
						// eigenes element, kein Hitest
					}
					else {
						createHitTest(i, j);
						createHitTest(j, i);
					}
				};
			}
			function createHitTest(_i, _j) {
				var hitTest = false;
				console.log("hittest wird erstellt");
				eles[_i].on("pressmove", function() {
					if ( zim.hitTestBounds(eles[_i], eles[_j]) ) {
						if (!hitTest) { // if it was not hitting, now it is...
							hitTest = true;
							zog("circle " + _i + " hits Circle " + _j);
							title.text = titleText + " :: bounds hitting";
							stage.update();
						}				
					} else {
						if (hitTest) {// if it was hitting, now it is not...	
							title.text = titleText;
							zog("circle " + _i + " unhids Circle " + _j);
							hitTest = false;
							stage.update();		
						}
					}
				});	
			}

			var c = create();
			addDrag(c);

			return c;
		}
		
		function makeTitle(t) {	
			var title = new createjs.Text(t, "26px Verdana", "#933");		
			title.textBaseline = "alphabetic";
			title.alpha = .9;
			title.x = 148; 
			title.y = 68;	
			stage.addChild(title);
			stage.update();
			return title;	
		}	
		
		function makeTarget() {
			var target = new createjs.Shape();
			target.graphics.s("black").ss(2).mt(-10,0).lt(10,0).mt(0,-10).lt(0,10);		
			return target;
		}
		
		stage.update();	
	}


	function resizeMe() {
		// strategy:  
		// design for an average dimension 960 x 640
		// all your positioning will be based on these dimensions
		// then scale the whole canvas
		// and pad the left/right or top/bottom as needed
		// you can go further into flexive design http://danzen.com/flexive
	}

	init();
}