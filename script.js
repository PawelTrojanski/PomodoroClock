var breakLength = 1;
var sessionLength = 1;
var counting = false;
var state = 'session';
var time = 0;
var intervalTime = 1000;

$(document).ready(function(){
	updateControls();

	$('#shorten-break').click(function(){
		if(!counting) {
			breakLength--;
			if(breakLength < 1) {
				breakLength = 1;
			}
			updateControls();
		}
		
	});

	$('#extend-break').click(function(){
		if(!counting) {
			breakLength++;
			updateControls();
		}
	});

	$('#shorten-session').click(function(){
		if(!counting) {
			sessionLength--;
			if(sessionLength < 1) {
				sessionLength = 1;
			}
			updateControls();
		}
	});

	$('#extend-session').click(function(){
		if(!counting) {
			sessionLength++;
			updateControls();
		}
	});
});

window.setInterval(update, intervalTime);

function updateControls() {

	if(counting) {

		var fillAmount = 0;

		if(state === 'session') {
			$('#time').html(formatSeconds(sessionLength * 60 - time));
			fillAmount = time / (sessionLength * 60);
		}else if(state === 'break') {
			$('#time').html(formatSeconds(breakLength * 60 - time));
			fillAmount = time / (breakLength * 60);
		}

		$('#fill').css('height', (fillAmount * 100) + '%');
	}else {
		$('#break-length').html(breakLength);
		$('#session-length').html(sessionLength);
		if(state === 'session') {
			$('#time').html(formatSeconds(sessionLength * 60));
		}else if(state === 'break') {
			$('#time').html(formatSeconds(breakLength * 60));
		}


		$('#fill').css('height', 0);
	}
	
}

function toggleTimer() {
	activateState('session');

	counting = !counting;
	if(!counting) {
		time = 0;
		updateControls();
	}
	$('#start-stop a').html(counting ? 'stop' : 'start');

}

function formatSeconds(seconds) {
	var h = '';

	var m = Math.floor(seconds / 60);
	if(m >= 60) {
		h = Math.floor(m / 60) + ':';
		m = m % 60;
	}
	if(m < 10) m = '0' + m;

	var s = seconds % 60;
	if(s < 10) s = '0' + s;

	return h + m + ':' + s;
}

function activateState(newState) {
	time = 0;
	state = newState;
	if(state == 'session') {
		$('#active-state').html('Session');
	}else if(state == 'break') {
		$('#active-state').html('Break');
	}
}

function update() {
	if(counting) {
		time += intervalTime / 1000;

		if(state === 'session' && time > sessionLength * 60) {
			activateState('break');
			time = 0;
		}else if(state === 'break' && time > breakLength * 60) {
			activateState('session');
			time = 0;
		}

		updateControls();
	}
}
