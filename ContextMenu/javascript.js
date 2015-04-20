'use strict';

(function() {

	var menuExample = [{
		title: 'File',
		action: function () {console.log('open file')}
	}, {
		title: 'Edit',
		action: function () {console.log('edit content')}
	}, {
		title: 'More stuff',
		submenu: [{
			title: 'Send by email',
			action: function () {console.log('emailed')}
		}, {
			title: 'Send via skype',
			action: function () {console.log('skyped')}
		}]
	},{
		title: 'Our company',
		submenu: [{
			title: 'News',
			action: function () {console.log('News')}
		}, {
			title: 'Job',
			submenu: [{
				title: 'Vacancy',
				action: function () {console.log('Vacancy')}
			}, {
				title: 'Information',
				action: function () {console.log('Information')}
			}]
		}]
	}]

	var ESC_KEYCODE = 27

	function topWalker(node, testFunc, lastParent) {
		while (node && node !== lastParent) {
			if (testFunc(node)) {
				return node;
			}
			node = node.parentNode;
		}
	}

	function ContextMenu(node, structureMenu) {
		this.nodeUl = node;
		this.menu = this.listMenu(structureMenu);
		document.body.appendChild(this.menu);
		this.nodeUl.addEventListener('contextmenu', this.coordinateMouse.bind(this), false);
		document.documentElement.addEventListener('click', this.clickLeftKeyMouse.bind(this), false);
		document.documentElement.addEventListener('keyup', this.pushKeyEsc.bind(this), false);
		this._submenuDisplay(this);

	}
	ContextMenu.prototype.listMenu = function(structure) {
		var nodeUl = document.createElement('ul');
		var nodeli = document.createElement('li');
		nodeUl.className = ' context-menu'
		for (var i = 0; i < structure.length; i += 1){
			var nodeli = document.createElement('li');
			nodeli.innerText = structure[i].title;
			if (structure[i].submenu){
				nodeli.appendChild(this.listMenu(structure[i].submenu));
				nodeli.className = ' context-submenu';
				var span = document.createElement('span');
				span.innerText = ' ➲'
				nodeli.appendChild(span);

			} else{
				nodeli.addEventListener('click', structure[i].action, false);
			}
			nodeUl.appendChild(nodeli);
		}
		return nodeUl;
	}
	ContextMenu.prototype.coordinateMouse = function (event) {
		event.preventDefault();
		var coordinateX = event.pageX;
		var coordinateY = event.pageY;
		this.clickRightKeyMouse(coordinateX, coordinateY);
	}

	ContextMenu.prototype.clickRightKeyMouse = function (left, top) {
		var showMenu = document.querySelector('.context-menu');
		showMenu.style.display = "block";
		
		showMenu.style.left =  left +'px';
		showMenu.style.top =  top +'px';

	}
	ContextMenu.prototype.clickLeftKeyMouse = function (event) {
		var menu = this.menu;
		if (!topWalker(event.target, function (node){
			return menu === node;
		})){
			this.hideMenu();
		}
		
	}
	ContextMenu.prototype.pushKeyEsc = function () {
		if(event.keyCode === ESC_KEYCODE){
			this.hideMenu();
		}
	}

	ContextMenu.prototype.hideMenu = function () {
		this.menu.style.display = 'none';
	}

	ContextMenu.prototype._submenuDisplay = function () {
		var showSubmenu = this.menu.querySelectorAll('.context-submenu');
		for (var i = 0; i < showSubmenu.length; i += 1) {
			var showNodes = showSubmenu[i];
			(function (i) {
				var submenuUl = showNodes.querySelector('ul');
				function show(){
					submenuUl.style.display = "block";
				}
				function hide(){
					submenuUl.style.display = "none";
				}
				showNodes.addEventListener('mouseover', show);
				showNodes.addEventListener('mouseout', hide);
			}(i))
		}
	}

	var newContextMenu = new ContextMenu(document.documentElement, menuExample)
}())