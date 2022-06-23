import {projectMaker,toDoMaker,OutputSystem,modificationSystem,checklistMaker} from "./coreModule.js";
import {format} from 'date-fns';

const svgStore = {
    deletIcon : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<line x1="4" y1="7" x2="20" y2="7"></line>
<line x1="10" y1="11" x2="10" y2="17"></line>
<line x1="14" y1="11" x2="14" y2="17"></line>
<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
</svg>`,
    arrowRignt:`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<polyline points="7 7 12 12 7 17"></polyline>
<polyline points="13 7 18 12 13 17"></polyline>
</svg>`,
    arrowDown:`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<polyline points="7 7 12 12 17 7"></polyline>
<polyline points="7 13 12 18 17 13"></polyline>
</svg>`,
    menuBtn:`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<line x1="4" y1="6" x2="20" y2="6"></line>
<line x1="4" y1="12" x2="20" y2="12"></line>
<line x1="4" y1="18" x2="20" y2="18"></line>
</svg>`,
    crossBtn:`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
 </svg>`,
    editCircle:`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z"></path>
    <path d="M16 5l3 3"></path>
    <path d="M9 7.07a7.002 7.002 0 0 0 1 13.93a7.002 7.002 0 0 0 6.929 -5.999"></path>
 </svg>`,
    editSquare:`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
    <path d="M16 5l3 3"></path>
 </svg>`,
    floppySave:`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
    <circle cx="12" cy="14" r="2"></circle>
    <polyline points="14 4 14 8 8 8 8 4"></polyline>
 </svg>`,
    circlePlus:`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx="12" cy="12" r="9"></circle>
    <line x1="9" y1="12" x2="15" y2="12"></line>
    <line x1="12" y1="9" x2="12" y2="15"></line>
 </svg>`,
}


function createElement(elementaName){
    return document.createElement(elementaName);
}

const baseBuildUp = ()=>{
    const header = document.createElement("header");
    const titleBox = document.createElement("div");
    const sideBar = document.createElement('div');
    const mainPageContainer = document.createElement('div');
    const crossBtn = document.createElement('button');
    const sideBarHeader = document.createElement('div');
    const horizonatalRule = document.createElement('hr');
    

    

    //Attribute Setup
    titleBox.setAttribute("class","titleBox");
    sideBar.setAttribute("class","sideBar")
    crossBtn.setAttribute('id',"sideCrossBtn");
    crossBtn.setAttribute('class',"crossBtn");
    sideBarHeader.setAttribute('class',"sideBarHeader");
    mainPageContainer.setAttribute('class',"mainPageContainer");
    

    //Value Setup
    titleBox.innerText= "To Do List";
    crossBtn.innerHTML=svgStore.crossBtn;
    sideBarHeader.innerHTML=`<h3>PROJECTS</h3>`;



    //DOM Elements Deproyment
    sideBar.appendChild(crossBtn);
    sideBar.appendChild(sideBarHeader);
    sideBar.appendChild(horizonatalRule);
    header.appendChild(titleBox);
    document.body.appendChild(header);
    document.body.appendChild(sideBar);
    document.body.appendChild(mainPageContainer);
    
    crossBtn.addEventListener("click",()=>{
        sideBar.remove();
        header.classList.add("sideBarClosed");
        const menuBtn = document.createElement('div');
        menuBtn.innerHTML=svgStore.menuBtn;
        menuBtn.setAttribute("class","menuBtn");
        header.insertBefore(menuBtn,titleBox);
        menuBtn.addEventListener("click",()=>{
            menuBtn.remove();
            document.body.appendChild(sideBar);
            header.classList.remove("sideBarClosed");
        })
    })


}

const deployer = (()=>{
    const projectListViewer = (projectObject)=>{
        const sideBar = document.querySelector(".sideBar");
        const container = createElement('div');
        const banner = createElement('div');
        const arrowSwitch = createElement('div');
        const titleBar = createElement('div');
        const deletBtn = createElement('button');

        //attribute setup
        container.setAttribute('class',"projectNameContainer");
        titleBar.setAttribute('class',"projectNameTitleBar");
        deletBtn.setAttribute('class','deletBtn');

        //Value setup test
        titleBar.innerText=projectObject.projectName;
        if(titleBar.innerText.length>20){
            const newText = titleBar.innerText.slice(0,20);
            titleBar.innerText = `${newText}...`;
        };
        arrowSwitch.innerHTML=svgStore.arrowRignt;
        deletBtn.innerHTML=svgStore.deletIcon;

        //append Elements
        sideBar.appendChild(container);
        container.appendChild(banner);
        banner.appendChild(arrowSwitch);
        banner.appendChild(titleBar);
        banner.appendChild(deletBtn);
        //Add eventlisteners to make projectlists interactive
        for(let p in [arrowSwitch,titleBar]){
            [arrowSwitch,titleBar][p].addEventListener("click",()=>{
            const detailContainerProject = createElement('div');
            if(arrowSwitch.innerHTML===svgStore.arrowRignt){
                const projectDetailedTitle = createElement('p');
                const projectDateOfCreation = createElement('p');
                const numberOfToDos = createElement('p');
                const projectDateSpan = createElement('span');
                const expandProjectButton = createElement('button');

                detailContainerProject.setAttribute('class','detailContainerProject');
                expandProjectButton.setAttribute('id',`${projectObject.projectName}${format(projectObject.dateOfCreation,'yyyyMMddHHmmss')}`);
                
                projectDetailedTitle.innerText = projectObject.projectName;
                projectDateOfCreation.innerText = `Date and Time of Creation `;
                projectDateSpan.innerText=`${format(projectObject.dateOfCreation,"dd-MMM-yyyy   HH:mm")}`;
                numberOfToDos.innerText=`Number of Tasks : ${OutputSystem.getToDoList(projectObject.projectName).length}`;
                expandProjectButton.innerText="Expand";

                sideBar.insertBefore(detailContainerProject,arrowSwitch.parentNode.parentNode.nextSibling);
                detailContainerProject.appendChild(projectDetailedTitle);
                detailContainerProject.appendChild(projectDateOfCreation);
                detailContainerProject.appendChild(projectDateSpan);
                detailContainerProject.appendChild(numberOfToDos);
                detailContainerProject.appendChild(expandProjectButton);
                
                expandProjectButton.addEventListener("click",()=>{
                    projectDetailsViewer(projectObject);
                })

                arrowSwitch.innerHTML=svgStore.arrowDown;
            }
            else if(arrowSwitch.innerHTML===svgStore.arrowDown){
                arrowSwitch.parentNode.parentNode.nextSibling.remove();
                arrowSwitch.innerHTML=svgStore.arrowRignt;
            }
        })

        deletBtn.addEventListener("click",()=>{
            if(arrowSwitch.innerHTML===svgStore.arrowRignt){
                container.remove();
            }
            else if(arrowSwitch.innerHTML===svgStore.arrowDown){
                container.nextSibling.remove();
                container.remove();
            }
            modificationSystem.projectDeletor(projectObject.projectName);
            
        })

       
    }
        
    }

    const deployProjectList = ()=>{
        emptyProjectList();
        for(let j in OutputSystem.getProjectsList()){
            projectListViewer(OutputSystem.getProjectsList()[j]);
        };
        projectMakerLauncher();
    };

    const emptyProjectList = () =>{
        const childnode1 = document.querySelector(".sideBar").childNodes;

        for(let i in childnode1){
            if(i===0||i===1||i===2){
            }
            else{
                if(childnode1[3]){
                    childnode1[3].remove();
                }
            };
        };
    };

    const projectMakerLauncher = ()=>{
        const projectMakerBox = document.createElement("div");
        const projectMakerInput = document.createElement("input");
        const projectMakerBtn = document.createElement("button");

        projectMakerBtn.innerText = "Add New Project";

        projectMakerBox.classList.add("projectMakerBox");
        projectMakerInput.setAttribute("type","text");
        projectMakerInput.setAttribute("placeholder","Enter Project Name");
        
        projectMakerBox.appendChild(projectMakerInput);
        projectMakerBox.appendChild(projectMakerBtn);
        document.querySelector(".sideBar").appendChild(projectMakerBox);

        projectMakerBtn.addEventListener("click",()=>{
            let equalityChecker3;
            for(let m in OutputSystem.getProjectsList()){
                if(OutputSystem.getProjectsList()[m].projectName===projectMakerInput.value){
                    equalityChecker3 = true;
                    break;
                };
            };
            if(equalityChecker3){
                alert("Project already exists");
            }
            else if(!projectMakerInput.value){
                alert("Can't Make A Blank Project");
            }
            else{
                projectMaker(projectMakerInput.value);
                deployProjectList();
            }
        })
    };

    const projectDetailsViewer= (projectObject)=>{
        let noOfChecklists = 0;

        for(let p in OutputSystem.getToDoList(projectObject.projectName)){
            noOfChecklists = noOfChecklists + OutputSystem.getCheckList(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[p].title).length;
        }

        const titleBox= document.querySelector(".titleBox");
        const header = document.querySelector('header');
        const menuBtn = document.createElement('div');
        const sideBar= document.querySelector(".sideBar");
        const container=document.querySelector(".mainPageContainer");
        const titleBar = createElement('div');
        const titleBoxInner = createElement('div');
        const title = createElement("h3");
        const addNewToDo = createElement("div");
        const dateOfCreation= createElement('span');
        const numberOfTasks = createElement('span');
        const totalChecklists = createElement('span');
        
        //Value Setup
        title.innerText=projectObject.projectName;
        menuBtn.innerHTML=svgStore.menuBtn;
        addNewToDo.innerHTML=svgStore.circlePlus;
        dateOfCreation.innerText = `${format(projectObject.dateOfCreation,"do LLL yyyy")}`;
        numberOfTasks.innerText=`Tasks To Do: ${OutputSystem.getToDoList(projectObject.projectName).length}`
        totalChecklists.innerText= `Total Checklists : ${noOfChecklists}`
        
        //Attribute setup
        titleBar.classList.add("titleBar");
        titleBoxInner.classList.add("titleBoxInner");
        menuBtn.setAttribute("class","menuBtn");
        header.classList.add("sideBarClosed");
    
        //Action
        if(sideBar){
            sideBar.remove();
        };
        container.innerHTML="";
        container.appendChild(titleBar);
        titleBar.appendChild(titleBoxInner);
        titleBar.appendChild(dateOfCreation);
        titleBar.appendChild(numberOfTasks);
        titleBar.appendChild(totalChecklists);
        titleBoxInner.appendChild(title);
        titleBoxInner.appendChild(addNewToDo);
        if(!document.querySelector(".menuBtn")){
            header.insertBefore(menuBtn,titleBox);
        }

        //Display ToDo List
        for(let x in OutputSystem.getToDoList(projectObject.projectName)){
            const toDoContainer = createElement('div');
            const toDoTitleBox = createElement('div');
            const toDoTitle = createElement('h2');
            const toDoTitleEdit = createElement("div");
            const toDoDelet = createElement("div");
            const toDoDescriptionBox = createElement("div");
            const toDoDescription = createElement('p');
            const toDoDescriptionEdit=createElement("div");
            const toDoDueDateBox = createElement('div');
            const toDoDueDate = createElement("span");
            const toDoDueDateEdit = createElement("div");
            const toDoChecklistContainer = createElement('div');
            const checklistHeader = createElement('h3');
            const checklistAddButton = createElement('div');


            toDoTitle.innerText=OutputSystem.getToDoList(projectObject.projectName)[x].title;
            toDoDescription.innerText = `Description:-\n${OutputSystem.getToDoList(projectObject.projectName)[x].description}`
            toDoDueDate.innerText = `Due Date : ${format(OutputSystem.getToDoList(projectObject.projectName)[x].dueDate,"dd MMM yyyy")} \n Time : ${format(OutputSystem.getToDoList(projectObject.projectName)[x].dueDate,"HH:mm")}`;
            toDoTitleEdit.innerHTML=svgStore.editCircle;
            toDoDueDateEdit.innerHTML=svgStore.editSquare;
            toDoDelet.innerHTML=svgStore.deletIcon;
            toDoDescriptionEdit.innerHTML=svgStore.editSquare;
            

            let checklistArr = OutputSystem.getCheckList(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title)
            
            if(1){
                const toDoChecklistHeaderBox = createElement('div');
                checklistHeader.innerText="Check Lists";
                checklistAddButton.innerHTML=svgStore.circlePlus;
                checklistAddButton.classList.add("checklistAddButton");
                toDoChecklistHeaderBox.classList.add("toDoChecklistHeaderBox");
                toDoChecklistContainer.appendChild(toDoChecklistHeaderBox)
                toDoChecklistHeaderBox.appendChild(checklistHeader);
                toDoChecklistHeaderBox.appendChild(checklistAddButton);

                checklistAddButton.addEventListener("click",()=>{
                    for(let i in document.body.childNodes){
                        if(document.body.childNodes[i].style){
                            document.body.childNodes[i].style.opacity="0.4";
                        };
                    };
                    

                    
                    const addChecklistBox = createElement("div");
                    const addChecklistBoxCrossBtn = createElement("div");
                    const newChecklistInputLabel = createElement("label");
                    const newChecklistInput = createElement("input");
                    const saveNewChecklistBtn = createElement("button")

                    newChecklistInput.setAttribute("type","text");
                    addChecklistBoxCrossBtn.classList.add("addChecklistBoxCrossBtn");
                    newChecklistInput.setAttribute("id",`newChecklistInput${projectObject.projectName}${x}`);
                    newChecklistInputLabel.setAttribute("for",`newChecklistInput${projectObject.projectName}${x}`)
                    addChecklistBox.classList.add("addChecklistBox");

                    addChecklistBoxCrossBtn.innerHTML=svgStore.crossBtn;
                    saveNewChecklistBtn.innerText="Save";
                    newChecklistInputLabel.innerText="Enter Name Of New Checklist :";

                    document.body.appendChild(addChecklistBox);
                    addChecklistBox.appendChild(addChecklistBoxCrossBtn);
                    addChecklistBox.appendChild(newChecklistInputLabel);
                    addChecklistBox.appendChild(newChecklistInput);
                    addChecklistBox.appendChild(saveNewChecklistBtn);
                    addChecklistBox.style.opacity="1";
                    
                    addChecklistBoxCrossBtn.addEventListener("click",()=>{
                        addChecklistBox.remove();
                        for(let i in document.body.childNodes){
                            if(document.body.childNodes[i].style){
                                document.body.childNodes[i].style.opacity="1";
                            };
                        };
                        sideBar.style.opacity=1;
                    });
                    
                    saveNewChecklistBtn.addEventListener("click",()=>{
                        let equalityChecker;
                        let updatedChecklistArr = OutputSystem.getCheckList(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title);
                        for(let q in updatedChecklistArr){
                            if(updatedChecklistArr[q].checkName===newChecklistInput.value){
                                equalityChecker=true;
                                break;
                            };
                        }
                        
                        if(!newChecklistInput.value){
                            alert("Can't Make Empty Checklist");
                        }
                        else if(equalityChecker){
                            alert("This Checklist Already exist");
                        }
                        else{
                            checklistMaker(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title,newChecklistInput.value);
                            addChecklistBox.remove();
                            projectDetailsViewer(projectObject);
                            for(let i in document.body.childNodes){
                                if(document.body.childNodes[i].style){
                                    document.body.childNodes[i].style.opacity="1";
                                };
                            };
                            if(sideBar){
                                sideBar.style.opacity=1;
                            }
                        
                        }
                    })

                });

            }

            for(let y in checklistArr){
                const checklistBar = createElement('div');
                const checklistName = createElement('h4');
                const editBtnChecklist = createElement('button');
                const deletBtnChecklist = createElement('button');
                const checkBox = createElement('input');

                checklistName.innerText= OutputSystem.getCheckList(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title)[y].checkName;
                editBtnChecklist.innerHTML=svgStore.editCircle;
                deletBtnChecklist.innerHTML=svgStore.deletIcon;

                if(checklistArr[y].isDone){
                    checkBox.checked=true;
                };

                checkBox.setAttribute("type","checkBox");
                checklistName.classList.add("checklistName");
                checklistBar.classList.add("checklistBar");
                editBtnChecklist.classList.add("editBtnChecklist");
                deletBtnChecklist.classList.add("deletBtnChecklist");

                toDoChecklistContainer.appendChild(checklistBar);
                checklistBar.appendChild(checklistName);
                checklistBar.appendChild(editBtnChecklist);
                checklistBar.appendChild(deletBtnChecklist);
                checklistBar.appendChild(checkBox);

                //modification and deletion of checklist

                deletBtnChecklist.addEventListener("click",()=>{
                    checklistBar.remove();
                    modificationSystem.checklistDeletor(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title,OutputSystem.getCheckList(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title)[y].checkName);
                });

                const editChecklistInput=createElement("input");
                editBtnChecklist.addEventListener("click",()=>{
                    
                    if(editBtnChecklist.innerHTML===svgStore.editCircle){
                        editChecklistInput.setAttribute("type","text");
    
                        editBtnChecklist.innerHTML=svgStore.floppySave;
                        editChecklistInput.value=OutputSystem.getCheckList(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title)[y].checkName;
                        checklistName.parentNode.replaceChild(editChecklistInput,checklistName);
                    }
                    else if(editBtnChecklist.innerHTML===svgStore.floppySave){
                        modificationSystem.checklistNameModifier(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title,OutputSystem.getCheckList(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title)[y].checkName,editChecklistInput.value);
                        checklistName.innerText=editChecklistInput.value;
                        editChecklistInput.parentNode.replaceChild(checklistName,editChecklistInput);
                        editBtnChecklist.innerHTML=svgStore.editCircle;
                    };
                });

                checkBox.addEventListener('click',()=>{
                    if(checkBox.checked){
                        modificationSystem.checklistIsDoneModifier(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title,OutputSystem.getCheckList(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title)[y].checkName,1);
                    }
                    else if(!(checkBox.checked)){
                        modificationSystem.checklistIsDoneModifier(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title,OutputSystem.getCheckList(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title)[y].checkName,0);

                    };
                })

            };
           

            toDoContainer.setAttribute("class","toDoContainer");
            toDoTitleBox.classList.add("toDoTitleBox");
            toDoTitle.classList.add("toDoTitle");
            toDoTitleEdit.classList.add("toDoTitleEdit");
            toDoDescriptionBox.classList.add("toDoDescriptionBox");
            toDoDescription.classList.add("toDoDescription");
            toDoDueDateBox.classList.add("toDoDueDateBox");
            toDoDueDate.classList.add("toDoDueDate");
            toDoDescriptionEdit.classList.add("toDoDescriptionEdit");
            toDoDueDateEdit.classList.add("toDoDueDateEdit");
            toDoChecklistContainer.classList.add("toDoChecklistContainer");
            checklistHeader.classList.add("checklistHeader");

            container.appendChild(toDoContainer);
            toDoContainer.appendChild(toDoTitleBox);
            toDoTitleBox.appendChild(toDoTitle);
            toDoTitleBox.appendChild(toDoTitleEdit);
            toDoTitleBox.appendChild(toDoDelet);
            toDoContainer.appendChild(toDoDescriptionBox);
            toDoDescriptionBox.appendChild(toDoDescription);
            toDoDescriptionBox.appendChild(toDoDescriptionEdit);
            toDoContainer.appendChild(toDoDueDateBox);
            toDoDueDateBox.appendChild(toDoDueDate);
            toDoDueDateBox.appendChild(toDoDueDateEdit);
            toDoContainer.appendChild(toDoChecklistContainer);
            
            toDoDelet.addEventListener("click",()=>{
                modificationSystem.toDoListDeletor(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title);
                projectDetailsViewer(projectObject);
            })

            const toDoTitleEditInput = createElement("input");
            toDoTitleEditInput.setAttribute("type","text");
            toDoTitleEdit.addEventListener("click",()=>{
                if(toDoTitleEdit.innerHTML===svgStore.editCircle){
                    toDoTitleEditInput.value = OutputSystem.getToDoList(projectObject.projectName)[x].title;
                    toDoTitle.parentNode.replaceChild(toDoTitleEditInput,toDoTitle);
                    toDoTitleEdit.innerHTML=svgStore.floppySave;
                }
                else if(toDoTitleEdit.innerHTML===svgStore.floppySave){
                    modificationSystem.toDoTitleModifier(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title,toDoTitleEditInput.value);
                    toDoTitle.innerText = OutputSystem.getToDoList(projectObject.projectName)[x].title;
                    toDoTitleEditInput.parentNode.replaceChild(toDoTitle,toDoTitleEditInput);
                    toDoTitleEdit.innerHTML=svgStore.editCircle;
                };
            });

            const toDoDescriptionEditInput  = createElement("textarea");
            toDoDescriptionEditInput.setAttribute("type","text");
            toDoDescriptionEdit.addEventListener("click",()=>{
                if(toDoDescriptionEdit.innerHTML===svgStore.editSquare){
                    toDoDescriptionEditInput.value = OutputSystem.getToDoList(projectObject.projectName)[x].description;
                    toDoDescription.parentNode.replaceChild(toDoDescriptionEditInput,toDoDescription);
                    toDoDescriptionEdit.innerHTML=svgStore.floppySave;
                }
                else if(toDoDescriptionEdit.innerHTML===svgStore.floppySave){
                    
                    modificationSystem.toDoDescriptionModifier(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title,toDoDescriptionEditInput.value);
                    toDoDescription.innerText = `Description:-\n${OutputSystem.getToDoList(projectObject.projectName)[x].description}`
                    toDoDescriptionEditInput.parentNode.replaceChild(toDoDescription,toDoDescriptionEditInput);
                    toDoDescriptionEdit.innerHTML=svgStore.editSquare;
                }
            });
            
            const dueDateEditsetup = dateTimeElementCreator(OutputSystem.getToDoList(projectObject.projectName)[x].dueDate);
            toDoDueDateEdit.addEventListener("click",()=>{
                if(toDoDueDateEdit.innerHTML===svgStore.editSquare){
                    toDoDueDateEdit.innerHTML=svgStore.floppySave;
                    toDoDueDateBox.replaceChild(dueDateEditsetup.fieldset,toDoDueDate);
                }
                else if(toDoDueDateEdit.innerHTML===svgStore.floppySave){
                    modificationSystem.toDoDueDateModifier(projectObject.projectName,OutputSystem.getToDoList(projectObject.projectName)[x].title,dueDateEditsetup.getDate());
                    toDoDueDate.innerText = `Due Date : ${format(dueDateEditsetup.getDate(),"dd MMM yyyy")} \n Time : ${format(dueDateEditsetup.getDate(),"HH:mm")}`;
                    toDoDueDateBox.replaceChild(toDoDueDate,dueDateEditsetup.fieldset)
                    toDoDueDateEdit.innerHTML=svgStore.editSquare;
                };
                
            });

        };

        addNewToDo.addEventListener("click",()=>{
            
            for(let i in document.body.childNodes){
                if(document.body.childNodes[i].style){
                    document.body.childNodes[i].style.opacity=0.3;
                };
            };

            const addNewToDoBox = document.createElement("div");
            const newTitleLabel = document.createElement("label");
            const newTitleInput = document.createElement("input");
            const newDescriptionLabel = document.createElement("label");
            const newDescriptionInput = document.createElement("input");
            const newDueDate = dateTimeElementCreator(new Date());
            const newPriorityLabel = document.createElement("label");
            const newPrioritySelect = document.createElement("select");
            const saveBtn = document.createElement("button");
            const newToDoCrossBtn = document.createElement("div");

            newToDoCrossBtn.innerHTML = svgStore.crossBtn;
            newTitleLabel.innerText="Title : ";
            newDescriptionLabel.innerText="Description : ";
            newPriorityLabel.innerText = "Select priority : ";
            saveBtn.innerText = "Save";
            newDueDate.optionAppender(newPrioritySelect,["Very Important","Important","Less Important"],[1,2,3]);

            

            newToDoCrossBtn.classList.add("newToDoCrossBtn");
            addNewToDoBox.classList.add("addNewToDoBox");
            newTitleInput.setAttribute("type","text");
            newDescriptionInput.setAttribute("type","text");
            newTitleInput.setAttribute("id",`title${projectObject.projectName}`);
            newTitleLabel.setAttribute("for",`title${projectObject.projectName}`);
            newDescriptionInput.setAttribute("id",`description${projectObject.projectName}`);
            newDescriptionLabel.setAttribute("for",`description${projectObject.projectName}`);
            newPrioritySelect.setAttribute("id",`priority${projectObject.projectName}`);
            newPriorityLabel.setAttribute("for",`priority${projectObject.projectName}`);
            // if(!document.querySelector(".addNewToDoBox")){
                addNewToDoBox.appendChild(newToDoCrossBtn);
                addNewToDoBox.appendChild(newTitleLabel);
                addNewToDoBox.appendChild(newTitleInput);
                addNewToDoBox.appendChild(newDescriptionLabel);
                addNewToDoBox.appendChild(newDescriptionInput);
                addNewToDoBox.appendChild(newDueDate.fieldset);
                addNewToDoBox.appendChild(newPriorityLabel);
                addNewToDoBox.appendChild(newPrioritySelect);
                addNewToDoBox.appendChild(saveBtn);
                document.body.appendChild(addNewToDoBox);
            // };
            document.querySelector(".addNewToDoBox").style.opacity=1;

            saveBtn.addEventListener("click",()=>{
                let equalityChecker;
                for(let opt in OutputSystem.getToDoList(projectObject.projectName)){
                    if(OutputSystem.getToDoList(projectObject.projectName)[opt].title===newTitleInput.value){
                        equalityChecker=true;
                        break;
                    };

                };
                if(equalityChecker){
                    alert("This task name already exists");
                }
                else if(!newTitleInput.value){
                    alert("Can not make a blank Task");
                }
                else{
                    
                    toDoMaker(projectObject.projectName,newTitleInput.value,newDescriptionInput.value,newDueDate.getDate(),Number(newPrioritySelect.value));
                    addNewToDoBox.remove();
                    for(let i in document.body.childNodes){
                        if(document.body.childNodes[i].style){
                            document.body.childNodes[i].style.opacity=1;
                        };
                    };
                    projectDetailsViewer(projectObject);

                }
            })

            newToDoCrossBtn.addEventListener("click",()=>{
                addNewToDoBox.remove();
                for(let i in document.body.childNodes){
                    if(document.body.childNodes[i].style){
                        document.body.childNodes[i].style.opacity=1;
                    };
                };
            });


        })

        menuBtn.addEventListener("click",()=>{
            menuBtn.remove();
            document.body.appendChild(sideBar);
            header.classList.remove("sideBarClosed");
            
        });

        toDoTitleBackgroundSetter();
        
    };

    const dateTimeElementCreator = (defaultDate)=>{
        const fieldset = document.createElement("fieldset");
        const dateFieldSet = document.createElement("fieldset");
        const dateFieldSetLegend = document.createElement("legend");
        const timeFieldSet = document.createElement("fieldset");
        const timeFieldSetLegend = document.createElement("legend");
        const yearInput = document.createElement("select");
        const monthInput = document.createElement("select");
        const dayInput = document.createElement("select");
        const hourInput = document.createElement("select");
        const minuteInput = document.createElement("select");
        const today =defaultDate;


        dateFieldSetLegend.innerText="Enter Date";
        timeFieldSetLegend.innerText="Enter Time(HH:MM)";
        const yearArr = [];
        for(let i=0;i<=10;++i){
            yearArr.push(today.getFullYear()+i);
        }
        optionAppender(yearInput,yearArr,yearArr);
        optionAppender(monthInput,["January","February","March","April","May","June","July","August","September","October","November","December"],[0,1,2,3,4,5,6,7,8,9,10,11]);
        monthInput.value=today.getMonth();
        let dayArr=[];
        for(let i=1;i<=31;i++){dayArr.push(i)};
        optionAppender(dayInput,dayArr,dayArr);
        dayInput.value=today.getDate();
        const hourArr=[];
        for(let i=0;i<=23;i++){
            hourArr.push(i);
        };
        optionAppender(hourInput,hourArr,hourArr);
        hourInput.value=today.getHours();
        const minuteArr=[];
        for(let i=0;i<60;i++){
            minuteArr.push(i);
        };
        optionAppender(minuteInput,minuteArr,minuteArr);
        minuteInput.value = today.getMinutes();

        fieldset.appendChild(dateFieldSet);
        fieldset.appendChild(timeFieldSet);
        dateFieldSet.appendChild(dateFieldSetLegend);
        dateFieldSet.appendChild(yearInput);
        dateFieldSet.appendChild(monthInput);
        dateFieldSet.appendChild(dayInput);
        timeFieldSet.appendChild(timeFieldSetLegend);
        timeFieldSet.appendChild(hourInput);
        timeFieldSet.appendChild(minuteInput);

        function optionAppender(element,optionArray,valueArray){
            for(let opt in optionArray){
                const option = document.createElement("option");
                option.innerText=optionArray[opt];
                option.setAttribute("value",valueArray[opt]);
                element.appendChild(option);
            };
        }
        const getDate = ()=>{
            const outputDate = new Date(yearInput.value,monthInput.value,dayInput.value,hourInput.value,minuteInput.value,0);
            return outputDate;
        }

        return {getDate,fieldset,optionAppender}
        
    }

    function toDoTitleBackgroundSetter(){
        if(document.querySelector(".titleBoxInner>h3")){

            var projectName = document.querySelector(".titleBoxInner>h3").innerText;
        }
        let toDoTitleList = document.querySelectorAll(".toDoTitle");

        for(let m in toDoTitleList){
            
            if(toDoTitleList[m].style){
                if(OutputSystem.getToDoList(projectName)[m].priority===1){
                    toDoTitleList[m].style.backgroundColor = "red";
                }
                else if(OutputSystem.getToDoList(projectName)[m].priority===2){
                    toDoTitleList[m].style.backgroundColor = "yellow";
                    toDoTitleList[m].style.color="silver";
                }else{
                    toDoTitleList[m].style.backgroundColor="green";
                };
            }
        };
    };
    
    

    return {deployProjectList};
})();

    export {baseBuildUp,deployer}