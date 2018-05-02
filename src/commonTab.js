import isPast from 'date-fns/is_past';
import parse from 'date-fns/parse';
import * as myTodo from './todo';

const state = {
  tasks: [],
  projects: [],
  currentProject: null,
  loadData() {
    if (localStorage) {
      const tasks = localStorage.getItem('tasks');
      const projects = localStorage.getItem('projects');
      if (tasks) state.tasks = JSON.parse(tasks).map(task => myTodo.baseTodoItem(task));
      if (projects) {
        state.projects = (JSON.parse(projects).map(project => myTodo.baseTodoItem(project)));
      }
    } else {
      alert('Cannot load any data');
    }
  },
  saveData() {
    if (localStorage) {
      localStorage.clear();
      const states = state.tasks.map(task => task.exportState());
      localStorage.setItem('tasks', JSON.stringify(states));
      const projects = state.projects.map(project => project.exportState());
      localStorage.setItem('projects', JSON.stringify(projects));
    } else {
      alert('Unable to save your tasks and projects');
    }
  },
};

const elemId = {
  containerId: 'container',
  footerId: 'footer',
  pageActionsId: 'page-actions',
  pageButtonsId: 'page-buttons',
  pageFormId: 'page-form',
  popupContainerId: 'popup-container',
  popupDisplayId: 'popup-show',
  popupFormId: 'popup-form',
  projectsContainerId: 'projects-container',
  projectsSectionId: 'projects',
  projectStatusBarId: 'project-bar',
  projectTableId: 'projects-table',
  taskContainerId: 'tasks-container',
  tasksSectionId: 'tasks',
  taskTableId: 'tasks-table',
};

const resources = {
  doneImg: 'assets/graphics/complete25x25.png',
  openImg: 'assets/graphics/open25x25.png',
  overdueImg: 'assets/graphics/overdue25x25.jpg',
};

const forms = {
  taskForm: [
    {
      tag: 'label', attrs: [{ name: 'for', value: 'name' }], text: 'Name', required: null,
    },
    {
      tag: 'input', attrs: [{ name: 'type', value: 'text' }, { name: 'name', value: 'name' }], text: '', required: true,
    },
    { tag: 'label', attrs: [{ name: 'for', value: 'desc' }], text: 'Description' },
    {
      tag: 'input', attrs: [{ name: 'type', value: 'text' }, { name: 'name', value: 'desc' }], text: '', required: true,
    },
    { tag: 'label', attrs: [{ name: 'for', value: 'date' }], text: 'Due Date' },
    {
      tag: 'input', attrs: [{ name: 'type', value: 'date' }, { name: 'name', value: 'due' }], text: '', required: true,
    },
    { tag: 'label', attrs: [{ name: 'for', value: 'project' }], text: 'project' },
    {
      tag: 'select', attrs: [{ name: 'name', value: 'project' }], text: '', required: false,
    },
    { tag: 'label', attrs: [{ name: 'for', value: 'priority' }], text: 'Priority' },
    {
      tag: 'input',
      attrs: [{ name: 'type', value: 'number' },
        { name: 'name', value: 'priority' }, { name: 'min', value: '1' }, { name: 'max', value: '10' }],
      text: '',
      required: true,
    },
  ],

  projectForm: [
    {
      tag: 'label', attrs: [{ name: 'for', value: 'name' }], text: 'Name', required: null,
    },
    {
      tag: 'input', attrs: [{ name: 'type', value: 'text' }, { name: 'name', value: 'name' }], text: '', required: true,
    },
    { tag: 'label', attrs: [{ name: 'for', value: 'desc' }], text: 'Description' },
    {
      tag: 'input', attrs: [{ name: 'type', value: 'text' }, { name: 'name', value: 'desc' }], text: '', required: true,
    },
    { tag: 'label', attrs: [{ name: 'for', value: 'date' }], text: 'Due Date' },
    {
      tag: 'input', attrs: [{ name: 'type', value: 'date' }, { name: 'name', value: 'due' }], text: '', required: true,
    },
    { tag: 'label', attrs: [{ name: 'for', value: 'priority' }], text: 'Priority' },
    {
      tag: 'input',
      attrs: [{ name: 'type', value: 'number' },
        { name: 'name', value: 'priority' }, { name: 'min', value: '1' }, { name: 'max', value: '10' }],
      text: '',
      required: true,
    },
  ],
};


const utility = {
  // Create Functions -- return an element
  createButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('btn');
    return button;
  },

  createModalButton(type, id, classes, text, callback) {
    const button = document.createElement('button');
    button.setAttribute('type', type);
    button.id = id;
    for (let i = 0; i < classes.length; i += 1) { button.classList.add(classes[i]); }
    button.textContent = text;
    button.addEventListener('click', callback);
    return button;
  },

  createDataCell(tag, text, hidden) {
    const td = document.createElement(tag);
    if (hidden) td.classList.add('hidden');
    td.textContent = text;
    return td;
  },

  createSection: function createSection(id) {
    const section = document.createElement('section');
    section.id = id;
    return section;
  },

  createStatusCell(item) {
    const td = document.createElement('td');
    const img = document.createElement('img');
    img.addEventListener('click', utility.toggleComplete);
    td.appendChild(img);

    switch (item.get('done')) {
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

  createTable(id) {
    const table = document.createElement('table');
    table.id = id;
    return table;
  },

  createTaskRow(task, index) {
    const propOrder = ['name', 'desc', 'due', 'project', 'priority'];
    const tr = document.createElement('tr');
    // value of done is represented by an icon
    tr.appendChild(utility.createStatusCell(task));

    for (let i = 0; i < propOrder.length; i += 1) {
      const prop = propOrder[i];
      tr.appendChild(utility.createDataCell('td', task.get(prop)));
      if (prop === 'name') tr.childNodes[1].addEventListener('click', utility.addEditTaskForm);
    }

    const button = utility.createButton('Delete');
    button.addEventListener('click', utility.deleteTask);
    utility.addActionButton(tr, button);
    // Put index of utility object in tasks array and hide it
    tr.appendChild(utility.createDataCell('td', index, true));
    return tr;
  },

  createTaskTable(projectName) {
    const colHeaders = ['', 'Name', 'Description', 'Due Date', 'Project', 'Priority', 'Action'];
    const table = utility.createTable(elemId.taskTableId);
    utility.addTableHeader(table, colHeaders);
    table.append(document.createElement('tbody'));
    utility.addProjectTasks(table, projectName);
    return table;
  },

  // Add functions, add child element(s) to a parent element
  addActionButton(tr, button) {
    const td = document.createElement('td');
    td.appendChild(button);
    tr.appendChild(td);
  },

  addFooter(parentElem) {
    const images = [
      resources.openImg, resources.doneImg, resources.overdueImg,
    ];
    const legend = ['Undone', 'Done', 'Overdue'];
    const footer = document.createElement('footer');
    footer.id = elemId.footerId;

    for (let i = 0; i < images.length; i += 1) {
      const img = document.createElement('img');
      img.src = images[i];
      footer.appendChild(img);
      const p = document.createElement('p');
      p.textContent = legend[i];
      footer.appendChild(p);
    }
    parentElem.appendChild(footer);
  },

  addModalForm(formItems, saveButton, data = null, hidden = null) {
    // This div sets up form to be "modal" by CSS
    const displayContainer = document.createElement('div');
    displayContainer.id = elemId.popupDisplayId;
    displayContainer.classList.add('block');

    const popupContainer = document.createElement('div');
    popupContainer.id = elemId.popupContainerId;
    displayContainer.appendChild(popupContainer);

    const form = document.createElement('form');
    form.id = elemId.popupFormId;
    utility.buildForm(form, formItems, data, hidden);

    form.appendChild(saveButton);
    const cancelButton = utility.createButton('Cancel');
    cancelButton.addEventListener('click', utility.closeModal);
    form.appendChild(cancelButton);
    popupContainer.appendChild(form);

    utility.getRootElement().appendChild(displayContainer);
  },

  addActionSection(parentElem) {
    const ids = [elemId.pageButtonsId];
    const parentDiv = document.createElement('div');
    parentDiv.id = elemId.pageActionsId;

    for (let i = 0; i < ids.length; i += 1) {
      const div = document.createElement('div');
      div.id = ids[i];
      parentDiv.appendChild(div);
    }
    parentElem.appendChild(parentDiv);
  },

  addPageButtons(parentElem) {
    let button = utility.createButton('Add Task');
    button.addEventListener('click', utility.addTaskForm);
    parentElem.appendChild(button);

    button = utility.createButton('Save');
    button.addEventListener('click', utility.save);
    parentElem.appendChild(button);
  },

  addProjectTasks(table, projectName) {
    const tasks = state.tasks.filter(item => projectName === null || item.get('project') === projectName);
    // Need to do this since on the projects tab the row index will not
    // neccesarily equal the array index when the user displays project tasks
    const indices = utility.buildIndices(projectName);
    const tbody = table.querySelector('tbody');

    for (let i = 0; i < tasks.length; i += 1) {
      const task = tasks[i];
      const tr = utility.createTaskRow(task, indices[i]);
      tbody.appendChild(tr);
    }
  },

  addSection(parentElem, id) {
    parentElem.appendChild(utility.createSection(id));
  },

  addTableHeader(parentElem, colHeaders) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (let i = 0; i < colHeaders.length; i += 1) {
      tr.appendChild(utility.createDataCell('th', colHeaders[i]));
    }
    thead.appendChild(tr);
    parentElem.appendChild(thead);
  },

  addTaskTable(parentElem, projectName = null) {
    const table = utility.createTaskTable(projectName);
    parentElem.appendChild(table);
  },

  // Support functions
  setAttributes(tag, attrs, elem, data) {
    for (let i = 0; i < attrs.length; i += 1) {
      const { name, value } = attrs[i];
      elem.setAttribute(name, value);
      if (tag === 'input' && name === 'name') {
        if (data) elem.value = data.get(value);
      } else if (tag === 'select' && name === 'name') {
      }
    }
  },

  addHiddenFields(form, hidden) {
    for (let i = 0; i < hidden.length; i += 1) {
      const hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', hidden[i].name);
      hiddenInput.setAttribute('value', hidden[i].value);
      form.appendChild(hiddenInput);
    }
  },

  addProjectOptions(item = null) {
    // Add a dropdown list of current projects, if any
    const form = document.getElementById(elemId.popupFormId);
    const selectElem = form.querySelector('select[name="project"]');

    const emptyOption = document.createElement('option');
    emptyOption.setAttribute('value', '');
    emptyOption.textContent = '';
    selectElem.appendChild(emptyOption);

    for (let i = 0; i < state.projects.length; i += 1) {
      const option = state.projects[i].get('name');
      const optionElem = document.createElement('option');
      optionElem.setAttribute('value', option);
      if (item && option === item.get('project')) {
        optionElem.setAttribute('selected', 'selected');
      } else if (state.currentProject !== null && option === state.currentProject.get('name')) {
        optionElem.setAttribute('selected', 'selected');
      }
      optionElem.textContent = option;
      selectElem.appendChild(optionElem);
    }
  },

  buildButton(form, type, id, classes, text, callback) {
    const button = document.createElement('button');
    button.setAttribute('type', type);
    button.id = id;
    for (let i = 0; i < classes.length; i += 1) { button.classList.add(classes[i]); }
    button.textContent = text;
    form.appendChild(button);
    button.addEventListener('click', (e) => { callback(e, form); });
  },

  buildForm(form, items, data = null, hidden = null) {
    // Take array defining an HTML form item and turn it into HTML Element
    // with all its attributes
    if (hidden) utility.addHiddenFields(form, hidden);
    for (let i = 0; i < items.length; i += 1) {
      const { tag, attrs } = items[i];
      const elem = document.createElement(items[i].tag);
      if (items[i].tag === 'input') elem.classList.add('form-input');
      utility.setAttributes(tag, attrs, elem, data);
      if (items[i].required) elem.setAttribute('required', 'required');
      if (items[i].text !== '') elem.textContent = items[i].text;
      form.appendChild(elem);
      form.appendChild(document.createElement('br'));
    }
  },

  buildIndices(projectName) {
    const mapCallback = function (item, index) {
      return (projectName == null || item.get('project') === projectName ? index : null);
    };
    // Strip out nulls from above, leaving us with the indices we want
    return state.tasks.map((item, index) => mapCallback(item, index)).filter(item => item !== null);
  },

  deleteFooter() {
    const footer = document.getElementById(elemId.footerId);
    footer.parentNode.removeChild(footer);
  },

  deleteForm(formId) {
    const form = document.getElementById(formId);
    const parent = form.parentNode;
    parent.removeChild(form);
  },

  deleteModal() {
    const modal = document.getElementById(elemId.popupDisplayId);
    modal.parentNode.removeChild(modal);
  },

  getArrayIndex(row) {
    const children = row.childNodes;
    // Last element should be hidden TD containing array index
    return parseInt(children[children.length - 1].textContent, 10);
  },

  getFormData(form) {
    const itemIndex = this.getTextValue(form, 'itemindex');
    const name = this.getTextValue(form, 'name');
    const desc = this.getTextValue(form, 'desc');
    const due = this.getTextValue(form, 'due');
    const project = this.getTextValue(form, 'project');
    const priority = this.getTextValue(form, 'priority');

    return {
      name,
      desc,
      due,
      project,
      priority,
      done: false,
      itemindex: itemIndex,
    };
  },

  getRootElement() {
    return document.getElementById(elemId.containerId);
  },

  getTextValue(form, field) {
    const inputElem = form.querySelector(`input[name=${field}]`);
    let value = null;
    if (inputElem !== null) {
      value = inputElem.value;
    } else {
      const selectElem = form.querySelector(`select[name=${field}]`);
      if (selectElem !== null) {
        value = selectElem.value;
      }
    }
    return value;
  },

  // Event Listener helpers
  delPageButtons() {
    const elem = document.getElementById(elemId.pageButtonsId);

    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  },

  renderTask(index) {
    const taskIndex = (index >= 0 ? index : state.tasks.length - 1);
    const tr = utility.createTaskRow(state.tasks[taskIndex], taskIndex);
    const table = document.getElementById(elemId.taskTableId);
    const tbody = table.querySelector('tbody');

    if (index >= 0) {
      tbody.replaceChild(tr, tbody.childNodes[index]);
    } else {
      tbody.appendChild(tr);
    }
  },

  updateHiddenIndices(sibling, inc = -1) {
    let aSibling = sibling;
    while (aSibling) {
      const children = sibling.childNodes;
      // Last child should be hidden node containing index into tasks
      const indexTD = children[children.length - 1];
      indexTD.textContent = parseInt(indexTD.textContent, 10) + inc;
      aSibling = aSibling.nextSibling;
    }
  },

  // Event Listeners
  addTaskForm(e) {
    const saveButton = utility.createModalButton('submit', 'add-task', ['btn'], 'Add Task', utility.handleAddTask);
    utility.addModalForm(forms.taskForm, saveButton);
    utility.addProjectOptions();
  },

  closeModal(e) {
    utility.deleteModal();
  },

  deleteTask(e) {
    const table = document.getElementById(elemId.taskTableId);
    const tbody = table.querySelector('tbody');
    const row = e.target.parentNode.parentNode;
    const sibling = e.target.parentNode.parentNode.nextSibling;
    const taskIndex = utility.getArrayIndex(row);
    state.tasks.splice(taskIndex, 1);
    tbody.removeChild(row);
    // Now that the task is deleted from the array, the hidden indices will
    // be off, so they need to be updated
    utility.updateHiddenIndices(sibling);
  },

  addEditTaskForm(e) {
    const taskIndex = utility.getArrayIndex(e.target.parentNode);
    const hidden = [{ name: 'itemindex', value: taskIndex }];
    const updateButton = utility.createModalButton('submit', 'update-task', ['btn'], 'Update Task', utility.handleUpdateTask);
    utility.addModalForm(forms.taskForm, updateButton, state.tasks[taskIndex], hidden);
    utility.addProjectOptions(state.tasks[taskIndex]);
  },

  handleAddTask(e) {
    e.preventDefault();
    const form = e.target.parentNode;
    const formData = utility.getFormData(form);
    delete formData.itemindex;
    state.tasks.push(myTodo.baseTodoItem(formData));
    utility.deleteModal();
    utility.renderTask(-1);
  },

  handleUpdateTask(e) {
    e.preventDefault();
    const form = e.target.parentNode;
    const formData = utility.getFormData(form);
    const taskIndex = parseInt(formData.itemindex, 10);
    delete formData.itemindex;
    state.tasks[parseInt(taskIndex, 10)] = myTodo.baseTodoItem(formData);
    utility.deleteModal();
    utility.renderTask(taskIndex);
  },

  save(e) {
    state.saveData();
  },

  toggleComplete(e) {
    const img = e.target;
    // tr->tbody->table
    const tableId = e.target.parentNode.parentNode.parentNode.parentNode.id;
    const cells = e.target.parentNode.parentNode.childNodes;
    const index = parseInt(cells[cells.length - 1].textContent, 10);

    const itemArray = (tableId === elemId.taskTableId ? state.tasks : state.projects);

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
  },

};

export { state, elemId, forms, resources, utility };
