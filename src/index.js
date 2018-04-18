"use strict";

require('normalize.css');
import './assets/css/style.css';
import * as myTodo from './todo.js';

const itemState = {
	name: 'Feed Gizmo',
	desc: 'Food ONLY, NO WATER!!!!',
	dueDate: 'May 14',
	priority: 1,
	completed: false
}

const projectState = {
	name: 'Home',
	desc: 'Stuff to do around the house',
	dueDate: null,
	priority: 1,
	completed: false,
	tasks: []
}

const home = myTodo.baseProject(projectState);
home.add(itemState);
home.remove(0);
console.log(home.get('tasks'));
