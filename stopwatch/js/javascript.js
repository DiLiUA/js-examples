(function () {
	"use strict"

	var lastHoverMouseOnTheStopwatch =null;

	var newLap;
	var span = document.createElement('span');
		span.className = 'remove-button';

	// Create the main unit
	var wrapper = document.createElement('div');
	wrapper.className = ' wrapper';
	document.body.appendChild(wrapper);

	// Create the left column which will timers
	var leftBlock = document.createElement('div');
	leftBlock.className = ' leftBlock';
	wrapper.appendChild(leftBlock);

	// Create the right column where there is a button to create new stopwatches
	var rightBlock = document.createElement('div');
	rightBlock.className = ' rightBlock';
	wrapper.appendChild(rightBlock);

	// Create button to create a new timer
	var newTimer = document.createElement('button');
	newTimer.className = 'buttonStyle create';
	newTimer.innerText = 'Create Stopwatch';
	newTimer.onclick = function () {
		newLapStopwatch();
	}
	function newLapStopwatch () {
		newLap = new Stopwatch();
		newLap.createBtnDel();

	}
	rightBlock.appendChild(newTimer);

	// The constructor function
	function Stopwatch() {
		this.timer = null;
		this.resultTimer = null;
		this.pageContainer = null;
		this.leftBlock = null;

		this.runBtn = null;
		this.lapBtn = null;
		this.resetBtn = null;
		this.deleteBtn = null;

		this.swathCouter();
		this.createTreeDom();
		this.keyListener();

	}
	// Create a method to create a tree DOM
	Stopwatch.prototype.createTreeDom = function () {
		// Create the main unit container
		this.pageContainer = document.createElement('div');
		this.pageContainer.className = ' container';
		this.pageContainer.onmouseover = function() {
			lastHoverMouseOnTheStopwatch = this;
		}.bind(this);
		leftBlock.appendChild(this.pageContainer);

		// Create a block for stopwatches
		var nodeTimers = document.createElement('div');
		nodeTimers.className = ' timersBlock';
		this.pageContainer.appendChild(nodeTimers);

		// Create a field stopwatch
		this.timerNode = document.createElement('p');
		this.timerNode.className = ' timer activeTimer';
		this.timerNode.innerText = this.hours + '  :  ' + this.minutes + '  :  ' + this.seconds + '  :  ' + this.milliseconds;
		nodeTimers.appendChild(this.timerNode);

		// Create a block for results stopwatch
		this.resultTimer = document.createElement('div');
		this.resultTimer.className = ' resultTimer';
		this.resultTimer.onclick   = this.removeBlock.bind(this);
		nodeTimers.appendChild(this.resultTimer);

		// Create a block for the control panel stopwatch
		var controlPanelNode = document.createElement('div');
		controlPanelNode.className = ' controlPanel';
		this.pageContainer.appendChild(controlPanelNode);

		// Create the Start button
		this.runBtn = document.createElement('button');
		this.runBtn.className = 'buttonStyle startButton';
		this.runBtn.innerText = "Start";
		this.runBtn.onclick = this.startOrStopTimer.bind(this);
		controlPanelNode.appendChild(this.runBtn);

		// Create the Lap button
		this.lapBtn = document.createElement('button');
		this.lapBtn.className = 'buttonStyle lapButton';
		this.lapBtn.innerText = 'Lap';
		this.lapBtn.onclick = this.createTimer.bind(this);
		controlPanelNode.appendChild(this.lapBtn);

		// Create the Reset button
		this.resetBtn = document.createElement('button');
		this.resetBtn.className = 'buttonStyle resetButton';
		this.resetBtn.innerText = 'Reset';
		this.resetBtn.onclick = this.resetTimer.bind(this);
		this.pageContainer.appendChild(this.resetBtn);

		return this.pageContainer;
	}

	// Create the Del button
	Stopwatch.prototype.createBtnDel = function(){
		this.deleteBtn  = document.createElement('button');
		this.deleteBtn.className = 'buttonStyle delBtn';
		this.deleteBtn.innerText = 'Del';
		this.deleteBtn.onclick = this.deleteNewTimer.bind(this);
		this.pageContainer.appendChild(this.deleteBtn);
	}

	// Create a method for the timer
	Stopwatch.prototype.startTimer = function () {
		if (this.milliseconds >(999 - this.delta) ){
			this.milliseconds = '000';
		var newSeconds = (+this.seconds) + 1
			this.seconds = newSeconds <10 ? '0' + newSeconds : newSeconds;
		}else{
			var newMiliseconds = (+this.milliseconds ) + this.delta;
				if(newMiliseconds < 10){
					this.milliseconds = '00' + newMiliseconds;
				} else if(newMiliseconds >= 10 && newMiliseconds < 100){
					this.milliseconds = '0' + newMiliseconds;
				} else{
					this.milliseconds = newMiliseconds;
				}
		}
		if(this.seconds > 59){
			this.seconds = 0;
			var newMinutes = (+this.minutes) + 1;
			this.minutes = newMinutes <10 ? '0' + newMinutes : newMinutes;
		}
		if(this.minutes > 59){
			this.minutes = 0;
			var newHours = (+this.hours) + 1;
			this.hours = newHours < 10 ? '0'  +newHours : newHours;
		}
		this.valuesStopwatch();

	}

	// Create a method to start / stop the stopwatch
	Stopwatch.prototype.startOrStopTimer = function () {
		var that = this;
		if(this.runBtn.innerText !== "Stop"){
			this.runBtn.innerText = "Stop";
			this.runBtn.style.background = "red";
			var startTime = (new Date()).getTime();
			this.timer = setInterval (function(){
				var newTime = (new Date()).getTime();
				that.delta = newTime - startTime;
				startTime = newTime;
				that.startTimer()
			}, 16);
		} else{
			this.stopTimer();
		}
	}

	// Create a method to stop the stopwatch
	Stopwatch.prototype.stopTimer = function () {
		if(this.runBtn.innerText === "Start"){
			return false;
		}else{
			this.runBtn.innerText = "Start";
			this.runBtn.style.background = "#5dd6e1"
			clearInterval(this.timer);
		}
	}

	// Create a method to remove the stopwatch results
	Stopwatch.prototype.removeBlock = function (event) {
		var event = event || window.event;
		var target = event.target || event.srcElement;
		if (target.className == 'remove-button') {
			target.parentNode.style.display = 'none';
		}
	}

	// Create a method for recording the results of the stopwatch
	Stopwatch.prototype.createTimer = function () {
		var timerNode = document.createElement('p');
		timerNode.className = ' timer resTimer';
		timerNode.innerText = this.hours + '  :  ' + this.minutes + '  :  ' + this.seconds +'  :  ' + this.milliseconds;
		this.resultTimer.insertBefore(timerNode, this.resultTimer.firstChild);
		var span = document.createElement('span');
		span.className = 'remove-button';
		timerNode.appendChild(span);
	}

	// Create a method to reset the timer and stopwatch cleaning results
	Stopwatch.prototype.resetTimer = function () {
		this.stopTimer();
		this.swathCouter()
		this.valuesStopwatch();
		var result = this.resultTimer.querySelectorAll('.resTimer');
		if(!result){
			return false;
		}else{
			for (var i = 0; i < result.length; i += 1){
				this.resultTimer.removeChild(result[i]);
			}
		}
	}

	// Method to remove the stopwatch
	Stopwatch.prototype.deleteNewTimer = function () {
		if(!this.deleteBtn){
			return false;
		}else{
			this.pageContainer.style.display = 'none'
		}
	}

	// Keyboard control method
	Stopwatch.prototype.keyboardNavigation = function (event) {
		event = event || window.event;
		if(event && this === lastHoverMouseOnTheStopwatch){
			var code = event.keyCode
			if(code === 83){
				this.startOrStopTimer();
			}
			if(code === 76){
				this.createTimer();
			}
			if(code === 82){
				this.resetTimer();
			}
			if(code === 68){
				this.deleteNewTimer();
			}
			if(code === 67){
				newLapStopwatch();
			}
		}
	}

	// To reset the stopwatch
	Stopwatch.prototype.swathCouter = function () {
		this.milliseconds = '000';
		this.seconds = '00';
		this.minutes = '00';
		this.hours = '00';
		this.delta =0;
	}

	// Values stopwatch
	Stopwatch.prototype.valuesStopwatch = function () {
		this.timerNode.innerText = this.hours + '  :  ' + this.minutes + '  :  ' + this.seconds +'  :  ' + this.milliseconds;
	}

	Stopwatch.prototype.keyListener = function () {
			document.body.addEventListener('keyup', this.keyboardNavigation.bind(this), false );
	}

	var lap = lastHoverMouseOnTheStopwatch = new Stopwatch();

}())
