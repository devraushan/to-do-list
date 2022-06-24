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

var projectArr = [];
let newCopy=[];
let localStorageAvailable;
newCopy =JSON.parse(localStorage.getItem("localCopy"));
if(newCopy.length){
   localStorageAvailable=true;
    for(let i in newCopy){
        const localProjectObj = Object.create(projectObjProto);
        localProjectObj.projectName = newCopy[i].projectName;
        localProjectObj.dateOfCreation = new Date(newCopy[i].dateOfCreation);
        localProjectObj.toDos=[];
        for(let j in newCopy[i].toDos){
            const localToDoObj = Object.create(toDoObjProto);
            localToDoObj.title = newCopy[i].toDos[j].title;
            localToDoObj.description = newCopy[i].toDos[j].description;
            localToDoObj.dueDate = new Date(newCopy[i].toDos[j].dueDate);
            localToDoObj.priority = newCopy[i].toDos[j].priority;
            localToDoObj.checklist = [];
            for(let k in newCopy[i].toDos[j].checklist){
                const localChecklistObject = Object.create(checklistObjProto);
                localChecklistObject.checkName = newCopy[i].toDos[j].checklist[k].checkName;
                localChecklistObject.isDone = newCopy[i].toDos[j].checklist[k].isDone;
                localToDoObj.checklist.push(localChecklistObject);
            }
            localProjectObj.toDos.push(localToDoObj);
        };
        projectArr.push(localProjectObj);
    };
};
// if(typeof(newCopy==="array")){
//     for(let i in newCopy){
//         projectArr.push(newCopy[i]);
//     }
// }
// projectArr = newCopy;


const projectMaker = (projectName)=>{
    const projectObj= Object.create(projectObjProto);
    projectObj.projectName = projectName;
    projectObj.dateOfCreation = new Date();
    projectObj.toDos = [];
    projectArr.push(projectObj);
};



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



//output system

const OutputSystem = (()=>{
    const getProjectsList = ()=>{
        const projectNames = [];
        for(let i in projectArr){
            const projectObjOutput = {};
            projectObjOutput.projectName = projectArr[i].projectName;
            projectObjOutput.dateOfCreation = projectArr[i].dateOfCreation;
            projectNames.push(projectObjOutput);
        };
        return projectNames;
    }

    const getToDoList = (projectName)=>{
        const toDoListOut=[];
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
               for(let j in projectArr[i].toDos){
                const toDoObjOut = {};
                toDoObjOut.title = projectArr[i].toDos[j].title;
                toDoObjOut.dueDate = projectArr[i].toDos[j].dueDate;
                toDoObjOut.description = projectArr[i].toDos[j].description;
                toDoObjOut.priority = projectArr[i].toDos[j].priority;
                toDoListOut.push(toDoObjOut);
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

const modificationSystem = (()=>{
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
    };

    const toDoListDeletor = (projectName,toDoListName)=>{
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
                projectArr[i].deletToDo = toDoListName;
            }
        }
    }
    
    const checklistDeletor = (projectName,toDoListName,checklistName)=>{
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
                for(let j in projectArr[i].toDos){
                    if(projectArr[i].toDos[j].title === toDoListName){
                        projectArr[i].toDos[j].deletCheckListItem = checklistName;
                    }
                }
            }
        }
    }
    
    const projectModifier = (projectName,projectNewName)=>{
        for(let i in projectArr){
            if(projectArr[i].projectName===projectName){
                projectArr[i].editProjectName=projectNewName;
            };
        };
    }

    const toDoTitleModifier = (projectName,toDoTitle,toDoNewTitle)=>{
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
                for(let j in projectArr[i].toDos){
                    if(projectArr[i].toDos[j].title === toDoTitle){
                        projectArr[i].toDos[j].editTitle = toDoNewTitle;
                    };
                };
            };
        };
    };
    const toDoDescriptionModifier = (projectName,toDoTitle,toDoNewDescription)=>{
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
                for(let j in projectArr[i].toDos){
                    if(projectArr[i].toDos[j].title === toDoTitle){
                        projectArr[i].toDos[j].editDescription = toDoNewDescription;
                    };
                };
            };
        };
    };

    const toDoDueDateModifier = (projectName,toDoTitle,toDoNewDueDate)=>{
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
                for(let j in projectArr[i].toDos){
                    if(projectArr[i].toDos[j].title === toDoTitle){
                        projectArr[i].toDos[j].editDueDate = toDoNewDueDate;
                    };
                };
            };
        };
    };

    const toDoPriorityModifier = (projectName,toDoTitle,toDoNewPriority)=>{
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
                for(let j in projectArr[i].toDos){
                    if(projectArr[i].toDos[j].title === toDoTitle){
                        projectArr[i].toDos[j].editPriority = toDoNewPriority;
                    };
                };
            };
        };
    }; 

    const checklistNameModifier = (projectName,toDoName,checkName,newCheckname)=>{
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
                for(let j in projectArr[i].toDos){
                    if(projectArr[i].toDos[j].title === toDoName){
                        for(let k in projectArr[i].toDos[j].checklist){
                            if(projectArr[i].toDos[j].checklist[k].checkName===checkName){
                                projectArr[i].toDos[j].checklist[k].editTitle=newCheckname;
                            };
                        };
                    };
                };
            };
        };
    };

    const checklistIsDoneModifier = (projectName,toDoName,checkName,newState)=>{
        for(let i in projectArr){
            if(projectArr[i].projectName === projectName){
                for(let j in projectArr[i].toDos){
                    if(projectArr[i].toDos[j].title === toDoName){
                        for(let k in projectArr[i].toDos[j].checklist){
                            if(projectArr[i].toDos[j].checklist[k].checkName===checkName){
                                projectArr[i].toDos[j].checklist[k].isDoneSwitch=newState;
                            };
                        };
                    };
                };
            };
        };
    };

        return {projectDeletor,toDoListDeletor,checklistDeletor,projectModifier,toDoTitleModifier,toDoDescriptionModifier,toDoDueDateModifier,toDoPriorityModifier,checklistIsDoneModifier,checklistNameModifier};
})();

//localcopy setup
function localSave(){
    localStorage.setItem("localCopy",JSON.stringify(projectArr));
};

setInterval(() => {
    localSave();
}, 1000);

//exports
export {projectMaker,toDoMaker,OutputSystem,modificationSystem,checklistMaker,localStorageAvailable}; 