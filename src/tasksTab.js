import * as todoGlobal from './commonTab';

function buildTaskPage() {
  todoGlobal.utility.addSection(
    todoGlobal.utility.getRootElement(),
    todoGlobal.elemId.taskContainerId,
  );

  const sectionElem = document.getElementById(todoGlobal.elemId.taskContainerId);

  todoGlobal.utility.addTaskTable(sectionElem);
  todoGlobal.utility.addActionSection(sectionElem);
  todoGlobal.utility.addPageButtons(document.getElementById(todoGlobal.elemId.pageButtonsId));
  todoGlobal.utility.addFooter(sectionElem);
}


export default buildTaskPage;

