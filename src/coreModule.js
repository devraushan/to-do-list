const projectArr = [];

const getListOfProject = ()=>{
    let projectOut = projectArr;
    return projectArr;
}

const projectMaker = (projectName,toDoArr)=>{
    const projectObj={};
    projectObj.projectName = projectName;
    projectObj.toDos = toDoArr;
    return projectObj;
}

const addProjectToProjectArr = (project)=>{
    projectArr.push(project);
}

const toDoMaker = (title,description,dueDate,priority,checklists)=>{
    const toDo = {};
    const checklistArray=[];
    toDo.title=title;
    toDo.description=description;
    toDo.dueDate=dueDate;
    toDo.priority=priority;
    
    for(let i=0;i<checklists.length;++i){
        const checklist={};
        checklist.checkName = checklists[i];
        checklist.isDone=0;
        checklistArray.push(checklist);
    }
    toDo.checklist=checklistArray;
    return toDo;
}

const addToDoToProject = (toDos)=>{
    
}


export {toDoMaker};