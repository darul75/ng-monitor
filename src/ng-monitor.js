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
					ctx.fillStyle = 'rgba('+ getColor() + ', 0.7)';
					ctx.fillText(txt, w-w/5, h/7);
				};

				buildDigits();
 
				var requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame;					

				var x = 0;
				var y = h/3;
				var animFlag;	
				var levels = {
					HIGH : '220,20,60',
					NORMAL: '11,180,130',
					LOW: '0,255,255'
				};				

				var gap = h/4;

				// GRAPH
				function sineWave() {				

					ctx.lineWidth = 1;					

					var y = Math.sin(x*Math.PI/gap);						
					y = h/2 - (y-0) * gap;

					ctx.fillStyle = 'rgba('+ getColor() + ', 0.5)';

					ctx.fillRect(x, y, Math.sin(x * Math.PI/180) * 5, Math.sin(x * Math.PI/180) * 5);						
					x+=1;

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
				}

				function getColor() {
					var c = levels.NORMAL;
										
					if (prc && prc < 30) {
						c = levels.LOW;
					}
					else if (prc && (prc > 30 && prc < 70)) {
						c = levels.NORMAL;
					}
					else if (prc) {
						c = levels.HIGH;
					}

					return c;
				}			
					
				sineWave();				

			}
		};
	}]);
})(angular);