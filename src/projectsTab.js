"use strict";

import * as myTodo from './todo';
import * as todoGlobal from './commonTab';

const utility = {
	// Add functions - functions that add children to a parent element

	addPageButton: function(parentElem) {
		const button = todoGlobal.utility.createButton('Add Project');
		button.addEventListener('click', utility.addProjectForm);
		parentElem.appendChild(button);
	},

	addProjectTable: function(parentElem) {
		const colHeaders = ['', 'Name', 'Due Date', 'Action'];
		const table = document.createElement('table');
		table.id = todoGlobal.elemId.projectTableId;

		todoGlobal.utility.addTableHeader(table, colHeaders);

		for (let i = 0; i < todoGlobal.state.projects.length; i++) {
			let tr = utility.createProjectRow(todoGlobal.state.projects[i], i);
			table.appendChild(tr);
		}
		parentElem.appendChild(table);
	},

	// Create functions - functions that return an element
	createProjectRow: function(project, index) {
		const propOrder = ['name','due'];
		const tr = document.createElement('tr');
		tr.appendChild(todoGlobal.utility.createStatusCell(project));

		for (let i = 0; i < propOrder.length; i++) {
			let prop = propOrder[i];
			tr.appendChild(todoGlobal.utility.createDataCell(project.get(prop)));
			if (prop === 'name') tr.childNodes[1].addEventListener('click', utility.loadProject);}

		const button = todoGlobal.utility.createButton('Delete');
		button.addEventListener('click', utility.deleteProject);
		todoGlobal.utility.addActionButton(tr, button);
		// Put index of utility object in tasks array and hide it
		tr.appendChild(todoGlobal.utility.createDataCell(index, true));
		return tr;
	},

	// Support functions
	//
	buildProjectSection: function() {
		todoGlobal.utility.addSection(
			document.getElementById(todoGlobal.elemId.projectsContainerId), 
			todoGlobal.elemId.projectsSectionId
		);
		utility.addProjectTable(document.getElementById(todoGlobal.elemId.projectsSectionId));
	},

	buildTaskSection: function() {	
		todoGlobal.utility.addSection(
			document.getElementById(todoGlobal.elemId.projectsContainerId), 
			todoGlobal.elemId.tasksSectionId
		);

		todoGlobal.utility.addTaskTable(document.getElementById(todoGlobal.elemId.tasksSectionId));
	},

	renderProject: function(index) {
		const projectIndex = (index >= 0 ? index : todoGlobal.state.projects.length-1);
		const tr = utility.createProjectRow(todoGlobal.state.projects[projectIndex], projectIndex);
		const parentElem = document.getElementById(todoGlobal.elemId.projectTableId);

		if (index >= 0) {
			// Add one to allow for thead
			parentElem.replaceChild(tr, parentElem.childNodes[index+1]);
		} else {
			parentElem.appendChild(tr);
		}
	},

	// Event listener helpers
	
	deleteTaskTable: function() {
		const table = document.getElementById(todoGlobal.elemId.taskTableId);
		table.parentNode.removeChild(table);
	},

	// Event listeners
	
	addProjectForm: function(e) {
		const saveButton = todoGlobal.utility.createModalButton('submit', 'add-project', ['btn'], 'Add Project', utility.handleSaveProject);
		todoGlobal.utility.addModalForm(todoGlobal.forms.projectForm, saveButton);
		
	},

	deleteProject: function(e) {
	},

	editProject: function(e) {
	},

	loadProject: function(e) {
		const project = e.target.textContent;
		utility.deleteTaskTable();
		todoGlobal.utility.addTaskTable(document.getElementById(todoGlobal.elemId.tasksSectionId), project);

	},

	handleSaveProject: function(e, form) {
		e.preventDefault();
		const formData = todoGlobal.utility.getFormData(form);
		console.log(formData);
		delete formData.itemindex;
		console.log(formData);
		todoGlobal.state.projects.push(myTodo.baseTodoItem(formData));
		todoGlobal.utility.deleteModal();
		utility.renderProject(-1);
	}
};

function buildProjectPage() {
	todoGlobal.utility.addSection(
		todoGlobal.utility.getRootElement(),
		todoGlobal.elemId.projectsContainerId
	);
	const container = document.getElementById(todoGlobal.elemId.projectsContainerId);
	utility.buildProjectSection();
	utility.buildTaskSection();
	todoGlobal.utility.addPageActions(container);
	const buttonsContainer = document.getElementById(todoGlobal.elemId.pageButtonsId);
	utility.addPageButton(buttonsContainer);
	todoGlobal.utility.addPageButtons(buttonsContainer);
	todoGlobal.utility.addFooter(container);
}

export {buildProjectPage};
