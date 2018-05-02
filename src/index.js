require('normalize.css');
// normalize.css must be loaded first before app css, so disable eslint check
/* eslint-disable import/first */
import './assets/css/style.scss';
import buildTaskPage from './tasksTab';
import buildProjectPage from './projectsTab';
import * as todoGlobal from './commonTab';
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
    todoGlobal.state.currentProject = null;
    selectTab(e);

    switch (e.target.textContent) {
      case 'Tasks':
        removeContainer(todoGlobal.elemId.projectsContainerId);
        buildTaskPage();
        break;
      case 'Projects':
        removeContainer(todoGlobal.elemId.taskContainerId);
        buildProjectPage();
        break;
    }
  }
}

// Support functions

function addTabListener(target) {
  target.addEventListener('click', (e) => { makeTabActive(e); });
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
  todoGlobal.state.loadData();
  createTabMenu();
  buildTaskPage();
}

document.addEventListener('DOMContentLoaded', ready);
