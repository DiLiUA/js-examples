$(document).ready(function() {
	'use strict'
	//slider 1
	var sliderNature = new VerticalSlider({
		name: '.slider-nature', // specify block slider
		speed: 2000, // specify the interval at which the slide will be scrolled
		action: 'click', // specify the event with which to perform a manual rewind slide
		animateTime: 1000, // specify the animation speed slide
		restartTime: 5000, // specify the interval through which the restart interval turning
		activeImage: '.active-image', // specify the unit of the active image
		trianglForActiveImage: '.triangle', // specify the unit triangle to block the active image
		blockImageSlider: '.image', // specify the block image slider
		blockImageSliderParrent: '.slider-image' // enter the main unit image slider
	});

	//slider 2
	var sliderCar = new VerticalSlider({
		name: '.slider-car',
		speed: 3000,
		action: 'mouseover',
		animateTime: 500,
		restartTime: 8000,
		activeImage: '.active-image',
		trianglForActiveImage: '.triangle',
		blockImageSlider: '.image',
		blockImageSliderParrent: '.slider-image'
	});

	//slider 3
	var sliderHome = new VerticalSlider({
		name: '.slider-home',
		speed: 1000,
		action: 'dblclick',
		animateTime: 2000,
		restartTime: 3000,
		activeImage: '.active-image',
		trianglForActiveImage: '.triangle',
		blockImageSlider: '.image',
		blockImageSliderParrent: '.slider-image'
	})

});

//constructor function for slider
function VerticalSlider(options) {
	this.name                    = $(options.name);
	this.blockImageSlider        = options.blockImageSlider;
	this.animateTime             = options.animateTime;
	this.speed                   = options.speed + this.animateTime;
	this.restartTime             = options.restartTime - options.speed;
	this.activeImage             = options.activeImage;
	this.trianglForActiveImage   = options.trianglForActiveImage;
	this.blockImageSliderParrent = options.blockImageSliderParrent;

	this.cloneLeft = this.name.find(this.blockImageSlider).append(this.name.find(this.blockImageSlider).find('img').first().clone()); // Create a clone of the first image for the circular scrolling at the end of the slide

	this.styleDOM();
	this.slides.on(options.action, this.slideForClick.bind(this)); // обработчик события  с помощью которого будет выполняться ручная перемотка слайдов
	this.slideInterval = setInterval(this.automationSlider.bind(this), this.speed); // set the interval for auto-scroll slide
}

//declare styleDOM
VerticalSlider.prototype.styleDOM = function() {
	this.blockImages = this.name.find('img').length - 1; // calculate the number of images slider
	this.name.children('ul').empty(); // clears the list of patches
	// create a new list of patches with the number of image slider
	this.name.find('img').each(function(index) {
		if (index < this.blockImages) {
			this.name.find('ul').append('<li></li>');
		}
	}.bind(this));

	this.listImagePanelHeight = this.name.find('img').height() / this.blockImages; // calculate the height of the unit, depending on the height of the slide
	this.name.find('ul li').css('height', this.listImagePanelHeight); // change the height of the block corresponding to the image slider, depending on the number of images slider
	this.name.find(this.activeImage).css('height', this.listImagePanelHeight); // change the height of the active block corresponding to the image slider, depending on the number of images slider
	this.name.find(this.trianglForActiveImage).css('borderWidth', this.listImagePanelHeight * 0.25); // specifies the size of the triangle
	this.name.find(this.trianglForActiveImage).css('top', (this.listImagePanelHeight / 2) - this.listImagePanelHeight * 0.25); // set the upper position of the triangle
	this.name.css({
		'overflow': 'hidden',
		'position': 'relative'
	}); // specifies the style slider
	this.name.find(this.blockImageSliderParrent).css('width', this.name.find('img').width()); // specify the width of the slide

	this.slides = this.name.find('ul li');
	this.index = 0;

	this.topPositionTriangle = this.listImagePanelHeight / 2 - this.listImagePanelHeight * 0.25;
	this.positionActiveImagePanel = this.name.find(this.activeImage).height();
	this.sliderImageWidth = -(this.name.find('img').width()); //calculates the offset value of 1 image
	this.imageLength = this.name.find('img').width() * (this.slides.length + 1); // to calculate the length of the block with image
	this.name.find(this.blockImageSlider).css({
		'width': this.imageLength
	});
}

//method of animation slider
VerticalSlider.prototype.slideImagesPanel = function(index, current) {
	var triangle = this.name.find(this.trianglForActiveImage);
	var activeblockStyle = this.name.find(this.activeImage);
	var imageSlide = this.name.find(this.blockImageSlider);
	if (this.name.find(current.eq(index))) {
		if (index === this.slides.length + 1) {
			this.index = 0;
			imageSlide.css('marginLeft', (this.sliderImageWidth * (this.index)));
			this.index += 1;
		}
		imageSlide.animate({
			marginLeft: (this.sliderImageWidth * this.index)
		}, this.animateTime);

		if (index === this.slides.length) {

			triangle.css('top', this.topPositionTriangle + 0);
			activeblockStyle.css('top', this.positionActiveImagePanel * 0);
		} else if (index === this.slides.length + 1) {
			triangle.animate({
				top: this.topPositionTriangle + (this.index * this.positionActiveImagePanel)
			}, this.animateTime);
			activeblockStyle.animate({
				top: this.positionActiveImagePanel * this.index
			}, this.animateTime);
		} else {
			triangle.animate({
				top: this.topPositionTriangle + (index * this.positionActiveImagePanel)
			}, this.animateTime);
			activeblockStyle.animate({
				top: this.positionActiveImagePanel * index
			}, this.animateTime);
		}
	}
}

//method of animation slider on mouse click
VerticalSlider.prototype.slideForClick = function(e) {
	var elem = e.target;
	clearInterval(this.slideInterval);
	clearInterval(this.timeOut);
	this.index = $(elem).index();
	this.slideImagesPanel(this.index, $(elem));
	this.restartAutomationSlider();
}

//a method of automatic slider
VerticalSlider.prototype.automationSlider = function() {
	var that = this;
	that.index = that.index + 1;
	that.slideImagesPanel(that.index, $(that.slides[that.index]));
}

//a method of automatic restart slider
VerticalSlider.prototype.restartAutomationSlider = function() {
	var that = this;
	this.timeOut = setTimeout(function() {
		that.slideInterval = setInterval(that.automationSlider.bind(that), that.speed);
	}, that.restartTime);
}