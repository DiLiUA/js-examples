$(document).ready(function(){
	'use strict'
	var slider1 = new VerticalSlider();
});

	function VerticalSlider () {
		this.slides      = $(".images-panel li");
		this.index       = 0;
		this.restartTime = 5000;

		this.slides.click(this.slideForClick.bind(this));
		this.slideInterval = setInterval(this.automationSlider.bind(this),2000);
	
	}

	VerticalSlider.prototype.slideImagesPanel = function (index, current) {
		var triangle = $(".triangle");
		var activeblockStyle = $(".image-5");
		var imageSlide = $(".image");

		if(current.hasClass("image-" + (index + 1))){

			triangle.animate({top:23 + (index * 86)},1000);
			activeblockStyle.animate({top:86*index},1000);
			imageSlide.animate({marginLeft:(-910 * index)},1000);
		}
	}

	VerticalSlider.prototype.slideForClick = function (e) {
		var elem = e.target;

		clearInterval(this.slideInterval);

		this.index = $(elem).index();
		this.slideImagesPanel(this.index, $(elem));

		this.restartAutomationSlider();
	}

	VerticalSlider.prototype.automationSlider = function () {
		var that = this;

		that.slideImagesPanel(that.index, $(that.slides[that.index]) );
		that.index = (that.index === that.slides.length) ? 0 : that.index + 1;
	}

	VerticalSlider.prototype.restartAutomationSlider = function() {

		var that = this;

		setTimeout(function() {
			that.slideInterval = setInterval(that.automationSlider.bind(that),2000);
		}, that.restartTime);
	}

