(function (angular) {
'use strict';
	angular.module('ngMonitor', []).directive('monitor', ['$compile', function ($compile) {	

		return {
			restrict: 'A',			
			replace: true,			
			link:function (scope, elm, attr) {		

				if (!attr.id)
					return;
				var canvas=document.getElementById(attr.id);
				var ctx=canvas.getContext('2d');
				if (!canvas.getContext)
					return;

				if (attr.w && attr.h) {
					canvas.width = attr.w;
					canvas.height = attr.h;
				}

				var w = canvas.width;
				var h = canvas.height;	

				var isDef = angular.isDefined;
				var prc = null;

				scope.$on('ng-monitor', function(event, o) {
					if (!isDef(o) || !isDef(o.prc))
						return;
					prc = o.prc;
					redraw();
				});

				var levels = {
					HIGH : '220,20,60',
					NORMAL: '11,180,130',
					LOW: '0,255,255'
				};		
			 		
			 	// GRID									
			 	var buildGrids = function(gridPixelSize, color, gap) {														
					 
					ctx.lineWidth = 0.5;
					ctx.strokeStyle = 'rgba(11, 180, 130, 0.6)';
					ctx.fillStyle = "#000";
					ctx.fillRect(0,0,canvas.width,canvas.height);
					 
					// horizontal grid lines
					for(var i = 0; i <= canvas.height; i = i + gridPixelSize) {
						ctx.beginPath();
						ctx.moveTo(0, i);
						ctx.lineTo(canvas.width, i);						
						ctx.lineWidth = 0.5;						
						ctx.closePath();
						ctx.stroke();
					}
					 
					// vertical grid lines
					for(var j = 0; j <= canvas.width; j = j + gridPixelSize) {
						ctx.beginPath();
						ctx.moveTo(j, 0);
						ctx.lineTo(j, canvas.height);						
						ctx.lineWidth = 0.5;
						ctx.closePath();
						ctx.stroke();
					}									

				};
				 
				buildGrids(10, '#0bb482', 50);

				// DIGITS
				var buildDigits = function() {
					if (!prc || typeof(prc) != 'number')					
						return;

					var txt = prc +'%';
					var size = Math.round(h/7);
					ctx.font = 'normal '+ size +'px courier';					
					ctx.fillStyle = 'rgba('+ getParadigm().color + ', 0.7)';
					ctx.fillText(txt, w-w/5, h/7);
				};

				buildDigits();

				// HEART
				var drawHeart = function() {
					if (!prc || typeof(prc) != 'number')					
						return;
					// ctx.strokeStyle = "#000000";
					// ctx.strokeWeight = 3;
					// ctx.shadowOffsetX = 4.0;
					// ctx.shadowOffsetY = 4.0;
					var p = getParadigm();
					var size = Math.round(h/8);					

					// ctx.clearRect(size,size-15,size,size+5);
					// ctx.fillStyle = '#000';
					// ctx.fillRect(size,size-15,size,size+5);					

					ctx.lineWidth = 10.0;
					var alpha = 1 / (Math.floor(Math.random() * p.beat) + 1);
					console.log(alpha.toFixed(1));

					ctx.fillStyle = 'rgba('+ p.color + ',0.5)';
					var d = size;// Math.min(w, h);
					var k = 10;

					ctx.moveTo(k, k + d / 4);
					ctx.quadraticCurveTo(k, k, k + d / 4, k);
					ctx.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
					ctx.quadraticCurveTo(k + d / 2, k, k + d * 3/4, k);
					ctx.quadraticCurveTo(k + d, k, k + d, k + d / 4);
					ctx.quadraticCurveTo(k + d, k + d / 2, k + d * 3/4, k + d * 3/4);
					ctx.lineTo(k + d / 2, k + d);
					ctx.lineTo(k + d / 4, k + d * 3/4);
					ctx.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
					//ctx.stroke();
					ctx.fill();

				};

				drawHeart();
 
				var requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame;					

				var x = 0;
				var y = h/3;
				var animFlag;								
				var gap = h/4;

				// GRAPH
				function sineWave() {	

					var p = getParadigm();							

					ctx.lineWidth = 2;		

					var factor = p.factor*x;			

					var y = Math.sin(factor*Math.PI/gap);						
					y = h/2 - (y-0) * gap;

					ctx.fillStyle = 'rgba('+ p.color + ', 0.5)';

					ctx.fillRect(x, y, Math.sin(x * Math.PI/180) * 5, Math.sin(x * Math.PI/180) * 5);						
					x+=0.5;

					if(x > canvas.width) {
						redraw();
					}
					requestAnimationFrame(sineWave);					
				}

				function redraw() {
					x = 0;
					ctx.clearRect(0,0,canvas.width, canvas.height);
					buildGrids(10, '#0bb482', 50);
					buildDigits();
					drawHeart();
				}

				function getParadigm() {
					var c = levels.NORMAL;
					var f = 1;
					var b = 3;
										
					if (prc && prc < 30) {
						c = levels.LOW;
						f = 1;
						b = 1;
					}
					else if (prc && (prc > 30 && prc < 70)) {
						c = levels.NORMAL;
						f = 2;
						b = 3;
					}
					else if (prc) {
						c = levels.HIGH;
						f = 3;
						b = 10;
					}

					return {color: c, factor: f, beat: b};
				}			
					
				sineWave();				

			}
		};
	}]);
})(angular);