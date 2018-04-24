"use strict";
import * as myTodo from './todo';
import * as todoGlobal from './commonTab';
import isPast from 'date-fns/is_past';
import parse from 'date-fns/parse';

const pageParent = document.getElementById('container');

function createButton(text) {
	const button = document.createElement('button');
	button.textContent = text;
	button.classList.add('btn');
	return button;
}

function addActionButton(tr, button) {
	const td = document.createElement('td');
	td.appendChild(button);
	tr.appendChild(td);
}

function createDataCell(text, hidden) {
	const td = document.createElement('td');
	if (hidden) td.classList.add('hidden');
	td.textContent = text;
	return td;
}

function createSection() {
	const section = document.createElement('section');
	section.id = 'tasks-container';

	pageParent.appendChild(section);

	return section;
}

function createTable(parentElem) {

	const table = document.createElement('table');
	table.id = 'tasks-table';

	parentElem.appendChild(table);

	return table;
}

function createTableHeader(parentElem) {
	const colHeaders = ['', 'Name', 'Description', 'Due Date', 'Project', 'Priority', 'Action'];

	const thead = document.createElement('thead');
	const tr = document.createElement('tr');

	for (let i = 0; i < colHeaders.length; i++) {
		tr.appendChild(createDataCell(colHeaders[i]));
	}

	thead.appendChild(tr);
	parentElem.appendChild(thead);
}

function createPageActions(parentElem) {
	const ids = ['page-buttons', 'page-form'];
	const parentDiv = document.createElement('div');
	parentDiv.id = 'page-actions'

	for (let i = 0; i < ids.length; i++) {
		let div = document.createElement('div');
		div.id = ids[i];
		parentDiv.appendChild(div);
	}

	parentElem.appendChild(parentDiv);
}

function addStatusIcon(task) {
	const td = document.createElement('td');
	const img = document.createElement('img');

	img.addEventListener('click', toggleComplete);
	td.appendChild(img);

	switch(task.get('done')) {
		case false:
			if (isPast(parse(task.get('due')))) {
				img.setAttribute('src', todoGlobal.resources.overdueImg);
			} else {
				img.setAttribute('src', todoGlobal.resources.openImg); 
			}
			break;
		case true:
			img.setAttribute('src', todoGlobal.resources.doneImg);
			break;
	}
	return td;
}


function createTaskRow(task, index) {
	const propOrder = ['name', 'desc', 'due', 'project', 'priority']

	const tr = document.createElement('tr');
	tr.appendChild(addStatusIcon(task));
	for (let i = 0; i < propOrder.length; i++) {
		let prop = propOrder[i];
		tr.appendChild(createDataCell(task.get(prop)));
		if (prop === 'name') tr.childNodes[1].addEventListener('click', editTask);}

	const button = createButton('Delete');
	button.addEventListener('click', deleteTask);
	addActionButton(tr, button);
	// Put index of this object in tasks array and hide it
	tr.appendChild(createDataCell(index, true));

	return tr;
}

function createTaskTable(parentElem) {
	createTableHeader(parentElem);

	for (let i = 0; i < todoGlobal.state.tasks.length; i++) {
		let task = todoGlobal.state.tasks[i];
		let tr = createTaskRow(task, i);
		parentElem.appendChild(tr);
	}
}

function addPageButtons(parentElem) {
	let button = createButton('Add Task');
	button.addEventListener('click', addTask);
	parentElem.appendChild(button);

	button = createButton('Save');
	button.addEventListener('click', saveTasks);
	parentElem.appendChild(button);
}

function createFooter(parent) {
	const images = [
		todoGlobal.resources.openImg, todoGlobal.resources.doneImg, todoGlobal.resources.overdueImg
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

	parent.appendChild(footer);
}
	
// Event Listener helpers
function delPageButtons() {
	const elem = document.getElementById('page-buttons');
	while (elem.firstChild) {
		elem.removeChild(elem.firstChild);
	}
}

function renderTask(index) {
	const taskIndex = (index >= 0 ? index : todoGlobal.state.tasks.length-1);
	const tr = createTaskRow(todoGlobal.state.tasks[taskIndex], taskIndex);
	const parentElem = document.getElementById('tasks-table');
	if (index >= 0) {
		// Add one to allow for thead
		parentElem.replaceChild(tr, parentElem.childNodes[index+1]);
	} else {
		parentElem.appendChild(tr);
	}
}

// Event Listeners
function toggleComplete(e) {
	const img = e.target;
	const cells = e.target.parentNode.parentNode.childNodes;
	const tasksIndex = parseInt(cells[cells.length - 1].textContent);

	if (todoGlobal.state.tasks[tasksIndex].get('done')) {
		if (isPast(parse(todoGlobal.state.tasks[tasksIndex].get('due')))) {
			img.src = todoGlobal.resources.overdueImg;
		} else {
			img.src = todoGlobal.resources.openImg;
		}
	} else {
		img.src = todoGlobal.resources.doneImg;
	}
	todoGlobal.state.tasks[tasksIndex].toggleDone();

	img.addEventListener('click', toggleComplete);
}

function addTask(e) {
	delPageButtons();
	todoGlobal.utility.addTaskForm(document.getElementById('page-form'),
		'task-form', todoGlobal.forms.taskForm, addTaskButton);
}

function saveTasks(e) {
	todoGlobal.state.saveData();
}


function addTaskButton(e, form) {
	e.preventDefault();
	const formData= todoGlobal.utility.getFormData(form);
	delete formData.taskindex;
	todoGlobal.state.tasks.push(myTodo.baseTodoItem(formData));
	todoGlobal.utility.deleteForm(form.id);
	renderTask(-1);
	addPageButtons(document.getElementById('page-buttons'));
}

function updateTaskButton(e, form) {
	e.preventDefault();
	const formData= todoGlobal.utility.getFormData(form);
	const taskIndex = parseInt(formData.taskindex);
	delete formData.taskindex;
	todoGlobal.state.tasks[parseInt(taskIndex)] = myTodo.baseTodoItem(formData);
	todoGlobal.utility.deleteForm(form.id);
	renderTask(taskIndex);
	addPageButtons(document.getElementById('page-buttons'));
}

function updateSiblingIndex(sibling, inc=-1) {
	while (sibling) {
		let children = sibling.childNodes;
		// Last child should be hidden node containing index into tasks
		const indexTD = children[children.length - 1]
		indexTD.textContent = parseInt(indexTD.textContent) + inc;
		sibling = sibling.nextSibling;
	}
}

function deleteTask(e) {
	const table = document.getElementById('tasks-table');
	const row = e.target.parentNode.parentNode;
	const sibling = e.target.parentNode.parentNode.nextSibling;
	const taskIndex = todoGlobal.utility.getArrayIndex(row);

	todoGlobal.state.tasks.splice(taskIndex, 1);
	table.removeChild(row);

	updateSiblingIndex(sibling);

}

function editTask(e) {
	const taskIndex = todoGlobal.utility.getArrayIndex(e.target.parentNode);
	delPageButtons();
	todoGlobal.utility.updateTaskForm(document.getElementById('page-form'),
		'task-form', todoGlobal.forms.taskForm, taskIndex, updateTaskButton);
}

function buildTaskPage() {
	const sectionElem = createSection();
	const tableElem = createTable(sectionElem);

	createTaskTable(tableElem);
	createPageActions(sectionElem);
	addPageButtons(document.getElementById('page-buttons'));
	createFooter(sectionElem);
}


export {buildTaskPage};


