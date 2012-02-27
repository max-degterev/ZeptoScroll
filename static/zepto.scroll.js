;(function($) {
	var interpolate = function (source, target, shift) { 
		return (source + (target - source) * shift); 
	};

	var easing = function (pos) { 
	    return (-Math.cos(pos * Math.PI) / 2) + .5; 
	};

	$.scroll = function(endY, duration, easingF) {
		endY = endY || ($.os.android ? 1 : 0);
		duration = duration || 200;
		(typeof easingF === 'function') && (easing = easingF);

		var startY = document.body.scrollTop,
			startT  = Date.now(),
			finishT = startT + duration;

		var animate = function() {
			var now = +(new Date()),
				shift = (now > finishT) ? 1 : (now - startT) / duration;

			window.scrollTo(0, interpolate(startY, endY, easing(shift)));

			(now > finishT) || setTimeout(animate, 15);
		};
	
		animate();
	};
}(Zepto));











