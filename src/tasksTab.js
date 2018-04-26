"use strict";
import * as todoGlobal from './commonTab';

const utility = {
}
function buildTaskPage() {

	todoGlobal.utility.addSection(todoGlobal.utility.getRootElement(),
		todoGlobal.elemId.taskContainerId);

	const sectionElem = document.getElementById(todoGlobal.elemId.taskContainerId);

	todoGlobal.utility.addTaskTable(sectionElem);
	todoGlobal.utility.addPageActions(sectionElem);
	todoGlobal.utility.addPageButtons(document.getElementById('page-buttons'));
	todoGlobal.utility.addFooter(sectionElem);
}


export {buildTaskPage};


