(function (angular) {
'use strict';
	angular.module('ngNotification', []).directive('notification', ['$compile', function ($compile) {	

		var classes = {
			primary : 'bg-primary',
			success: 'bg-success',
			info: 'bg-info',
			warning: 'bg-warning',
			danger: 'bg-danger'
		};

		return {
			restrict: 'AE',			
			replace: true,
			template:'<div><canvas id="canvas"></canvas></div>',
			link:function (scope, elm, attr) {

				scope.boot_class = classes.primary;

				var isDef = angular.isDefined;				
			 									
			 	var buildGrids = function(gridPixelSize, color, gap) {
					var canvas=document.getElementById("canvas");
					var ctx=canvas.getContext("2d");
					var w = canvas.width;
					var h = canvas.height;					
					 
					ctx.lineWidth = 0.5;
					ctx.strokeStyle = 'rgba(11, 180, 130, 0.6)';
					ctx.fillStyle = "#000";
					ctx.fillRect(0,0,canvas.width,canvas.height);
					 
					// horizontal grid lines
					for(var i = 0; i <= canvas.height; i = i + gridPixelSize) {
						ctx.beginPath();
						ctx.moveTo(0, i);
						ctx.lineTo(canvas.width, i);
						/*if(i % parseInt(gap) == 0) {
							ctx.lineWidth = 2;
						} else {*/
							ctx.lineWidth = 0.5;
						/*}*/
						ctx.closePath();
						ctx.stroke();
					}
					 
					// vertical grid lines
					for(var j = 0; j <= canvas.width; j = j + gridPixelSize) {
						ctx.beginPath();
						ctx.moveTo(j, 0);
						ctx.lineTo(j, canvas.height);
						/*if(j % parseInt(gap) == 0) {
							ctx.lineWidth = 2;
						} else {*/
							ctx.lineWidth = 0.5;
						/*}*/
						ctx.closePath();
						ctx.stroke();
					}									

				};
				 
				buildGrids(10, "#0bb482", 50);

				function getRandomInt (min, max) {
				    return Math.floor(Math.random() * (max - min + 1)) + min;
				}

				var canvas=document.getElementById("canvas");
				var ctx=canvas.getContext("2d");
				var w = canvas.width;
				var h = canvas.height;
 
				var requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame;					

				var x = 0;
				var y = h/3;
				var animFlag;					

				function sineWave()
				{
					var canvas = document.getElementById("canvas");
					if (canvas.getContext) {

						var ctx = canvas.getContext("2d");	

						ctx.lineWidth = 1;					

						// Find the sine of the angle
						var y = Math.sin(x*Math.PI/50);

						// If the sine value is positive, map it above y = 100 and change the colour to blue
						y = h/2 - (y-0) * 40;

						// if(y >=0)
						// {
						// 	y = h/2 - (y-0) * 30;
						// 	// ctx.fillStyle = "blue";
						// }

						// // If the sine value is negative, map it below y = 100 and change the colour to red
						// if( y < 0 )
						// {
						// 	y = h/2 + (0-y) * 30;
						// 	// ctx.fillStyle = "red";
						// }

						ctx.fillStyle = 'rgba(11, 180, 130, 0.5)';

						// We will use the fillRect method to draw the actual wave. The length and breath of the rectangle are given by the magnitude of the sine wave
						ctx.fillRect(x, y, Math.sin(x * Math.PI/180) * 5, Math.sin(x * Math.PI/180) * 5);						
						// Increment the angle.
						x+=1;

						// When the angle reaches 1040, stop the animation.

						if(x > canvas.width) {
							x = 0;
							ctx.clearRect(0,0,canvas.width, canvas.height);
							buildGrids(10, "#0bb482", 50);
						}
						requestAnimationFrame(sineWave);					
					}	
				}			
					
				sineWave();

			}
		};
	}]);
})(angular);