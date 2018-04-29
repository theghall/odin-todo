"use strict";
import * as todoGlobal from './commonTab';

const utility = {
}
function buildTaskPage() {

	todoGlobal.utility.addSection(todoGlobal.utility.getRootElement(),
		todoGlobal.elemId.taskContainerId);

	const rootElem = todoGlobal.utility.getRootElement();
	const sectionElem = document.getElementById(todoGlobal.elemId.taskContainerId);

	todoGlobal.utility.addTaskTable(sectionElem);
	todoGlobal.utility.addActionSection(rootElem);
	todoGlobal.utility.addPageButtons(document.getElementById(todoGlobal.elemId.pageButtonsId));
	todoGlobal.utility.addFooter(rootElem);
}


export {buildTaskPage};


