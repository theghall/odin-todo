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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);\n/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);\n/* harmony import */ var _tasksTab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);\n/* harmony import */ var _commonTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);\n\n\n__webpack_require__(1);\n\n\n\n\n\nfunction createTabMenu() {\n\tconst menuItems = ['Tasks', 'Projects'];\n\n\tconst container = document.getElementById('container');\n\n\tconst nav = document.createElement('nav');\n\tnav.id = 'main-nav';\n\n\tconst ul = document.createElement('ul');\n\tul.classList.add('tabrow');\n\n\tfor (let i = 0; i < menuItems.length; i++) {\n\t\tlet li = document.createElement('li');\n\t\tli.textContent = menuItems[i];\n\n\t\t// Make first item \"active\"\n\t\tif (i === 0) li.classList.add('selected');\n\n\t\tul.appendChild(li);\n\n\t\taddTabListener(li);\n\t}\n\n\tnav.appendChild(ul);\n\tcontainer.appendChild(nav);\n}\n\n// Event listeners\nfunction addTabListener(target) {\n\ttarget.addEventListener('click', function(e) { makeTabActive(e); });\n}\n\nfunction removeContainer(id) {\n\tconst elem = document.getElementById(id);\n\tif (elem) elem.parentNode.removeChild(elem);\n}\n\nfunction makeTabActive(e) {\n\tselectTab(e);\n\n\tswitch(e.target.textContent) {\n\t\tcase 'Tasks':\n\t\t\tremoveContainer('projects-container');\n\t\t\tObject(_tasksTab__WEBPACK_IMPORTED_MODULE_2__[\"buildTaskPage\"])();\n\t\t\tbreak;\n\t\tcase 'Projects':\n\t\t\tremoveContainer('tasks-container');\n\t\t\tbreak;\n\t\tdefault:\n\t\t\tbreak;\n\t}\n}\n\nfunction selectTab(e) {\n\tconst activeClass = 'selected';\n\n\t// Find menu associated with '#main-nav'\n\tconst mainNav = document.getElementById('main-nav');\n\tconst childrenArr = [...mainNav.children];\n\n\t// Find currently selected item, deselect it, select clicked item\n\tfor (let i = 0; i < childrenArr.length; i++) {\n\t\t// Should be menu we're looking for\n\t\tif (childrenArr[i].tagName === 'UL') {\n\t\t\tlet ulChildrenArr = [...childrenArr[i].children];\n\t\t\tfor (let j = 0; j < ulChildrenArr.length; j++) {\n\t\t\t\tif (ulChildrenArr[j].classList.contains(activeClass)) {\n\t\t\t\t\tulChildrenArr[j].classList.remove(activeClass);\n\t\t\t\t\te.target.classList.add(activeClass);\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t\tbreak;\n\t\t}\n\t}\n}\n\nfunction ready() {\n\t_commonTab__WEBPACK_IMPORTED_MODULE_3__[\"state\"].loadData();\n\tcreateTabMenu();\n\tObject(_tasksTab__WEBPACK_IMPORTED_MODULE_2__[\"buildTaskPage\"])();\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", ready);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./node_modules/normalize.css/normalize.css?");

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/assets/css/style.css?");

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setters\", function() { return setters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggler\", function() { return toggler; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"emailer\", function() { return emailer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"texter\", function() { return texter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"baseTodoItem\", function() { return baseTodoItem; });\n\n\nconst toggler = (state) => ({\n\ttoggleDone: () => state.done = (state.done ? false : true)\n})\n\nconst emailer = (state) => ({\n\temail: () => alert(state.email + ' was notified ' + state.title + ' was completed.')\n})\n\nconst texter = (state) => ({\n\ttext: () => alert(state.recpient + ' was notified ' + state.title + ' was completed.')\n})\n\nconst getter = (state) => ({\n\tget: (prop) => { return state[prop] }\n})\n\nconst setter = (state) => ({\n\tset: (prop, value) => state[prop] = value\n})\n\nconst exporter = (state) => ({\n\texportState: () => { return Object.assign({},state) }\n})\n\n\nfunction baseTodoItem(state) {\n\treturn Object.assign({}, getter(state), setter(state), toggler(state), exporter(state));\n}\n\n\n\n\n//# sourceURL=webpack:///./src/todo.js?");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildTaskPage\", function() { return buildTaskPage; });\n/* harmony import */ var _commonTab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);\n\n\n\nfunction buildTaskPage() {\n\tconst sectionElem = _commonTab__WEBPACK_IMPORTED_MODULE_0__[\"utility\"].createSection();\n\tconst tableElem = _commonTab__WEBPACK_IMPORTED_MODULE_0__[\"utility\"].createTable(sectionElem, 'tasks-table');\n\n\t_commonTab__WEBPACK_IMPORTED_MODULE_0__[\"utility\"].addTaskTable(tableElem);\n\t_commonTab__WEBPACK_IMPORTED_MODULE_0__[\"utility\"].addPageActions(sectionElem);\n\t_commonTab__WEBPACK_IMPORTED_MODULE_0__[\"utility\"].addPageButtons(document.getElementById('page-buttons'));\n\t_commonTab__WEBPACK_IMPORTED_MODULE_0__[\"utility\"].addFooter(sectionElem);\n}\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/tasksTab.js?");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state\", function() { return state; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"forms\", function() { return forms; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resources\", function() { return resources; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"utility\", function() { return utility; });\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);\n/* harmony import */ var date_fns_is_past__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);\n/* harmony import */ var date_fns_is_past__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns_is_past__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var date_fns_parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);\n/* harmony import */ var date_fns_parse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(date_fns_parse__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nconst state = {\n\ttasks: [],\n\tprojects: [],\n\tcurrentProject: null,\n\tloadData: function() {\n\t\tlet tasks;\n\t\tlet projects;\n\n\t\tif (localStorage) {\n\t\t\tif (tasks = localStorage.getItem('tasks')) this.tasks = JSON.parse(tasks).map(task =>  _todo__WEBPACK_IMPORTED_MODULE_0__[\"baseTodoItem\"](task));\n\t\t}\n\t\telse {\n\t\t\talert('Cannot load any data');\n\t\t}\n\t},\n\tsaveData: function() {\n\t\tif (localStorage) {\n\t\t\tlocalStorage.clear();\n\t\t\tconst states = this.tasks.map(task => task.exportState());\n\t\t\tlocalStorage.setItem('tasks', JSON.stringify(states));\n\t\t} else {\n\t\t\talert('Unable to save your tasks and projects');\n\t\t}\n\t}\n};\n\nconst elemId = {\n\tcontainerId: 'container',\n\tpageActionsId: 'page-actions',\n\tpageButtonsId: 'page-buttons',\n \tpageFormId: 'page-form',\n\ttaskContainerId: 'tasks-container',\n\ttaskTableId: 'tasks-table'\n}\n\nconst resources = {\n\tdoneImg: 'assets/graphics/complete25x25.png',\n\topenImg: 'assets/graphics/open25x25.png',\n\toverdueImg: 'assets/graphics/overdue25x25.jpg'\n};\n\nconst forms = {\n\ttaskForm:  [\n\t\t\t{tag: 'label', attrs: [{name: 'for', value: 'name'}], text: 'Name', required: null},\n\t\t\t{tag: 'input', attrs: [{name: 'type', value: 'text'}, {name: 'name', value: 'name'}], text: '', required: true},\n\t\t\t{tag: 'label', attrs: [{name: 'for', value: 'desc'}], text: 'Description'},\n\t\t\t{tag: 'input', attrs: [{name: 'type', value: 'text'}, {name: 'name', value: 'desc'}], text: '', required: true},\n\t\t\t{tag: 'label', attrs: [{name: 'for', value: 'date'}], text: 'Due Date'},\n\t\t\t{tag: 'input', attrs: [{name: 'type', value: 'date'}, {name: 'name', value: 'due'}], text: '', required: true},\n\t\t\t{tag: 'label', attrs: [{name: 'for', value: 'project'}], text: 'project'},\n\t\t\t{tag: 'input', attrs: [{name: 'type', value: 'project'}, {name: 'name', value: 'project'}], text: '', required: false},\n\t\t\t{tag: 'label', attrs: [{name: 'for', value: 'priority'}], text: 'Priority'},\n\t\t\t{tag: 'input', attrs: [{name: 'type', value: 'text'}, {name: 'name', value: 'priority'}], text: '', required: true},\n\t\t]\n};\n\nfunction addHiddenFields(form, hidden) {\n\tfor (let i = 0; i < hidden.length; i++) {\n\t\tlet hiddenInput = document.createElement('input');\n\t\thiddenInput.setAttribute('type', 'hidden');\n\t\thiddenInput.setAttribute('name', hidden[i].name);\n\t\thiddenInput.setAttribute('value', hidden[i].value);\n\t\tform.appendChild(hiddenInput);\n\t}\n}\n\nfunction buildForm(form, items, data=null, hidden=null) { \n\tif (hidden) addHiddenFields(form, hidden);\n\tfor (let i = 0; i < items.length; i++) {\n\t\tlet elem = document.createElement(items[i].tag);\n\t\tif (items[i].tag === 'input') elem.classList.add('form-input');\n\t\tlet attrs = items[i].attrs;\n\t\tfor (let j = 0; j < attrs.length; j++) {\n\t\t\tlet name = attrs[j].name;\n\t\t\tlet value = attrs[j].value;\n\t\t\telem.setAttribute(name, value);\n\t\t\tif (items[i].tag === 'input' && name === 'name') {\n\t\t\t\tif (data) elem.value = data.get(value);\n\t\t\t}\n\t\t}\n\t\tif (items[i].required) elem.setAttribute('required','required');\n\t\tif (items[i].text !== '') elem.textContent = items[i].text;\n\t\tform.appendChild(elem);\n\t\tform.appendChild(document.createElement('br'));\n\t}\n}\n\nfunction buildButton(form, type, id, classes, text, callback) {\n\tconst button = document.createElement('button')\n\tbutton.setAttribute('type', type);\n\tbutton.id = id;\n\tfor (let i = 0; i < classes.length; i++) { button.classList.add(classes[i]); }\n\tbutton.classList.add('btn');\n\tbutton.textContent = text;\n\tform.appendChild(button);\n\tbutton.addEventListener('click', function(e) {callback(e, form)});\n}\n\nconst utility = {\n\t// Create Functions -- return an element\n\tcreateButton: function(text) {\n\t\tconst button = document.createElement('button');\n\t\tbutton.textContent = text;\n\t\tbutton.classList.add('btn');\n\t\treturn button;\n\t},\n\n\tcreateDataCell: function(text, hidden) {\n\t\tconst td = document.createElement('td');\n\t\tif (hidden) td.classList.add('hidden');\n\t\ttd.textContent = text;\n\t\treturn td;\n\t},\n\n\tcreateSection: function createSection() {\n\t\tconst section = document.createElement('section');\n\t\tsection.id = elemId.taskContainerId;\n\t\tutility.getRootElement().appendChild(section);\n\t\treturn section;\n\t},\n\n\tcreateStatusCell: function(task) {\n\t\tconst td = document.createElement('td');\n\t\tconst img = document.createElement('img');\n\t\timg.addEventListener('click', utility.toggleComplete);\n\t\ttd.appendChild(img);\n\n\t\tswitch(task.get('done')) {\n\t\t\tcase false:\n\t\t\t\tif (date_fns_is_past__WEBPACK_IMPORTED_MODULE_1___default()(date_fns_parse__WEBPACK_IMPORTED_MODULE_2___default()(task.get('due')))) {\n\t\t\t\t\timg.setAttribute('src', resources.overdueImg);\n\t\t\t\t} else {\n\t\t\t\t\timg.setAttribute('src', resources.openImg); \n\t\t\t\t}\n\t\t\t\tbreak;\n\t\t\tcase true:\n\t\t\t\timg.setAttribute('src', resources.doneImg);\n\t\t\t\tbreak;\n\t\t}\n\t\treturn td;\n\t},\n\n\tcreateTable: function(parentElem, id) {\n\t\tconst table = document.createElement('table');\n\t\ttable.id = id;\n\t\tparentElem.appendChild(table);\n\t\treturn table;\n\t},\n\n\tcreateTaskRow: function(task, index) {\n\t\tconst propOrder = ['name', 'desc', 'due', 'project', 'priority']\n\t\tconst tr = document.createElement('tr');\n\t\ttr.appendChild(utility.createStatusCell(task));\n\n\t\tfor (let i = 0; i < propOrder.length; i++) {\n\t\t\tlet prop = propOrder[i];\n\t\t\ttr.appendChild(utility.createDataCell(task.get(prop)));\n\t\t\tif (prop === 'name') tr.childNodes[1].addEventListener('click', utility.editTask);}\n\n\t\tconst button = utility.createButton('Delete');\n\t\tbutton.addEventListener('click', utility.deleteTask);\n\t\tutility.addActionButton(tr, button);\n\t\t// Put index of utility object in tasks array and hide it\n\t\ttr.appendChild(utility.createDataCell(index, true));\n\t\treturn tr;\n\t},\n\n\t// Add functions, add child element(s) to a parent element\n\taddActionButton: function(tr, button) {\n\t\tconst td = document.createElement('td');\n\t\ttd.appendChild(button);\n\t\ttr.appendChild(td);\n\t},\n\n\taddFooter: function(parentElem) {\n\t\tconst images = [\n\t\t\tresources.openImg, resources.doneImg, resources.overdueImg\n\t\t];\n\t\tconst legend = [ 'Undone', 'Done', 'Overdue'];\n\t\tconst footer = document.createElement('footer');\n\n\t\tfor (let i = 0; i < images.length; i++) {\n\t\t\tlet img = document.createElement('img');\n\t\t\timg.src = images[i];\n\t\t\tfooter.appendChild(img);\n\t\t\tlet p = document.createElement('p');\n\t\t\tp.textContent = legend[i];\n\t\t\tfooter.appendChild(p);\n\t\t}\n\t\tparentElem.appendChild(footer);\n\t},\n\n\taddPageActions: function(parentElem) {\n\t\tconst ids = [elemId.pageButtonsId, elemId.pageFormId];\n\t\tconst parentDiv = document.createElement('div');\n\t\tparentDiv.id = elemId.pageActionsId\n\n\t\tfor (let i = 0; i < ids.length; i++) {\n\t\t\tlet div = document.createElement('div');\n\t\t\tdiv.id = ids[i];\n\t\t\tparentDiv.appendChild(div);\n\t\t}\n\t\tparentElem.appendChild(parentDiv);\n\t},\n\n\taddPageButtons: function(parentElem) {\n\t\tlet button = utility.createButton('Add Task');\n\t\tbutton.addEventListener('click', utility.addTask);\n\t\tparentElem.appendChild(button);\n\n\t\tbutton = utility.createButton('Save');\n\t\tbutton.addEventListener('click', utility.saveTasks);\n\t\tparentElem.appendChild(button);\n\t},\n\n\taddTableHeader: function(parentElem, colHeaders) {\n\t\tconst thead = document.createElement('thead');\n\t\tconst tr = document.createElement('tr');\n\n\t\tfor (let i = 0; i < colHeaders.length; i++) {\n\t\t\ttr.appendChild(utility.createDataCell(colHeaders[i]));\n\t\t}\n\t\tthead.appendChild(tr);\n\t\tparentElem.appendChild(thead);\n\t},\n\n\taddTaskForm: function(parentElem, formId, formItems, callback) {\n\t\tconst form = document.createElement('form');\n\t\tform.id = formId;\n\t\tbuildForm(form, formItems)\n\t\tbuildButton(form, 'submit', 'add-task', ['btn'], 'Add Task', callback);\n\t\tparentElem.appendChild(form);\n\t},\n\n\taddTaskTable: function(parentElem) {\n\t\tconst colHeaders = ['', 'Name', 'Description', 'Due Date', 'Project', 'Priority', 'Action'];\n\t\tutility.addTableHeader(parentElem, colHeaders);\n\n\t\tfor (let i = 0; i < state.tasks.length; i++) {\n\t\t\tlet task = state.tasks[i];\n\t\t\tlet tr = utility.createTaskRow(task, i);\n\t\t\tparentElem.appendChild(tr);\n\t\t}\n\t},\n\n\tupdateTaskForm: function(parentElem, formId, formItems, taskIndex, callback) {\n\t\tconst form = document.createElement('form');\n\t\tform.id = formId;\n\t\tconst hidden = [{name: 'taskindex', value: taskIndex}];\n\t\tbuildForm(form, formItems, state.tasks[taskIndex], hidden);\n\t\tbuildButton(form, 'submit', 'update-task', ['btn'], 'Update Task', callback);\n\t\tparentElem.appendChild(form);\n\t},\n\n\t// Support functions\n\tdeleteForm: function(formId) {\n\t\tconst form = document.getElementById(formId);\n\t\tconst parent = form.parentNode;\n\t\tparent.removeChild(form);\n\t},\n\n\tgetArrayIndex: function(row) {\n\t\tconst children = row.childNodes;\n\t\t// Last element should be hidden TD containing array index\n\t\treturn parseInt(children[children.length-1].textContent);\n\t},\n\n\tgetFormData: function(form) {\n\t\tconst taskIndex = this.getTextValue(form, 'taskindex');\n\t\tconst name = this.getTextValue(form, 'name');\n\t\tconst desc = this.getTextValue(form, 'desc');\n\t\tconst due = this.getTextValue(form, 'due');\n\t\tconst project = this.getTextValue(form, 'project');\n\t\tconst priority = this.getTextValue(form, 'priority');\n\n\t\treturn {name: name, desc: desc, due: due, project: project,\n\t\t\tpriority: priority, done: false, taskindex: taskIndex};\n\t},\n\n\tgetRootElement: function() {\n\t\treturn document.getElementById(elemId.containerId);\n\t},\n\n\tgetTextValue: function(form, field) {\n\t\tconst elem = form.querySelector('input[name=' + field + ']');\n\t\treturn(elem ? elem.value : null);\n\t},\n\n\t// Event Listener helpers\n\tdelPageButtons: function() {\n\t\tconst elem = document.getElementById(elemId.pageButtonsId);\n\n\t\twhile (elem.firstChild) {\n\t\t\telem.removeChild(elem.firstChild);\n\t\t}\n\t},\n\n\trenderTask: function(index) {\n\t\tconst taskIndex = (index >= 0 ? index : state.tasks.length-1);\n\t\tconst tr = utility.createTaskRow(state.tasks[taskIndex], taskIndex);\n\t\tconst parentElem = document.getElementById(elemId.taskTableId);\n\n\t\tif (index >= 0) {\n\t\t\t// Add one to allow for thead\n\t\t\tparentElem.replaceChild(tr, parentElem.childNodes[index+1]);\n\t\t} else {\n\t\t\tparentElem.appendChild(tr);\n\t\t}\n\t},\n\n\tupdateHiddenIndices: function(sibling, inc=-1) {\n\t\twhile (sibling) {\n\t\t\tlet children = sibling.childNodes;\n\t\t\t// Last child should be hidden node containing index into tasks\n\t\t\tconst indexTD = children[children.length - 1]\n\t\t\tindexTD.textContent = parseInt(indexTD.textContent) + inc;\n\t\t\tsibling = sibling.nextSibling;\n\t\t}\n\t},\n\n\t// Event Listeners\n\taddTask: function(e) {\n\t\tutility.delPageButtons();\n\t\tutility.addTaskForm(document.getElementById(elemId.pageFormId),\n\t\t\t'task-form', forms.taskForm, utility.handleAddTask);\n\t},\n\n\tdeleteTask: function(e) {\n\t\tconst table = document.getElementById(elemId.taskTableId);\n\t\tconst row = e.target.parentNode.parentNode;\n\t\tconst sibling = e.target.parentNode.parentNode.nextSibling;\n\t\tconst taskIndex = utility.getArrayIndex(row);\n\t\tstate.tasks.splice(taskIndex, 1);\n\t\ttable.removeChild(row);\n\t\tutility.updateHiddenIndices(sibling);\n\t},\n\n\teditTask: function(e) {\n\t\tconst taskIndex = utility.getArrayIndex(e.target.parentNode);\n\t\tutility.delPageButtons();\n\t\tutility.updateTaskForm(document.getElementById(elemId.pageFormId),\n\t\t\t'task-form', forms.taskForm, taskIndex, utility.handleUpdateTask);\n\t},\n\n\thandleAddTask: function(e, form) {\n\t\te.preventDefault();\n\t\tconst formData= utility.getFormData(form);\n\t\tdelete formData.taskindex;\n\t\tstate.tasks.push(_todo__WEBPACK_IMPORTED_MODULE_0__[\"baseTodoItem\"](formData));\n\t\tutility.deleteForm(form.id);\n\t\tutility.renderTask(-1);\n\t\tutility.addPageButtons(document.getElementById(elemId.pageButtonsId));\n\t},\n\n\thandleUpdateTask: function(e, form) {\n\t\te.preventDefault();\n\t\tconst formData= utility.getFormData(form);\n\t\tconst taskIndex = parseInt(formData.taskindex);\n\t\tdelete formData.taskindex;\n\t\tstate.tasks[parseInt(taskIndex)] = _todo__WEBPACK_IMPORTED_MODULE_0__[\"baseTodoItem\"](formData);\n\t\tutility.deleteForm(form.id);\n\t\tutility.renderTask(taskIndex);\n\t\tutility.addPageButtons(document.getElementById(elemId.pageButtonsId));\n\t},\n\n\tsaveTasks: function(e) {\n\t\tstate.saveData();\n\t},\n\n\ttoggleComplete: function(e) {\n\t\tconst img = e.target;\n\t\tconst cells = e.target.parentNode.parentNode.childNodes;\n\t\tconst tasksIndex = parseInt(cells[cells.length - 1].textContent);\n\n\t\tif (state.tasks[tasksIndex].get('done')) {\n\t\t\tif (date_fns_is_past__WEBPACK_IMPORTED_MODULE_1___default()(date_fns_parse__WEBPACK_IMPORTED_MODULE_2___default()(state.tasks[tasksIndex].get('due')))) {\n\t\t\t\timg.src = resources.overdueImg;\n\t\t\t} else {\n\t\t\t\timg.src = resources.openImg;\n\t\t\t}\n\t\t} else {\n\t\t\timg.src = resources.doneImg;\n\t\t}\n\t\tstate.tasks[tasksIndex].toggleDone();\n\t\timg.addEventListener('click', utility.toggleComplete);\n\t}\n\n};\n\n\n\n\n//# sourceURL=webpack:///./src/commonTab.js?");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(12)\n\n/**\n * @category Common Helpers\n * @summary Is the given date in the past?\n *\n * @description\n * Is the given date in the past?\n *\n * @param {Date|String|Number} date - the date to check\n * @returns {Boolean} the date is in the past\n *\n * @example\n * // If today is 6 October 2014, is 2 July 2014 in the past?\n * var result = isPast(new Date(2014, 6, 2))\n * //=> true\n */\nfunction isPast (dirtyDate) {\n  return parse(dirtyDate).getTime() < new Date().getTime()\n}\n\nmodule.exports = isPast\n\n\n//# sourceURL=webpack:///./node_modules/date-fns/is_past/index.js?");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

eval("var isDate = __webpack_require__(13)\n\nvar MILLISECONDS_IN_HOUR = 3600000\nvar MILLISECONDS_IN_MINUTE = 60000\nvar DEFAULT_ADDITIONAL_DIGITS = 2\n\nvar parseTokenDateTimeDelimeter = /[T ]/\nvar parseTokenPlainTime = /:/\n\n// year tokens\nvar parseTokenYY = /^(\\d{2})$/\nvar parseTokensYYY = [\n  /^([+-]\\d{2})$/, // 0 additional digits\n  /^([+-]\\d{3})$/, // 1 additional digit\n  /^([+-]\\d{4})$/ // 2 additional digits\n]\n\nvar parseTokenYYYY = /^(\\d{4})/\nvar parseTokensYYYYY = [\n  /^([+-]\\d{4})/, // 0 additional digits\n  /^([+-]\\d{5})/, // 1 additional digit\n  /^([+-]\\d{6})/ // 2 additional digits\n]\n\n// date tokens\nvar parseTokenMM = /^-(\\d{2})$/\nvar parseTokenDDD = /^-?(\\d{3})$/\nvar parseTokenMMDD = /^-?(\\d{2})-?(\\d{2})$/\nvar parseTokenWww = /^-?W(\\d{2})$/\nvar parseTokenWwwD = /^-?W(\\d{2})-?(\\d{1})$/\n\n// time tokens\nvar parseTokenHH = /^(\\d{2}([.,]\\d*)?)$/\nvar parseTokenHHMM = /^(\\d{2}):?(\\d{2}([.,]\\d*)?)$/\nvar parseTokenHHMMSS = /^(\\d{2}):?(\\d{2}):?(\\d{2}([.,]\\d*)?)$/\n\n// timezone tokens\nvar parseTokenTimezone = /([Z+-].*)$/\nvar parseTokenTimezoneZ = /^(Z)$/\nvar parseTokenTimezoneHH = /^([+-])(\\d{2})$/\nvar parseTokenTimezoneHHMM = /^([+-])(\\d{2}):?(\\d{2})$/\n\n/**\n * @category Common Helpers\n * @summary Convert the given argument to an instance of Date.\n *\n * @description\n * Convert the given argument to an instance of Date.\n *\n * If the argument is an instance of Date, the function returns its clone.\n *\n * If the argument is a number, it is treated as a timestamp.\n *\n * If an argument is a string, the function tries to parse it.\n * Function accepts complete ISO 8601 formats as well as partial implementations.\n * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601\n *\n * If all above fails, the function passes the given argument to Date constructor.\n *\n * @param {Date|String|Number} argument - the value to convert\n * @param {Object} [options] - the object with options\n * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format\n * @returns {Date} the parsed date in the local time zone\n *\n * @example\n * // Convert string '2014-02-11T11:30:30' to date:\n * var result = parse('2014-02-11T11:30:30')\n * //=> Tue Feb 11 2014 11:30:30\n *\n * @example\n * // Parse string '+02014101',\n * // if the additional number of digits in the extended year format is 1:\n * var result = parse('+02014101', {additionalDigits: 1})\n * //=> Fri Apr 11 2014 00:00:00\n */\nfunction parse (argument, dirtyOptions) {\n  if (isDate(argument)) {\n    // Prevent the date to lose the milliseconds when passed to new Date() in IE10\n    return new Date(argument.getTime())\n  } else if (typeof argument !== 'string') {\n    return new Date(argument)\n  }\n\n  var options = dirtyOptions || {}\n  var additionalDigits = options.additionalDigits\n  if (additionalDigits == null) {\n    additionalDigits = DEFAULT_ADDITIONAL_DIGITS\n  } else {\n    additionalDigits = Number(additionalDigits)\n  }\n\n  var dateStrings = splitDateString(argument)\n\n  var parseYearResult = parseYear(dateStrings.date, additionalDigits)\n  var year = parseYearResult.year\n  var restDateString = parseYearResult.restDateString\n\n  var date = parseDate(restDateString, year)\n\n  if (date) {\n    var timestamp = date.getTime()\n    var time = 0\n    var offset\n\n    if (dateStrings.time) {\n      time = parseTime(dateStrings.time)\n    }\n\n    if (dateStrings.timezone) {\n      offset = parseTimezone(dateStrings.timezone)\n    } else {\n      // get offset accurate to hour in timezones that change offset\n      offset = new Date(timestamp + time).getTimezoneOffset()\n      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset()\n    }\n\n    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)\n  } else {\n    return new Date(argument)\n  }\n}\n\nfunction splitDateString (dateString) {\n  var dateStrings = {}\n  var array = dateString.split(parseTokenDateTimeDelimeter)\n  var timeString\n\n  if (parseTokenPlainTime.test(array[0])) {\n    dateStrings.date = null\n    timeString = array[0]\n  } else {\n    dateStrings.date = array[0]\n    timeString = array[1]\n  }\n\n  if (timeString) {\n    var token = parseTokenTimezone.exec(timeString)\n    if (token) {\n      dateStrings.time = timeString.replace(token[1], '')\n      dateStrings.timezone = token[1]\n    } else {\n      dateStrings.time = timeString\n    }\n  }\n\n  return dateStrings\n}\n\nfunction parseYear (dateString, additionalDigits) {\n  var parseTokenYYY = parseTokensYYY[additionalDigits]\n  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]\n\n  var token\n\n  // YYYY or ±YYYYY\n  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)\n  if (token) {\n    var yearString = token[1]\n    return {\n      year: parseInt(yearString, 10),\n      restDateString: dateString.slice(yearString.length)\n    }\n  }\n\n  // YY or ±YYY\n  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)\n  if (token) {\n    var centuryString = token[1]\n    return {\n      year: parseInt(centuryString, 10) * 100,\n      restDateString: dateString.slice(centuryString.length)\n    }\n  }\n\n  // Invalid ISO-formatted year\n  return {\n    year: null\n  }\n}\n\nfunction parseDate (dateString, year) {\n  // Invalid ISO-formatted year\n  if (year === null) {\n    return null\n  }\n\n  var token\n  var date\n  var month\n  var week\n\n  // YYYY\n  if (dateString.length === 0) {\n    date = new Date(0)\n    date.setUTCFullYear(year)\n    return date\n  }\n\n  // YYYY-MM\n  token = parseTokenMM.exec(dateString)\n  if (token) {\n    date = new Date(0)\n    month = parseInt(token[1], 10) - 1\n    date.setUTCFullYear(year, month)\n    return date\n  }\n\n  // YYYY-DDD or YYYYDDD\n  token = parseTokenDDD.exec(dateString)\n  if (token) {\n    date = new Date(0)\n    var dayOfYear = parseInt(token[1], 10)\n    date.setUTCFullYear(year, 0, dayOfYear)\n    return date\n  }\n\n  // YYYY-MM-DD or YYYYMMDD\n  token = parseTokenMMDD.exec(dateString)\n  if (token) {\n    date = new Date(0)\n    month = parseInt(token[1], 10) - 1\n    var day = parseInt(token[2], 10)\n    date.setUTCFullYear(year, month, day)\n    return date\n  }\n\n  // YYYY-Www or YYYYWww\n  token = parseTokenWww.exec(dateString)\n  if (token) {\n    week = parseInt(token[1], 10) - 1\n    return dayOfISOYear(year, week)\n  }\n\n  // YYYY-Www-D or YYYYWwwD\n  token = parseTokenWwwD.exec(dateString)\n  if (token) {\n    week = parseInt(token[1], 10) - 1\n    var dayOfWeek = parseInt(token[2], 10) - 1\n    return dayOfISOYear(year, week, dayOfWeek)\n  }\n\n  // Invalid ISO-formatted date\n  return null\n}\n\nfunction parseTime (timeString) {\n  var token\n  var hours\n  var minutes\n\n  // hh\n  token = parseTokenHH.exec(timeString)\n  if (token) {\n    hours = parseFloat(token[1].replace(',', '.'))\n    return (hours % 24) * MILLISECONDS_IN_HOUR\n  }\n\n  // hh:mm or hhmm\n  token = parseTokenHHMM.exec(timeString)\n  if (token) {\n    hours = parseInt(token[1], 10)\n    minutes = parseFloat(token[2].replace(',', '.'))\n    return (hours % 24) * MILLISECONDS_IN_HOUR +\n      minutes * MILLISECONDS_IN_MINUTE\n  }\n\n  // hh:mm:ss or hhmmss\n  token = parseTokenHHMMSS.exec(timeString)\n  if (token) {\n    hours = parseInt(token[1], 10)\n    minutes = parseInt(token[2], 10)\n    var seconds = parseFloat(token[3].replace(',', '.'))\n    return (hours % 24) * MILLISECONDS_IN_HOUR +\n      minutes * MILLISECONDS_IN_MINUTE +\n      seconds * 1000\n  }\n\n  // Invalid ISO-formatted time\n  return null\n}\n\nfunction parseTimezone (timezoneString) {\n  var token\n  var absoluteOffset\n\n  // Z\n  token = parseTokenTimezoneZ.exec(timezoneString)\n  if (token) {\n    return 0\n  }\n\n  // ±hh\n  token = parseTokenTimezoneHH.exec(timezoneString)\n  if (token) {\n    absoluteOffset = parseInt(token[2], 10) * 60\n    return (token[1] === '+') ? -absoluteOffset : absoluteOffset\n  }\n\n  // ±hh:mm or ±hhmm\n  token = parseTokenTimezoneHHMM.exec(timezoneString)\n  if (token) {\n    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)\n    return (token[1] === '+') ? -absoluteOffset : absoluteOffset\n  }\n\n  return 0\n}\n\nfunction dayOfISOYear (isoYear, week, day) {\n  week = week || 0\n  day = day || 0\n  var date = new Date(0)\n  date.setUTCFullYear(isoYear, 0, 4)\n  var fourthOfJanuaryDay = date.getUTCDay() || 7\n  var diff = week * 7 + day + 1 - fourthOfJanuaryDay\n  date.setUTCDate(date.getUTCDate() + diff)\n  return date\n}\n\nmodule.exports = parse\n\n\n//# sourceURL=webpack:///./node_modules/date-fns/parse/index.js?");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

eval("/**\n * @category Common Helpers\n * @summary Is the given argument an instance of Date?\n *\n * @description\n * Is the given argument an instance of Date?\n *\n * @param {*} argument - the argument to check\n * @returns {Boolean} the given argument is an instance of Date\n *\n * @example\n * // Is 'mayonnaise' a Date?\n * var result = isDate('mayonnaise')\n * //=> false\n */\nfunction isDate (argument) {\n  return argument instanceof Date\n}\n\nmodule.exports = isDate\n\n\n//# sourceURL=webpack:///./node_modules/date-fns/is_date/index.js?");

/***/ })
/******/ ]);