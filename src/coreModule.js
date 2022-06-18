const projectArr = [];

const projectMaker = (projectName)=>{
    const projectObj= Object.create(projectObjProto);
    projectObj.projectName = projectName;
    projectObj.toDos = [];
    projectArr.push(projectObj);
};

const projectDeletor=(projectName)=>{
    const arrOut = projectArr.filter((val)=>{
        if(val.projectName!=projectName){
            return val;
        };
    });
    projectArr.splice(0);
    for(let m in arrOut){
        projectArr.push(arrOut[m])
    };

}

const toDoMaker=(projectName,title,description,dueDate,priority)=>{
    const toDo = Object.create(toDoObjProto);
    const checklistArray=[];
    toDo.title=title;
    toDo.description=description;
    toDo.dueDate=dueDate;
    toDo.priority=priority;
    toDo.checklist=[];
    for(let i in projectArr){
        if(projectArr[i].projectName===projectName){
            projectArr[i].toDoPush=toDo;
        };
    };
};

const checklistMaker = (projectName,toDoTitle,checkName)=>{
    const checklist = Object.create(checklistObjProto);
    checklist.checkName = checkName;
    checklist.isDone=0;
    for(let i in projectArr){
        if(projectArr[i].projectName===projectName){
            for(let k in projectArr[i].toDos){
                if(projectArr[i].toDos[k].title===toDoTitle){
                    projectArr[i].toDos[k].checklist.push(checklist);
                };
            };
        };
    };
    
};

//prototypes
//#1
const projectObjProto = {
    set editProjectName(newProjectName){
        this.projectName = newProjectName;
    },
    set toDoPush(toDo){
        this.toDos.push(toDo);
    },
    set deletToDo(toDoTitle){
        const toDoArr = this.toDos;
        this.toDos = toDoArr.filter((val)=>{
            if(toDoTitle!=val.title){
                return val;
            };
        });
    }
};
//#2
const checklistObjProto = {
    set isDoneSwitch(x){
        if(x){
            this.isDone=1;
        }
        else{
            this.isDone = 0;
        }
    },

    set editTitle(newTitle){
        this.checkName = newTitle;
    }
};
//#3
const toDoObjProto = {
    set editTitle(newTitle){
        this.title = newTitle;
    },
    set editDescription(newDescription){
        this.description= newDescription;
    },
    set editDueDate(newDueDate){
        this.dueDate=newDueDate;
    },
    set editPriority(newPriority){
        if(newPriority>=3){
            this.priority=3;
        }
        else if(newPriority<=1){
            this.priority=1;
        }
        else{
            this.priority=2;
        };
    },
    
    set deletCheckListItem(checkName){
        const CheckItems = this.checklist;
        this.checklist=CheckItems.filter((val)=>{
            if(checkName!=val.checkName){
                return val;
            };
        });
    },
    set checklistPush(check){
        this.checklist.push(check)
    }

};


//output system

const OutputSystem = (()=>{
    const getProjectsList = ()=>{
        const projectNames = [];
        for(let i in projectArr){
            projectNames.push(projectArr[i].projectName);
        };
        return projectNames;
    }

    const getToDoList = (projectName)=>{
        const toDoListOut=[];
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
               for(let j in projectArr[i].toDos){
                toDoListOut.push(projectArr[i].toDos[j].title);
               };
            };
        };
        return toDoListOut;
    }

    const getCheckList = (projectName,toDoListName)=>{
        const checkListOut = [];
        for(let i in projectArr){
            if(projectArr[i].projectName===projectName){
                for(let j in projectArr[i].toDos){
                    if(projectArr[i].toDos[j].title === toDoListName){
                        for(let k in projectArr[i].toDos[j].checklist){
                            const checkListObjOutput = {};
                            checkListObjOutput.checkName = projectArr[i].toDos[j].checklist[k].checkName;
                            checkListObjOutput.isDone = projectArr[i].toDos[j].checklist[k].isDone;
                            checkListOut.push(checkListObjOutput);
                        };
                    };
                };
            };
        };
        
        return checkListOut;
    }



    return {getProjectsList,getToDoList,getCheckList};
})()


//exports
export {projectMaker,toDoMaker,OutputSystem,projectDeletor,checklistMaker}; 