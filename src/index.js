import { projectMaker,toDoMaker,OutputSystem,projectDeletor,checklistMaker } from "./coreModule";
import './style.css';
import {baseBuildUp} from "./DOMfunctions";
import {format} from "date-fns";

projectMaker("abc");
projectMaker("testProject");
projectMaker("one more project");
toDoMaker("abc","man","dkl;jfls",'kdjflkdj','kldjflkd');
toDoMaker("abc",'wild','jfkd','jfklsdjf','jfkldsj');
toDoMaker("testProject","newtest","jlkfsdjfldskj","jfldksfjdslk",3);
checklistMaker("testProject","newtest","testchedcklist");
checklistMaker("testProject","newtest","testchecklist2");
checklistMaker("testProject","newtest","testchecklist3");
checklistMaker("testProject","newtest","testchecklist4");
console.log(OutputSystem.getCheckList("testProject",'newtest'));

const date = format(new Date(),'EEEE dd-MM-yy  hh:mm');
console.log(date);

baseBuildUp();
