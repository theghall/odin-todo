/**
 * @format
 */
require('normalize.css');

import * as myTodo from './todo';
import * as todoGlobal from './commonTab';

const projectGlobal = {
  projectBarLabels: ['Project:', 'Desc:', 'Due:', 'Priority:', 'Complete:'],
};

const utility = {
  // Add functions - functions that add children to a parent element

  addPageButtons(parentElem) {
    const button = todoGlobal.utility.createButton('Add Project');
    button.addEventListener('click', utility.addProjectForm);
    parentElem.appendChild(button);
  },

  addProjectBar(parentElem) {
    parentElem.appendChild(utility.createProjectBar());
  },

  addProjectTable(parentElem) {
    const colHeaders = ['', 'Name', 'Due Date', 'Action'];
    const table = document.createElement('table');
    table.id = todoGlobal.elemId.projectTableId;

    todoGlobal.utility.addTableHeader(table, colHeaders);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let i = 0; i < todoGlobal.state.projects.length; i += 1) {
      const tr = utility.createProjectRow(todoGlobal.state.projects[i], i);
      tbody.appendChild(tr);
    }

    parentElem.appendChild(table);
  },

  // Create functions - functions that return an element
  createProjectBar() {
    const section = document.createElement('section');
    section.id = todoGlobal.elemId.projectStatusBarId;

    for (let i = 0; i < projectGlobal.projectBarLabels.length; i += 1) {
      const span = document.createElement('span');
      span.textContent = projectGlobal.projectBarLabels[i];
      section.appendChild(span);
    }

    section.appendChild(document.createElement('hr'));

    return section;
  },

  createProjectRow(project, index) {
    const propOrder = ['name', 'due'];
    const tr = document.createElement('tr');
    tr.appendChild(todoGlobal.utility.createStatusCell(project));

    for (let i = 0; i < propOrder.length; i += 1) {
      const prop = propOrder[i];
      tr.appendChild(
        todoGlobal.utility.createDataCell('td', project.get(prop)),
      );
      if (prop === 'name')
        tr.childNodes[1].addEventListener('click', utility.loadProject);
    }

    const button = todoGlobal.utility.createButton('Delete');
    button.addEventListener('click', utility.deleteProject);
    todoGlobal.utility.addActionButton(tr, button);
    // Put index of utility object in tasks array and hide it
    tr.appendChild(todoGlobal.utility.createDataCell('td', index, true));
    return tr;
  },

  // Support functions
  //
  buildProjectSection() {
    todoGlobal.utility.addSection(
      document.getElementById(todoGlobal.elemId.projectsContainerId),
      todoGlobal.elemId.projectsSectionId,
    );
    utility.addProjectTable(
      document.getElementById(todoGlobal.elemId.projectsSectionId),
    );
  },

  buildTaskSection() {
    todoGlobal.utility.addSection(
      document.getElementById(todoGlobal.elemId.projectsContainerId),
      todoGlobal.elemId.tasksSectionId,
    );
    utility.addProjectBar(
      document.getElementById(todoGlobal.elemId.tasksSectionId),
    );

    todoGlobal.utility.addTaskTable(
      document.getElementById(todoGlobal.elemId.tasksSectionId),
    );
  },

  calcPercentComplete(projectName) {
    const tasks = todoGlobal.state.tasks.filter(
      item => projectName === null || item.get('project') === projectName,
    );
    const numTasks = tasks.length;
    const numComplete = tasks.filter(item => item.get('done') === true).length;

    return Math.round(numTasks === 0 ? 0 : numComplete / numTasks * 100);
  },

  renderProject(index) {
    const projectIndex =
      index >= 0 ? index : todoGlobal.state.projects.length - 1;
    const tr = utility.createProjectRow(
      todoGlobal.state.projects[projectIndex],
      projectIndex,
    );
    const parentElem = document.getElementById(
      todoGlobal.elemId.projectTableId,
    );
    const tbody = parentElem.querySelector('tbody');

    if (index >= 0) {
      // Add one to allow for thead
      parentElem.replaceChild(tr, parentElem.childNodes[index + 1]);
    } else {
      tbody.appendChild(tr);
    }
  },

  updateProjectBar(project) {
    if (project === null) {
      const parentElem = document.getElementById(
        todoGlobal.elemId.tasksSectionId,
      );
      const section = utility.createProjectBar();
      parentElem.replaceChild(
        section,
        document.getElementById(todoGlobal.elemId.projectStatusBarId),
      );
      return;
    }
    const propOrder = ['name', 'desc', 'due', 'priority'];
    const section = document.createElement('section');
    section.id = todoGlobal.elemId.projectStatusBarId;

    for (let i = 0; i < propOrder.length; i += 1) {
      const span = document.createElement('span');
      span.textContent = `${projectGlobal.projectBarLabels[i]} ${project.get(
        propOrder[i],
      )}`;
      section.appendChild(span);
    }
    const percentComplete = utility.calcPercentComplete(project.get('name'));
    const span = document.createElement('span');
    span.textContent = `${
      projectGlobal.projectBarLabels[projectGlobal.projectBarLabels.length - 1]
    } ${percentComplete}%`;
    section.appendChild(span);
    section.appendChild(document.createElement('hr'));

    const parentElem = document.getElementById(
      todoGlobal.elemId.tasksSectionId,
    );
    parentElem.replaceChild(
      section,
      document.getElementById(todoGlobal.elemId.projectStatusBarId),
    );
  },

  // Event listener helpers

  deleteProjectTasks(projectName) {
    // Every splice moves items to a new index
    let accum = 0;
    const indices = todoGlobal.utility.buildIndices(projectName);
    for (let i = 0; i < indices.length; i += 1) {
      todoGlobal.state.tasks.splice(indices[i] - accum, 1);
      accum += 1;
    }
  },

  deleteTaskTable() {
    const table = document.getElementById(todoGlobal.elemId.taskTableId);
    table.parentNode.removeChild(table);
  },

  // Event listeners

  addProjectForm(e) {
    const saveButton = todoGlobal.utility.createModalButton(
      'submit',
      'add-project',
      ['btn'],
      'Add Project',
      utility.handleSaveProject,
    );
    todoGlobal.utility.addModalForm(todoGlobal.forms.projectForm, saveButton);
  },

  deleteProject(e) {
    const table = document.getElementById(todoGlobal.elemId.projectTableId);
    const tbody = table.querySelector('tbody');
    const row = e.target.parentNode.parentNode;
    const sibling = e.target.parentNode.parentNode.nextSibling;
    const projectIndex = todoGlobal.utility.getArrayIndex(row);
    const project = todoGlobal.state.projects[projectIndex];
    todoGlobal.state.projects.splice(projectIndex, 1);
    tbody.removeChild(row);
    // Once project is deleted from the arrey, the hidden indices will
    // be off, so they need to be updated
    todoGlobal.utility.updateHiddenIndices(sibling);
    // Delete tasks associated with this project
    utility.deleteProjectTasks(project.get('name'));
    todoGlobal.state.currentProject = null;
    utility.deleteTaskTable();
    utility.updateProjectBar(project);
    todoGlobal.utility.addTaskTable(
      document.getElementById(todoGlobal.elemId.tasksSectionId),
    );
  },

  handleContainerClicks(e) {
    utility.updateProjectBar(todoGlobal.state.currentProject);
  },

  handleSaveProject(e) {
    e.preventDefault();
    const form = e.target.parentNode;
    const formData = todoGlobal.utility.getFormData(form);
    delete formData.itemindex;
    todoGlobal.state.projects.push(myTodo.baseTodoItem(formData));
    todoGlobal.utility.deleteModal();
    utility.renderProject(-1);
  },

  loadProject(e) {
    // Display all associated tasks for a project
    const row = e.target.parentNode;
    const index = todoGlobal.utility.getArrayIndex(row);
    const project = todoGlobal.state.projects[index];
    todoGlobal.state.currentProject = project;
    utility.updateProjectBar(project);
    const parentElem = document.getElementById(
      todoGlobal.elemId.tasksSectionId,
    );
    const tableElem = document.getElementById(todoGlobal.elemId.taskTableId);
    const taskTable = todoGlobal.utility.createTaskTable(project.get('name'));
    parentElem.replaceChild(taskTable, tableElem);
  },
};

function buildProjectPage() {
  todoGlobal.state.currentProject = null;

  // Add Container for projects and tasks
  todoGlobal.utility.addSection(
    todoGlobal.utility.getRootElement(),
    todoGlobal.elemId.projectsContainerId,
  );
  const projectContainer = document.getElementById(
    todoGlobal.elemId.projectsContainerId,
  );
  projectContainer.addEventListener('click', utility.handleContainerClicks);

  utility.buildProjectSection();
  utility.buildTaskSection();
  const taskContainer = document.getElementById(
    todoGlobal.elemId.tasksSectionId,
  );
  todoGlobal.utility.addActionSection(taskContainer);
  utility.addPageButtons(
    document.getElementById(todoGlobal.elemId.pageButtonsId),
  );
  todoGlobal.utility.addPageButtons(
    document.getElementById(todoGlobal.elemId.pageButtonsId),
  );
  todoGlobal.utility.addFooter(projectContainer);
}

export default buildProjectPage;
