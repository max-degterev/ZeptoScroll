/* Author:
    Max Degterev @suprMax
*/

;(function($) {
  var interpolate = function (source, target, shift) {
    return (source + (target - source) * shift);
  };

  var easing = function (pos) {
    return (-Math.cos(pos * Math.PI) / 2) + .5;
  };

  var scroll = function(endY, duration, easingF) {
    endY = endY || ($.os.android ? 1 : 0);
    duration = duration || 200;
    if (typeof easingF === 'function') easing = easingF;

    var startY = window.pageYOffset,
        startT = Date.now(),
        finishT = startT + duration;

    var animate = function() {
      var now = Date.now(),
          shift = (now > finishT) ? 1 : (now - startT) / duration;

      window.scrollTo(0, interpolate(startY, endY, easing(shift)));

      if (now < finishT) setTimeout(animate, 15);
    };
  
    animate();
  };

  var scrollNode = function(endY, duration, easingF) {
    endY = endY || 0;
    duration = duration || 200;
    if (typeof easingF === 'function') easing = easingF;

    var startY = this.scrollTop,
        startT = Date.now(),
        finishT = startT + duration,
        _this = this;

    var animate = function() {
      var now = Date.now(),
          shift = (now > finishT) ? 1 : (now - startT) / duration;

      _this.scrollTop = interpolate(startY, endY, easing(shift));

      if (now < finishT) setTimeout(animate, 15);
    };
  
    animate();
  };

  $.scrollTo = scroll;

  $.fn.scrollTo = function() {
    if (this.length) {
      var args = arguments;
      this.forEach(function(elem, index) {
        scrollNode.apply(elem, args);
      });
    }
  };
}(Zepto));
