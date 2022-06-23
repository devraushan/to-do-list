import { projectMaker,toDoMaker,OutputSystem,checklistMaker, modificationSystem } from "./coreModule";
import './style.css';
import {baseBuildUp,deployer} from "./DOMfunctions";
import {format} from "date-fns";

projectMaker("abc");
projectMaker("testProject");
projectMaker("one more project flksdjfl jsdkf");
toDoMaker("abc","man","Desctiprion of project is this that these those",new Date(),1);
toDoMaker("abc",'wild','Hey Welcome to Karachi',new Date(2022,0,1,21,33,59),2);
toDoMaker("testProject","newtest","so welcome to checklist tests descriptive lorem ipsum",new Date(),3);
checklistMaker("testProject","newtest","testchedcklist");
checklistMaker("testProject","newtest","testchecklist2");
checklistMaker("testProject","newtest","testchecklist3");
checklistMaker("testProject","newtest","testchecklist4");
checklistMaker("testProject","newtest","testchecklist5");
checklistMaker("testProject","newtest","testchecklist6");
checklistMaker("testProject","newtest","testchecklist7");
checklistMaker("testProject","newtest","testchecklist8");
checklistMaker("testProject","newtest","testchecklist9");
checklistMaker("abc","man","ChecklistTEst");
console.log(OutputSystem.getCheckList("testProject",'newtest'));



const date = format(new Date(),'EEEE dd-MM-yy  hh:mm');
console.log(date);
console.log(OutputSystem.getProjectsList());
baseBuildUp();
deployer.deployProjectList();
