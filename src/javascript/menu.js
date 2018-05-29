;(function(){
	'use strict';

	var btn = document.querySelector('.header-nav__hamburgger');
	var html = document.querySelector('html');
	var menu = document.querySelector('#mainMenu');
	var menuOpened = false;
	var classMenu = 'menu-opened';
	
	html.addEventListener('click', function(e){
		console.log(this);
		console.log(e.target);
	
	if(e.target === html && menuOpened){
		closeMenu();
	}

	})

	
	btn.addEventListener('click', toggleMenu);

	function toggleMenu(e){
		if (menuOpened){
			closeMenu();
		} else {
			openMenu();
		}
	}

	function closeMenu(){
		menuOpened = false;
		html.classList.remove(classMenu);
		btn.blur();
		btn.setAttribute('aria-expended', false);
		menu.setAttribute('aria-expended', false);
	}

	function openMenu(){
		menuOpened = true;
		html.classList.add(classMenu);
		btn.setAttribute('aria-expended', true);
		menu.setAttribute('aria-expended', true);
	}
}());