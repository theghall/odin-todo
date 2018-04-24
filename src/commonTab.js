"use strict";
import * as myTodo from './todo';

const state = {
	tasks: [],
	projects: [],
	currentProject: null,
	loadData: function() {
		let tasks;
		let projects;

		if (localStorage) {
			if (tasks = localStorage.getItem('tasks')) this.tasks = JSON.parse(tasks).map(task =>  myTodo.baseTodoItem(task));
		}
		else {
			alert('Cannot load any data');
		}
	},
	saveData: function() {
		if (localStorage) {
			localStorage.clear();
			const states = this.tasks.map(task => task.exportState());
			localStorage.setItem('tasks', JSON.stringify(states));
		} else {
			alert('Unable to save your tasks and projects');
		}
	}
};

const resources = {
	doneImg: 'assets/graphics/complete25x25.png',
	openImg: 'assets/graphics/open25x25.png',
	overdueImg: 'assets/graphics/overdue25x25.jpg'
};

const forms = {
	taskForm:  [
			{tag: 'label', attrs: [{name: 'for', value: 'name'}], text: 'Name', required: null},
			{tag: 'input', attrs: [{name: 'type', value: 'text'}, {name: 'name', value: 'name'}], text: '', required: true},
			{tag: 'label', attrs: [{name: 'for', value: 'desc'}], text: 'Description'},
			{tag: 'input', attrs: [{name: 'type', value: 'text'}, {name: 'name', value: 'desc'}], text: '', required: true},
			{tag: 'label', attrs: [{name: 'for', value: 'date'}], text: 'Due Date'},
			{tag: 'input', attrs: [{name: 'type', value: 'date'}, {name: 'name', value: 'due'}], text: '', required: true},
			{tag: 'label', attrs: [{name: 'for', value: 'project'}], text: 'project'},
			{tag: 'input', attrs: [{name: 'type', value: 'project'}, {name: 'name', value: 'project'}], text: '', required: false},
			{tag: 'label', attrs: [{name: 'for', value: 'priority'}], text: 'Priority'},
			{tag: 'input', attrs: [{name: 'type', value: 'text'}, {name: 'name', value: 'priority'}], text: '', required: true},
		]
};

function addHiddenFields(form, hidden) {
	for (let i = 0; i < hidden.length; i++) {
		let hiddenInput = document.createElement('input');
		hiddenInput.setAttribute('type', 'hidden');
		hiddenInput.setAttribute('name', hidden[i].name);
		hiddenInput.setAttribute('value', hidden[i].value);
		form.appendChild(hiddenInput);
	}
}

function buildForm(form, items, data=null, hidden=null) { 
	if (hidden) addHiddenFields(form, hidden);
	for (let i = 0; i < items.length; i++) {
		let elem = document.createElement(items[i].tag);
		if (items[i].tag === 'input') elem.classList.add('form-input');
		let attrs = items[i].attrs;
		for (let j = 0; j < attrs.length; j++) {
			let name = attrs[j].name;
			let value = attrs[j].value;
			elem.setAttribute(name, value);
			if (items[i].tag === 'input' && name === 'name') {
				if (data) elem.value = data.get(value);
			}
		}
		if (items[i].required) elem.setAttribute('required','required');
		if (items[i].text !== '') elem.textContent = items[i].text;
		form.appendChild(elem);
		form.appendChild(document.createElement('br'));
	}
}

function buildButton(form, type, id, classes, text, callback) {
	const button = document.createElement('button')
	button.setAttribute('type', type);
	button.id = id;
	for (let i = 0; i < classes.length; i++) { button.classList.add(classes[i]); }
	button.classList.add('btn');
	button.textContent = text;
	form.appendChild(button);
	button.addEventListener('click', function(e) {callback(e, form)});
}

const utility = {
	addTaskForm: function(parentElem, formId, formItems, callback) {
		const form = document.createElement('form');
		form.id = formId;

		buildForm(form, formItems)
		buildButton(form, 'submit', 'add-task', ['btn'], 'Add Task', callback);
		parentElem.appendChild(form);
	},

	updateTaskForm: function(parentElem, formId, formItems, taskIndex, callback) {
		const form = document.createElement('form');
		form.id = formId;
		const hidden = [{name: 'taskindex', value: taskIndex}];
		buildForm(form, formItems, state.tasks[taskIndex], hidden);
		buildButton(form, 'submit', 'update-task', ['btn'], 'Update Task', callback);
		parentElem.appendChild(form);
	},

	deleteForm: function(formId) {
		const form = document.getElementById(formId);
		const parent = form.parentNode;
		parent.removeChild(form);
	},

	getArrayIndex: function(row) {
		const children = row.childNodes;
		// Last element should be hidden TD containing array index
		return parseInt(children[children.length-1].textContent);
	},

	getTextValue: function(form, field) {
		const elem = form.querySelector('input[name=' + field + ']');
		return(elem ? elem.value : null);
	},

	getFormData: function(form) {
		const taskIndex = this.getTextValue(form, 'taskindex');
		const name = this.getTextValue(form, 'name');
		const desc = this.getTextValue(form, 'desc');
		const due = this.getTextValue(form, 'due');
		const project = this.getTextValue(form, 'project');
		const priority = this.getTextValue(form, 'priority');

		return {name: name, desc: desc, due: due, project: project,
			priority: priority, done: false, taskindex: taskIndex};
	}
};

export {state, forms, resources, utility};
