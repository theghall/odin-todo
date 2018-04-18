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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);\n/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);\n\n\n__webpack_require__(1);\n\n\n\nconst itemState = {\n\tname: 'Feed Gizmo',\n\tdesc: 'Food ONLY, NO WATER!!!!',\n\tdueDate: 'May 14',\n\tpriority: 1,\n\tcompleted: false\n}\n\nconst projectState = {\n\tname: 'Home',\n\tdesc: 'Stuff to do around the house',\n\tdueDate: null,\n\tpriority: 1,\n\tcompleted: false,\n\ttasks: []\n}\n\nconst home = _todo_js__WEBPACK_IMPORTED_MODULE_1__[\"baseProject\"](projectState);\nhome.add(itemState);\nhome.remove(0);\nconsole.log(home.get('tasks'));\n\n\n//# sourceURL=webpack:///./src/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setters\", function() { return setters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggler\", function() { return toggler; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"emailer\", function() { return emailer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"texter\", function() { return texter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"baseTodoItem\", function() { return baseTodoItem; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"baseProject\", function() { return baseProject; });\n\n\nconst toggler = (state) => ({\n\ttoggleDone: () => state.done = (state.done ? false : true)\n})\n\nconst emailer = (state) => ({\n\temail: () => alert(state.email + ' was notified ' + state.title + ' was completed.')\n})\n\nconst texter = (state) => ({\n\ttext: () => alert(state.recpient + ' was notified ' + state.title + ' was completed.')\n})\n\nconst adder = (state) => ({\n\tadd: (item) => state.tasks.push(item)\n})\n\nconst deleter = (state) => ({\n\tremove: (index) => state.tasks.splice(index, 1)\n})\n\nconst getter = (state) => ({\n\tget: (prop) => { return state[prop] }\n})\n\nconst setter = (state) => ({\n\tset: (prop, value) => state[prop] = value\n})\n\n\nfunction baseTodoItem(state) {\n\treturn Object.assign({}, getter(state), setter(state), toggler(state), state);\n}\n\nfunction baseProject(state) {\n\treturn Object.assign({}, baseTodoItem(state), adder(state), deleter(state));\n}\n\n\n\n\n//# sourceURL=webpack:///./src/todo.js?");

/***/ })
/******/ ]);