import {projectMaker,toDoMaker,OutputSystem,projectDeletor,checklistMaker} from "./coreModule.js";


const baseBuildUp = ()=>{
    const header = document.createElement("header");
    const titleBox = document.createElement("div");
    const sideBar = document.createElement('div');
    const crossBtn = document.createElement('button');
    const sideBarHeader = document.createElement('div');
    const horizonatalRule = document.createElement('hr');
    

    

    //Attribute Setup
    sideBar.setAttribute("class","sideBar")
    crossBtn.setAttribute('id',"sideCrossBtn");
    crossBtn.setAttribute('class',"crossBtn");
    sideBarHeader.setAttribute('class',"sideBarHeader");
    

    //Value Setup
    titleBox.innerText= "To Do List";
    crossBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
 </svg>`;
    sideBarHeader.innerHTML=`<h3>PROJECTS</h3>`;



    //DOM Elements Deproyment
    sideBar.appendChild(crossBtn);
    sideBar.appendChild(sideBarHeader);
    sideBar.appendChild(horizonatalRule);
    header.appendChild(titleBox);
    document.body.appendChild(header);
    document.body.appendChild(sideBar);
    
    crossBtn.addEventListener("click",()=>{
        sideBar.remove();
        header.classList.add("sideBarClosed");
        const menuBtn = document.createElement('div');
        menuBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
     </svg>`;
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
    const projectListViewer = (projectName)=>{
        
    }
})()

export {baseBuildUp}