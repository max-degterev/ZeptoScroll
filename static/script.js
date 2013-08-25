$('#ttp').on('click', function(e) {
	$.scrollTo({
    endY: 0,
    duration: 200,
    callback: function() {
      alert('at the top');
    }
  });
});
