"use strict";

require('normalize.css');
import './assets/css/style.css';
import * as myTodo from './todo.js';
import {buildTaskPage} from './tasksTab';
import * as todoRes from './commonTab';

function createTabMenu() {
	const menuItems = ['Tasks', 'Projects'];

	const container = document.getElementById('container');

	const nav = document.createElement('nav');
	nav.id = 'main-nav';

	const ul = document.createElement('ul');
	ul.classList.add('tabrow');

	for (let i = 0; i < menuItems.length; i++) {
		let li = document.createElement('li');
		li.textContent = menuItems[i];

		// Make first item "active"
		if (i === 0) li.classList.add('selected');

		ul.appendChild(li);

		addTabListener(li);
	}

	nav.appendChild(ul);
	container.appendChild(nav);
}

// Event listeners
function addTabListener(target) {
	target.addEventListener('click', function(e) { makeTabActive(e); });
}

function removeContainer(id) {
	const elem = document.getElementById(id);
	if (elem) elem.parentNode.removeChild(elem);
}

function makeTabActive(e) {
	selectTab(e);

	switch(e.target.textContent) {
		case 'Tasks':
			removeContainer('projects-container');
			buildTaskPage();
			break;
		case 'Projects':
			removeContainer('tasks-container');
			break;
		default:
			break;
	}
}

function selectTab(e) {
	const activeClass = 'selected';

	// Find menu associated with '#main-nav'
	const mainNav = document.getElementById('main-nav');
	const childrenArr = [...mainNav.children];

	// Find currently selected item, deselect it, select clicked item
	for (let i = 0; i < childrenArr.length; i++) {
		// Should be menu we're looking for
		if (childrenArr[i].tagName === 'UL') {
			let ulChildrenArr = [...childrenArr[i].children];
			for (let j = 0; j < ulChildrenArr.length; j++) {
				if (ulChildrenArr[j].classList.contains(activeClass)) {
					ulChildrenArr[j].classList.remove(activeClass);
					e.target.classList.add(activeClass);
					break;
				}
			}
			break;
		}
	}
}

function ready() {
	todoRes.state.loadData();
	createTabMenu();
	buildTaskPage();
}

document.addEventListener("DOMContentLoaded", ready);
