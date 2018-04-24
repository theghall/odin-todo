"use strict";
import * as myTodo from './todo';
import * as todoGlobal from './commonTab';
import isPast from 'date-fns/is_past';
import parse from 'date-fns/parse';

const utility = {
	pageParent: document.getElementById('container'),

	// Create Functions -- return an element
	createButton: function(text) {
		const button = document.createElement('button');
		button.textContent = text;
		button.classList.add('btn');
		return button;
	},

	createDataCell: function(text, hidden) {
		const td = document.createElement('td');
		if (hidden) td.classList.add('hidden');
		td.textContent = text;
		return td;
	},

	createSection: function createSection() {
		const section = document.createElement('section');
		section.id = 'tasks-container';
		utility.pageParent.appendChild(section);
		return section;
	},

	createStatusCell: function(task) {
		const td = document.createElement('td');
		const img = document.createElement('img');
		img.addEventListener('click', utility.toggleComplete);
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
	},

	createTable: function(parentElem) {
		const table = document.createElement('table');
		table.id = 'tasks-table';
		parentElem.appendChild(table);
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
	
	// Add functions -- add element(s) to a parent element
	addActionButton: function(tr, button) {
		const td = document.createElement('td');
		td.appendChild(button);
		tr.appendChild(td);
	},

	addFooter: function(parentElem) {
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
		parentElem.appendChild(footer);
	},

	addPageActions: function(parentElem) {
		const ids = ['page-buttons', 'page-form'];
		const parentDiv = document.createElement('div');
		parentDiv.id = 'page-actions'

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
		button.addEventListener('click', utility.saveTasks);
		parentElem.appendChild(button);
	},

	addTableHeader: function(parentElem) {
		const colHeaders = ['', 'Name', 'Description', 'Due Date', 'Project', 'Priority', 'Action'];
		const thead = document.createElement('thead');
		const tr = document.createElement('tr');

		for (let i = 0; i < colHeaders.length; i++) {
			tr.appendChild(utility.createDataCell(colHeaders[i]));
		}
		thead.appendChild(tr);
		parentElem.appendChild(thead);
	},


	addTaskTable: function(parentElem) {
		utility.addTableHeader(parentElem);

		for (let i = 0; i < todoGlobal.state.tasks.length; i++) {
			let task = todoGlobal.state.tasks[i];
			let tr = utility.createTaskRow(task, i);
			parentElem.appendChild(tr);
		}
	},
	
	// Event Listener helpers
	delPageButtons: function() {
		const elem = document.getElementById('page-buttons');

		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	},

	renderTask: function(index) {
		const taskIndex = (index >= 0 ? index : todoGlobal.state.tasks.length-1);
		const tr = utility.createTaskRow(todoGlobal.state.tasks[taskIndex], taskIndex);
		const parentElem = document.getElementById('tasks-table');

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
		todoGlobal.utility.addTaskForm(document.getElementById('page-form'),
			'task-form', todoGlobal.forms.taskForm, utility.handleAddTask);
	},

	deleteTask: function(e) {
		const table = document.getElementById('tasks-table');
		const row = e.target.parentNode.parentNode;
		const sibling = e.target.parentNode.parentNode.nextSibling;
		const taskIndex = todoGlobal.utility.getArrayIndex(row);
		todoGlobal.state.tasks.splice(taskIndex, 1);
		table.removeChild(row);
		utility.updateHiddenIndices(sibling);
	},

	editTask: function(e) {
		const taskIndex = todoGlobal.utility.getArrayIndex(e.target.parentNode);
		utility.delPageButtons();
		todoGlobal.utility.updateTaskForm(document.getElementById('page-form'),
			'task-form', todoGlobal.forms.taskForm, taskIndex, utility.handleUpdateTask);
	},

	handleAddTask: function(e, form) {
		e.preventDefault();
		const formData= todoGlobal.utility.getFormData(form);
		delete formData.taskindex;
		todoGlobal.state.tasks.push(myTodo.baseTodoItem(formData));
		todoGlobal.utility.deleteForm(form.id);
		utility.renderTask(-1);
		utility.addPageButtons(document.getElementById('page-buttons'));
	},

	handleUpdateTask: function(e, form) {
		e.preventDefault();
		const formData= todoGlobal.utility.getFormData(form);
		const taskIndex = parseInt(formData.taskindex);
		delete formData.taskindex;
		todoGlobal.state.tasks[parseInt(taskIndex)] = myTodo.baseTodoItem(formData);
		todoGlobal.utility.deleteForm(form.id);
		utility.renderTask(taskIndex);
		utility.addPageButtons(document.getElementById('page-buttons'));
	},

	saveTasks: function(e) {
		todoGlobal.state.saveData();
	},

	toggleComplete: function(e) {
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
		img.addEventListener('click', utility.toggleComplete);
	}
};

function buildTaskPage() {
	const sectionElem = utility.createSection();
	const tableElem = utility.createTable(sectionElem);

	utility.addTaskTable(tableElem);
	utility.addPageActions(sectionElem);
	utility.addPageButtons(document.getElementById('page-buttons'));
	utility.addFooter(sectionElem);
}


export {utility, buildTaskPage};


