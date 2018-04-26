"use strict";
import * as myTodo from './todo';
import isPast from 'date-fns/is_past';
import parse from 'date-fns/parse';

const state = {
	tasks: [],
	projects: [],
	currentProject: null,
	loadData: function() {
		let tasks;
		let projects;

		if (localStorage) {
			if (tasks = localStorage.getItem('tasks')) state.tasks = JSON.parse(tasks).map(task =>  myTodo.baseTodoItem(task));
			if (projects = localStorage.getItem('projects')) state.projects = JSON.parse(projects).map(project =>  myTodo.baseTodoItem(project));
		}
		else {
			alert('Cannot load any data');
		}
	},
	saveData: function() {
		if (localStorage) {
			localStorage.clear();
			const states = state.tasks.map(task => task.exportState());
			localStorage.setItem('tasks', JSON.stringify(states));
			const projects = state.projects.map(project => project.exportState());
			localStorage.setItem('projects', JSON.stringify(projects));
		} else {
			alert('Unable to save your tasks and projects');
		}
	}
};

const elemId = {
	containerId: 'container',
	pageActionsId: 'page-actions',
	pageButtonsId: 'page-buttons',
	popupDisplayId: 'popup-show',
	popupFormId: 'popup-form',
 	pageFormId: 'page-form',
	taskContainerId: 'tasks-container',
	popupContainerId: 'popup-container',
	projectsContainerId: 'projects-container',
	taskTableId: 'tasks-table',
	projectTableId: 'projects-table',
	projectsSectionId: 'projects',
	tasksSectionId: 'tasks'
}

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
		],

		projectForm: [
			{tag: 'label', attrs: [{name: 'for', value: 'name'}], text: 'Name', required: null},
			{tag: 'input', attrs: [{name: 'type', value: 'text'}, {name: 'name', value: 'name'}], text: '', required: true},
			{tag: 'label', attrs: [{name: 'for', value: 'desc'}], text: 'Description'},
			{tag: 'input', attrs: [{name: 'type', value: 'text'}, {name: 'name', value: 'desc'}], text: '', required: true},
			{tag: 'label', attrs: [{name: 'for', value: 'date'}], text: 'Due Date'},
			{tag: 'input', attrs: [{name: 'type', value: 'date'}, {name: 'name', value: 'due'}], text: '', required: true},
			{tag: 'label', attrs: [{name: 'for', value: 'priority'}], text: 'Priority'},
			{tag: 'input', attrs: [{name: 'type', value: 'text'}, {name: 'name', value: 'priority'}], text: '', required: true},
		]
};


const utility = {
	// Create Functions -- return an element
	createButton: function(text) {
		const button = document.createElement('button');
		button.textContent = text;
		button.classList.add('btn');
		return button;
	},

	createModalButton: function(type, id, classes, text, callback) {
		const button = document.createElement('button')
		button.setAttribute('type', type);
		button.id = id;
		for (let i = 0; i < classes.length; i++) { button.classList.add(classes[i]); }
		button.textContent = text;
		button.addEventListener('click', function(e) {callback(e, form)});
		return button;
	},

	createDataCell: function(text, hidden) {
		const td = document.createElement('td');
		if (hidden) td.classList.add('hidden');
		td.textContent = text;
		return td;
	},

	createSection: function createSection(id) {
		const section = document.createElement('section');
		section.id = id;
		return section;
	},

	createStatusCell: function(item) {
		const td = document.createElement('td');
		const img = document.createElement('img');
		img.addEventListener('click', utility.toggleComplete);
		td.appendChild(img);

		switch(item.get('done')) {
			case false:
				if (isPast(parse(item.get('due')))) {
					img.setAttribute('src', resources.overdueImg);
				} else {
					img.setAttribute('src', resources.openImg); 
				}
				break;
			case true:
				img.setAttribute('src', resources.doneImg);
				break;
		}
		return td;
	},

	createTable: function(id) {
		const table = document.createElement('table');
		table.id = id;
		return table;
	},

	createTaskRow: function(task, index) {
		const propOrder = ['name', 'desc', 'due', 'project', 'priority']
		const tr = document.createElement('tr');
		tr.appendChild(utility.createStatusCell(task));

		for (let i = 0; i < propOrder.length; i++) {
			let prop = propOrder[i];
			tr.appendChild(utility.createDataCell(task.get(prop)));
			if (prop === 'name') tr.childNodes[1].addEventListener('click', utility.editTask);}

		const button = utility.createButton('Delete');
		button.addEventListener('click', utility.deleteTask);
		utility.addActionButton(tr, button);
		// Put index of utility object in tasks array and hide it
		tr.appendChild(utility.createDataCell(index, true));
		return tr;
	},

	// Add functions, add child element(s) to a parent element
	addActionButton: function(tr, button) {
		const td = document.createElement('td');
		td.appendChild(button);
		tr.appendChild(td);
	},

	addFooter: function(parentElem) {
		const images = [
			resources.openImg, resources.doneImg, resources.overdueImg
		];
		const legend = [ 'Undone', 'Done', 'Overdue'];
		const footer = document.createElement('footer');

		for (let i = 0; i < images.length; i++) {
			let img = document.createElement('img');
			img.src = images[i];
			footer.appendChild(img);
			let p = document.createElement('p');
			p.textContent = legend[i];
			footer.appendChild(p);
		}
		parentElem.appendChild(footer);
	},

	addModalForm: function(formItems, saveButton) {
		// This div sets up form to be "modal"
		const displayContainer = document.createElement('div');
		displayContainer.id = elemId.popupDisplayId;
		displayContainer.classList.add('block');

		const popupContainer = document.createElement('div');
		popupContainer.id = elemId.popupContainerId;
		displayContainer.appendChild(popupContainer);

		const form = document.createElement('form');
		form.id = elemId.popupFormId;
		utility.buildForm(form, formItems);

		form.appendChild(saveButton);
		const cancelButton = utility.createButton('Cancel');
		cancelButton.addEventListener('click', utility.closeModal);
		form.appendChild(cancelButton);
		popupContainer.appendChild(form);

		utility.getRootElement().appendChild(displayContainer);
	},

	addPageActions: function(parentElem) {
		const ids = [elemId.pageButtonsId, elemId.pageFormId];
		const parentDiv = document.createElement('div');
		parentDiv.id = elemId.pageActionsId

		for (let i = 0; i < ids.length; i++) {
			let div = document.createElement('div');
			div.id = ids[i];
			parentDiv.appendChild(div);
		}
		parentElem.appendChild(parentDiv);
	},

	addPageButtons: function(parentElem) {
		let button = utility.createButton('Add Task');
		button.addEventListener('click', utility.addTask);
		parentElem.appendChild(button);

		button = utility.createButton('Save');
		button.addEventListener('click', utility.save);
		parentElem.appendChild(button);
	},

	addSection: function(parentElem, id) {
		parentElem.appendChild(utility.createSection(id));
	},

	addTableHeader: function(parentElem, colHeaders) {
		const thead = document.createElement('thead');
		const tr = document.createElement('tr');

		for (let i = 0; i < colHeaders.length; i++) {
			tr.appendChild(utility.createDataCell(colHeaders[i]));
		}
		thead.appendChild(tr);
		parentElem.appendChild(thead);
	},

	addTaskForm: function(parentElem, formId, formItems, callback) {
		const form = document.createElement('form');
		form.id = formId;
		utility.buildForm(form, formItems)
		utility.buildButton(form, 'submit', 'add-task', ['btn'], 'Add Task', callback);
		parentElem.appendChild(form);
	},

	addTaskTable: function(parentElem, project=null) {
		const colHeaders = ['', 'Name', 'Description', 'Due Date', 'Project', 'Priority', 'Action'];
		const table = utility.createTable(elemId.taskTableId);

		utility.addTableHeader(table, colHeaders);

		const tasks = state.tasks.filter(item => project === null || item.get('project') === project);

		for (let i = 0; i < tasks.length; i++) {
			let task = tasks[i];
			let tr = utility.createTaskRow(task, i);
			table.appendChild(tr);
		}
		parentElem.appendChild(table);
	},

	updateTaskForm: function(parentElem, formId, formItems, taskIndex, callback) {
		const form = document.createElement('form');
		form.id = formId;
		const hidden = [{name: 'itemindex', value: taskIndex}];
		utility.buildForm(form, formItems, state.tasks[taskIndex], hidden);
		utility.buildButton(form, 'submit', 'update-task', ['btn'], 'Update Task', callback);
		parentElem.appendChild(form);
	},

	// Support functions
	addHiddenField: function(form, hidden) {
		for (let i = 0; i < hidden.length; i++) {
			let hiddenInput = document.createElement('input');
			hiddenInput.setAttribute('type', 'hidden');
			hiddenInput.setAttribute('name', hidden[i].name);
			hiddenInput.setAttribute('value', hidden[i].value);
			form.appendChild(hiddenInput);
		}
	},

	buildButton: function(form, type, id, classes, text, callback) {
		const button = document.createElement('button')
		button.setAttribute('type', type);
		button.id = id;
		for (let i = 0; i < classes.length; i++) { button.classList.add(classes[i]); }
		button.textContent = text;
		form.appendChild(button);
		button.addEventListener('click', function(e) {callback(e, form)});
	},

	buildForm: function(form, items, data=null, hidden=null) { 
		if (hidden) utility.addHiddenFields(form, hidden);
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
	},
	
	deleteForm: function(formId) {
		const form = document.getElementById(formId);
		const parent = form.parentNode;
		parent.removeChild(form);
	},

	deleteModal: function() {
		const modal = document.getElementById(elemId.popupDisplayId);
		modal.parentNode.removeChild(modal);
	},

	getArrayIndex: function(row) {
		const children = row.childNodes;
		// Last element should be hidden TD containing array index
		return parseInt(children[children.length-1].textContent);
	},

	getFormData: function(form) {
		const itemIndex = this.getTextValue(form, 'itemindex');
		const name = this.getTextValue(form, 'name');
		const desc = this.getTextValue(form, 'desc');
		const due = this.getTextValue(form, 'due');
		const project = this.getTextValue(form, 'project');
		const priority = this.getTextValue(form, 'priority');

		return {name: name, desc: desc, due: due, project: project,
			priority: priority, done: false, itemindex: itemIndex};
	},

	getRootElement: function() {
		return document.getElementById(elemId.containerId);
	},

	getTextValue: function(form, field) {
		const elem = form.querySelector('input[name=' + field + ']');
		return(elem ? elem.value : null);
	},

	// Event Listener helpers
	delPageButtons: function() {
		const elem = document.getElementById(elemId.pageButtonsId);

		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	},

	renderTask: function(index) {
		const taskIndex = (index >= 0 ? index : state.tasks.length-1);
		const tr = utility.createTaskRow(state.tasks[taskIndex], taskIndex);
		const parentElem = document.getElementById(elemId.taskTableId);

		if (index >= 0) {
			// Add one to allow for thead
			parentElem.replaceChild(tr, parentElem.childNodes[index+1]);
		} else {
			parentElem.appendChild(tr);
		}
	},

	updateHiddenIndices: function(sibling, inc=-1) {
		while (sibling) {
			let children = sibling.childNodes;
			// Last child should be hidden node containing index into tasks
			const indexTD = children[children.length - 1]
			indexTD.textContent = parseInt(indexTD.textContent) + inc;
			sibling = sibling.nextSibling;
		}
	},

	// Event Listeners
	addTask: function(e) {
		utility.delPageButtons();
		utility.addTaskForm(document.getElementById(elemId.pageFormId),
			'task-form', forms.taskForm, utility.handleAddTask);
	},

	closeModal: function(e) {
		utility.deleteModal();
	},

	deleteTask: function(e) {
		const table = document.getElementById(elemId.taskTableId);
		const row = e.target.parentNode.parentNode;
		const sibling = e.target.parentNode.parentNode.nextSibling;
		const taskIndex = utility.getArrayIndex(row);
		state.tasks.splice(taskIndex, 1);
		table.removeChild(row);
		utility.updateHiddenIndices(sibling);
	},

	editTask: function(e) {
		const taskIndex = utility.getArrayIndex(e.target.parentNode);
		utility.delPageButtons();
		utility.updateTaskForm(document.getElementById(elemId.pageFormId),
			'task-form', forms.taskForm, taskIndex, utility.handleUpdateTask);
	},

	handleAddTask: function(e, form) {
		e.preventDefault();
		const formData= utility.getFormData(form);
		delete formData.itemindex;
		state.tasks.push(myTodo.baseTodoItem(formData));
		utility.deleteForm(form.id);
		utility.renderTask(-1);
		utility.addPageButtons(document.getElementById(elemId.pageButtonsId));
	},

	handleUpdateTask: function(e, form) {
		e.preventDefault();
		const formData= utility.getFormData(form);
		const taskIndex = parseInt(formData.itemindex);
		delete formData.itemindex;
		state.tasks[parseInt(taskIndex)] = myTodo.baseTodoItem(formData);
		utility.deleteForm(form.id);
		utility.renderTask(taskIndex);
		utility.addPageButtons(document.getElementById(elemId.pageButtonsId));
	},

	save: function(e) {
		state.saveData();
	},

	toggleComplete: function(e) {
		const img = e.target;
		const tableId = e.target.parentNode.parentNode.parentNode.id;
		const cells = e.target.parentNode.parentNode.childNodes;
		const index = parseInt(cells[cells.length - 1].textContent);

		const itemArray =
			(tableId === elemId.taskTableId ? state.tasks : state.projects);

		if (itemArray[index].get('done')) {
			if (isPast(parse(itemArray[index].get('due')))) {
				img.src = resources.overdueImg;
			} else {
				img.src = resources.openImg;
			}
		} else {
			img.src = resources.doneImg;
		}
		itemArray[index].toggleDone();
		img.addEventListener('click', utility.toggleComplete);
	}

};

export {state, elemId, forms, resources, utility};
