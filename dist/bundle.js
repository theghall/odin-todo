/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tasksTab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _projectsTab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _commonTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/**
 * @format
 */
__webpack_require__(1);
// normalize.css must be loaded first before app css, so disable eslint check
/* eslint-disable import/first */




/* eslint-enable import/first */

// Event listener helpers
function removeContainer(id) {
  const elem = document.getElementById(id);
  if (elem) elem.parentNode.removeChild(elem);
}

function selectTab(e) {
  const activeClass = 'selected';

  // Find menu associated with '#main-nav'
  const mainNav = document.getElementById('main-nav');
  const childrenArr = [...mainNav.children];

  // Find currently selected item, deselect it, select clicked item
  for (let i = 0; i < childrenArr.length; i += 1) {
    // Should be menu we're looking for
    if (childrenArr[i].tagName === 'UL') {
      const ulChildrenArr = [...childrenArr[i].children];
      for (let j = 0; j < ulChildrenArr.length; j += 1) {
        // Once active tab is found make other tab active
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

// Eventlisteners

function makeTabActive(e) {
  const activeClass = 'selected';

  // Ignore click if on currently selected tab
  if (!e.target.classList.contains(activeClass)) {
    _commonTab__WEBPACK_IMPORTED_MODULE_3__["state"].currentProject = null;
    selectTab(e);

    switch (e.target.textContent) {
      case 'Tasks':
        removeContainer(_commonTab__WEBPACK_IMPORTED_MODULE_3__["elemId"].projectsContainerId);
        Object(_tasksTab__WEBPACK_IMPORTED_MODULE_1__["default"])();
        break;
      case 'Projects':
        removeContainer(_commonTab__WEBPACK_IMPORTED_MODULE_3__["elemId"].taskContainerId);
        Object(_projectsTab__WEBPACK_IMPORTED_MODULE_2__["default"])();
        break;
    }
  }
}

// Support functions

function addTabListener(target) {
  target.addEventListener('click', e => {
    makeTabActive(e);
  });
}

function createTabMenu() {
  const menuItems = ['Tasks', 'Projects'];

  const container = document.getElementById('container');

  const nav = document.createElement('nav');
  nav.id = 'main-nav';

  const ul = document.createElement('ul');
  ul.classList.add('tabrow');

  for (let i = 0; i < menuItems.length; i += 1) {
    const li = document.createElement('li');
    li.textContent = menuItems[i];

    // Make first item "active"
    if (i === 0) li.classList.add('selected');

    ul.appendChild(li);

    addTabListener(li);
  }

  nav.appendChild(ul);
  container.appendChild(nav);
}

function ready() {
  _commonTab__WEBPACK_IMPORTED_MODULE_3__["state"].loadData();
  createTabMenu();
  Object(_tasksTab__WEBPACK_IMPORTED_MODULE_1__["default"])();
}

document.addEventListener('DOMContentLoaded', ready);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commonTab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/**
 * @format
 */


function buildTaskPage() {
  _commonTab__WEBPACK_IMPORTED_MODULE_0__["utility"].addSection(
    _commonTab__WEBPACK_IMPORTED_MODULE_0__["utility"].getRootElement(),
    _commonTab__WEBPACK_IMPORTED_MODULE_0__["elemId"].taskContainerId,
  );

  const sectionElem = document.getElementById(
    _commonTab__WEBPACK_IMPORTED_MODULE_0__["elemId"].taskContainerId,
  );

  _commonTab__WEBPACK_IMPORTED_MODULE_0__["utility"].addTaskTable(sectionElem);
  _commonTab__WEBPACK_IMPORTED_MODULE_0__["utility"].addActionSection(sectionElem);
  _commonTab__WEBPACK_IMPORTED_MODULE_0__["utility"].addPageButtons(
    document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_0__["elemId"].pageButtonsId),
  );
  _commonTab__WEBPACK_IMPORTED_MODULE_0__["utility"].addFooter(sectionElem);
}

/* harmony default export */ __webpack_exports__["default"] = (buildTaskPage);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elemId", function() { return elemId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forms", function() { return forms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resources", function() { return resources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utility", function() { return utility; });
/* harmony import */ var date_fns_is_past__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var date_fns_is_past__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(date_fns_is_past__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns_parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var date_fns_parse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns_parse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/**
 * @format
 */




const state = {
  tasks: [],
  projects: [],
  currentProject: null,
  loadData() {
    if (localStorage) {
      const tasks = localStorage.getItem('tasks');
      const projects = localStorage.getItem('projects');
      if (tasks)
        state.tasks = JSON.parse(tasks).map(task => _todo__WEBPACK_IMPORTED_MODULE_2__["baseTodoItem"](task));
      if (projects) {
        state.projects = JSON.parse(projects).map(project =>
          _todo__WEBPACK_IMPORTED_MODULE_2__["baseTodoItem"](project)
        );
      }
    } else { alert('Cannot load any data'); }
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
      tag: 'label',
      attrs: [{ name: 'for', value: 'name' }],
      text: 'Name',
      required: null,
    },
    {
      tag: 'input',
      attrs: [{ name: 'type', value: 'text' }, { name: 'name', value: 'name' }],
      text: '',
      required: true,
    },
    {
      tag: 'label',
      attrs: [{ name: 'for', value: 'desc' }],
      text: 'Description',
    },
    {
      tag: 'input',
      attrs: [{ name: 'type', value: 'text' }, { name: 'name', value: 'desc' }],
      text: '',
      required: true,
    },
    { tag: 'label', attrs: [{ name: 'for', value: 'date' }], text: 'Due Date' },
    {
      tag: 'input',
      attrs: [{ name: 'type', value: 'date' }, { name: 'name', value: 'due' }],
      text: '',
      required: true,
    },
    {
      tag: 'label',
      attrs: [{ name: 'for', value: 'project' }],
      text: 'project',
    },
    {
      tag: 'select',
      attrs: [{ name: 'name', value: 'project' }],
      text: '',
      required: false,
    },
    {
      tag: 'label',
      attrs: [{ name: 'for', value: 'priority' }],
      text: 'Priority',
    },
    {
      tag: 'input',
      attrs: [
        { name: 'type', value: 'number' },
        { name: 'name', value: 'priority' },
        { name: 'min', value: '1' },
        { name: 'max', value: '10' },
      ],
      text: '',
      required: true,
    },
  ],

  projectForm: [
    {
      tag: 'label',
      attrs: [{ name: 'for', value: 'name' }],
      text: 'Name',
      required: null,
    },
    {
      tag: 'input',
      attrs: [{ name: 'type', value: 'text' }, { name: 'name', value: 'name' }],
      text: '',
      required: true,
    },
    {
      tag: 'label',
      attrs: [{ name: 'for', value: 'desc' }],
      text: 'Description',
    },
    {
      tag: 'input',
      attrs: [{ name: 'type', value: 'text' }, { name: 'name', value: 'desc' }],
      text: '',
      required: true,
    },
    { tag: 'label', attrs: [{ name: 'for', value: 'date' }], text: 'Due Date' },
    {
      tag: 'input',
      attrs: [{ name: 'type', value: 'date' }, { name: 'name', value: 'due' }],
      text: '',
      required: true,
    },
    {
      tag: 'label',
      attrs: [{ name: 'for', value: 'priority' }],
      text: 'Priority',
    },
    {
      tag: 'input',
      attrs: [
        { name: 'type', value: 'number' },
        { name: 'name', value: 'priority' },
        { name: 'min', value: '1' },
        { name: 'max', value: '10' },
      ],
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
    for (let i = 0; i < classes.length; i += 1) {
      button.classList.add(classes[i]);
    }
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
        if (date_fns_is_past__WEBPACK_IMPORTED_MODULE_0___default()(date_fns_parse__WEBPACK_IMPORTED_MODULE_1___default()(item.get('due')))) {
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
      if (prop === 'name')
        tr.childNodes[1].addEventListener('click', utility.addEditTaskForm);
    }

    const button = utility.createButton('Delete');
    button.addEventListener('click', utility.deleteTask);
    utility.addActionButton(tr, button);
    // Put index of utility object in tasks array and hide it
    tr.appendChild(utility.createDataCell('td', index, true));
    return tr;
  },

  createTaskTable(projectName) {
    const colHeaders = [
      '',
      'Name',
      'Description',
      'Due Date',
      'Project',
      'Priority',
      'Action',
    ];
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
    const images = [resources.openImg, resources.doneImg, resources.overdueImg];
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
    // This div sets up form to be 'modal' by CSS
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
    const tasks = state.tasks.filter(
      item => projectName === null || item.get('project') === projectName
    );
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
      } else if (
        state.currentProject !== null &&
        option === state.currentProject.get('name')
      ) {
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
    for (let i = 0; i < classes.length; i += 1) {
      button.classList.add(classes[i]);
    }
    button.textContent = text;
    form.appendChild(button);
    button.addEventListener('click', e => {
      callback(e, form);
    });
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
    const mapCallback = function(item, index) {
      return projectName == null || item.get('project') === projectName
        ? index
        : null;
    };
    // Strip out nulls from above, leaving us with the indices we want
    return state.tasks
      .map((item, index) => mapCallback(item, index))
      .filter(item => item !== null);
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
    const taskIndex = index >= 0 ? index : state.tasks.length - 1;
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
    const saveButton = utility.createModalButton(
      'submit',
      'add-task',
      ['btn'],
      'Add Task',
      utility.handleAddTask
    );
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
    const updateButton = utility.createModalButton(
      'submit',
      'update-task',
      ['btn'],
      'Update Task',
      utility.handleUpdateTask
    );
    utility.addModalForm(
      forms.taskForm,
      updateButton,
      state.tasks[taskIndex],
      hidden
    );
    utility.addProjectOptions(state.tasks[taskIndex]);
  },

  handleAddTask(e) {
    e.preventDefault();
    const form = e.target.parentNode;
    const formData = utility.getFormData(form);
    delete formData.itemindex;
    state.tasks.push(_todo__WEBPACK_IMPORTED_MODULE_2__["baseTodoItem"](formData));
    utility.deleteModal();
    utility.renderTask(-1);
  },

  handleUpdateTask(e) {
    e.preventDefault();
    const form = e.target.parentNode;
    const formData = utility.getFormData(form);
    const taskIndex = parseInt(formData.itemindex, 10);
    delete formData.itemindex;
    state.tasks[parseInt(taskIndex, 10)] = _todo__WEBPACK_IMPORTED_MODULE_2__["baseTodoItem"](formData);
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

    const itemArray =
      tableId === elemId.taskTableId ? state.tasks : state.projects;

    if (itemArray[index].get('done')) {
      if (date_fns_is_past__WEBPACK_IMPORTED_MODULE_0___default()(date_fns_parse__WEBPACK_IMPORTED_MODULE_1___default()(itemArray[index].get('due')))) {
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




/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(6)

/**
 * @category Common Helpers
 * @summary Is the given date in the past?
 *
 * @description
 * Is the given date in the past?
 *
 * @param {Date|String|Number} date - the date to check
 * @returns {Boolean} the date is in the past
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * var result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
function isPast (dirtyDate) {
  return parse(dirtyDate).getTime() < new Date().getTime()
}

module.exports = isPast


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var getTimezoneOffsetInMilliseconds = __webpack_require__(7)
var isDate = __webpack_require__(8)

var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000
var DEFAULT_ADDITIONAL_DIGITS = 2

var parseTokenDateTimeDelimeter = /[T ]/
var parseTokenPlainTime = /:/

// year tokens
var parseTokenYY = /^(\d{2})$/
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
]

var parseTokenYYYY = /^(\d{4})/
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
]

// date tokens
var parseTokenMM = /^-(\d{2})$/
var parseTokenDDD = /^-?(\d{3})$/
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
var parseTokenWww = /^-?W(\d{2})$/
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/
var parseTokenTimezoneZ = /^(Z)$/
var parseTokenTimezoneHH = /^([+-])(\d{2})$/
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, dirtyOptions) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {}
  var additionalDigits = options.additionalDigits
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS
  } else {
    additionalDigits = Number(additionalDigits)
  }

  var dateStrings = splitDateString(argument)

  var parseYearResult = parseYear(dateStrings.date, additionalDigits)
  var year = parseYearResult.year
  var restDateString = parseYearResult.restDateString

  var date = parseDate(restDateString, year)

  if (date) {
    var timestamp = date.getTime()
    var time = 0
    var offset

    if (dateStrings.time) {
      time = parseTime(dateStrings.time)
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone) * MILLISECONDS_IN_MINUTE
    } else {
      var fullTime = timestamp + time
      var fullTimeDate = new Date(fullTime)

      offset = getTimezoneOffsetInMilliseconds(fullTimeDate)

      // Adjust time when it's coming from DST
      var fullTimeDateNextDay = new Date(fullTime)
      fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1)
      var offsetDiff =
        getTimezoneOffsetInMilliseconds(fullTimeDateNextDay) -
        getTimezoneOffsetInMilliseconds(fullTimeDate)
      if (offsetDiff > 0) {
        offset += offsetDiff
      }
    }

    return new Date(timestamp + time + offset)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {}
  var array = dateString.split(parseTokenDateTimeDelimeter)
  var timeString

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null
    timeString = array[0]
  } else {
    dateStrings.date = array[0]
    timeString = array[1]
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString)
    if (token) {
      dateStrings.time = timeString.replace(token[1], '')
      dateStrings.timezone = token[1]
    } else {
      dateStrings.time = timeString
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits]
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

  var token

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
  if (token) {
    var yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
  if (token) {
    var centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token
  var date
  var month
  var week

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0)
    date.setUTCFullYear(year)
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    date.setUTCFullYear(year, month)
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString)
  if (token) {
    date = new Date(0)
    var dayOfYear = parseInt(token[1], 10)
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    var day = parseInt(token[2], 10)
    date.setUTCFullYear(year, month, day)
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    var dayOfWeek = parseInt(token[2], 10) - 1
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token
  var hours
  var minutes

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    var seconds = parseFloat(token[3].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token
  var absoluteOffset

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0
  day = day || 0
  var date = new Date(0)
  date.setUTCFullYear(isoYear, 0, 4)
  var fourthOfJanuaryDay = date.getUTCDay() || 7
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}

module.exports = parse


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var MILLISECONDS_IN_MINUTE = 60000

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
module.exports = function getTimezoneOffsetInMilliseconds (dirtyDate) {
  var date = new Date(dirtyDate.getTime())
  var baseTimezoneOffset = date.getTimezoneOffset()
  date.setSeconds(0, 0)
  var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE

  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

module.exports = isDate


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getter", function() { return getter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setter", function() { return setter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggler", function() { return toggler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailer", function() { return emailer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "texter", function() { return texter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseTodoItem", function() { return baseTodoItem; });
/**
 * @format
 */
const toggler = state => ({
  toggleDone: () => { state.done = (!state.done); },
});

const emailer = state => ({
  email: () => { alert(`${state.email} was notified ${state.title} was completed.`); },
});

const texter = state => ({
  text: () => { alert(`${state.recpient} was notified ${state.title} was completed.`); },
});

const getter = state => ({
  get: prop => state[prop],
});

const setter = state => ({
  set: (prop, value) => { state[prop] = value; },
});

const exporter = state => ({
  exportState: () => Object.assign({}, state),
});


function baseTodoItem(state) {
  return Object.assign({}, getter(state), setter(state), toggler(state), exporter(state));
}




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _commonTab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/**
 * @format
 */
__webpack_require__(1);




const projectGlobal = {
  projectBarLabels: ['Project:', 'Desc:', 'Due:', 'Priority:', 'Complete:'],
};

const utility = {
  // Add functions - functions that add children to a parent element

  addPageButtons(parentElem) {
    const button = _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].createButton('Add Project');
    button.addEventListener('click', utility.addProjectForm);
    parentElem.appendChild(button);
  },

  addProjectBar(parentElem) {
    parentElem.appendChild(utility.createProjectBar());
  },

  addProjectTable(parentElem) {
    const colHeaders = ['', 'Name', 'Due Date', 'Action'];
    const table = document.createElement('table');
    table.id = _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectTableId;

    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addTableHeader(table, colHeaders);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let i = 0; i < _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].projects.length; i += 1) {
      const tr = utility.createProjectRow(_commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].projects[i], i);
      tbody.appendChild(tr);
    }

    parentElem.appendChild(table);
  },

  // Create functions - functions that return an element
  createProjectBar() {
    const section = document.createElement('section');
    section.id = _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectStatusBarId;

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
    tr.appendChild(_commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].createStatusCell(project));

    for (let i = 0; i < propOrder.length; i += 1) {
      const prop = propOrder[i];
      tr.appendChild(
        _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].createDataCell('td', project.get(prop)),
      );
      if (prop === 'name')
        tr.childNodes[1].addEventListener('click', utility.loadProject);
    }

    const button = _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].createButton('Delete');
    button.addEventListener('click', utility.deleteProject);
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addActionButton(tr, button);
    // Put index of utility object in tasks array and hide it
    tr.appendChild(_commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].createDataCell('td', index, true));
    return tr;
  },

  // Support functions
  //
  buildProjectSection() {
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addSection(
      document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectsContainerId),
      _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectsSectionId,
    );
    utility.addProjectTable(
      document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectsSectionId),
    );
  },

  buildTaskSection() {
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addSection(
      document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectsContainerId),
      _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].tasksSectionId,
    );
    utility.addProjectBar(
      document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].tasksSectionId),
    );

    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addTaskTable(
      document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].tasksSectionId),
    );
  },

  calcPercentComplete(projectName) {
    const tasks = _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].tasks.filter(
      item => projectName === null || item.get('project') === projectName,
    );
    const numTasks = tasks.length;
    const numComplete = tasks.filter(item => item.get('done') === true).length;

    return Math.round(numTasks === 0 ? 0 : numComplete / numTasks * 100);
  },

  renderProject(index) {
    const projectIndex =
      index >= 0 ? index : _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].projects.length - 1;
    const tr = utility.createProjectRow(
      _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].projects[projectIndex],
      projectIndex,
    );
    const parentElem = document.getElementById(
      _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectTableId,
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
        _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].tasksSectionId,
      );
      const section = utility.createProjectBar();
      parentElem.replaceChild(
        section,
        document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectStatusBarId),
      );
      return;
    }
    const propOrder = ['name', 'desc', 'due', 'priority'];
    const section = document.createElement('section');
    section.id = _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectStatusBarId;

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
      _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].tasksSectionId,
    );
    parentElem.replaceChild(
      section,
      document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectStatusBarId),
    );
  },

  // Event listener helpers

  deleteProjectTasks(projectName) {
    // Every splice moves items to a new index
    let accum = 0;
    const indices = _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].buildIndices(projectName);
    for (let i = 0; i < indices.length; i += 1) {
      _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].tasks.splice(indices[i] - accum, 1);
      accum += 1;
    }
  },

  deleteTaskTable() {
    const table = document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].taskTableId);
    table.parentNode.removeChild(table);
  },

  // Event listeners

  addProjectForm(e) {
    const saveButton = _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].createModalButton(
      'submit',
      'add-project',
      ['btn'],
      'Add Project',
      utility.handleSaveProject,
    );
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addModalForm(_commonTab__WEBPACK_IMPORTED_MODULE_1__["forms"].projectForm, saveButton);
  },

  deleteProject(e) {
    const table = document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectTableId);
    const tbody = table.querySelector('tbody');
    const row = e.target.parentNode.parentNode;
    const sibling = e.target.parentNode.parentNode.nextSibling;
    const projectIndex = _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].getArrayIndex(row);
    const project = _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].projects[projectIndex];
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].projects.splice(projectIndex, 1);
    tbody.removeChild(row);
    // Once project is deleted from the arrey, the hidden indices will
    // be off, so they need to be updated
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].updateHiddenIndices(sibling);
    // Delete tasks associated with this project
    utility.deleteProjectTasks(project.get('name'));
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].currentProject = null;
    utility.deleteTaskTable();
    utility.updateProjectBar(project);
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addTaskTable(
      document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].tasksSectionId),
    );
  },

  handleContainerClicks(e) {
    utility.updateProjectBar(_commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].currentProject);
  },

  handleSaveProject(e) {
    e.preventDefault();
    const form = e.target.parentNode;
    const formData = _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].getFormData(form);
    delete formData.itemindex;
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].projects.push(_todo__WEBPACK_IMPORTED_MODULE_0__["baseTodoItem"](formData));
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].deleteModal();
    utility.renderProject(-1);
  },

  loadProject(e) {
    // Display all associated tasks for a project
    const row = e.target.parentNode;
    const index = _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].getArrayIndex(row);
    const project = _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].projects[index];
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].currentProject = project;
    utility.updateProjectBar(project);
    const parentElem = document.getElementById(
      _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].tasksSectionId,
    );
    const tableElem = document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].taskTableId);
    const taskTable = _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].createTaskTable(project.get('name'));
    parentElem.replaceChild(taskTable, tableElem);
  },
};

function buildProjectPage() {
  _commonTab__WEBPACK_IMPORTED_MODULE_1__["state"].currentProject = null;

  // Add Container for projects and tasks
  _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addSection(
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].getRootElement(),
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectsContainerId,
  );
  const projectContainer = document.getElementById(
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].projectsContainerId,
  );
  projectContainer.addEventListener('click', utility.handleContainerClicks);

  utility.buildProjectSection();
  utility.buildTaskSection();
  const taskContainer = document.getElementById(
    _commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].tasksSectionId,
  );
  _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addActionSection(taskContainer);
  utility.addPageButtons(
    document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].pageButtonsId),
  );
  _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addPageButtons(
    document.getElementById(_commonTab__WEBPACK_IMPORTED_MODULE_1__["elemId"].pageButtonsId),
  );
  _commonTab__WEBPACK_IMPORTED_MODULE_1__["utility"].addFooter(projectContainer);
}

/* harmony default export */ __webpack_exports__["default"] = (buildProjectPage);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map