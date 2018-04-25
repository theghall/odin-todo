"use strict";
import * as todoGlobal from './commonTab';

function buildTaskPage() {
	const sectionElem = todoGlobal.utility.createSection();
	const tableElem = todoGlobal.utility.createTable(sectionElem, 'tasks-table');

	todoGlobal.utility.addTaskTable(tableElem);
	todoGlobal.utility.addPageActions(sectionElem);
	todoGlobal.utility.addPageButtons(document.getElementById('page-buttons'));
	todoGlobal.utility.addFooter(sectionElem);
}


export {buildTaskPage};


