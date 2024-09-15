const soldiers = [];
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
const div3 = document.getElementById('div3');
const div4 = document.getElementsByClassName('div4');
const time = document.getElementById("mission-time")
const tableBody = document.getElementById("soldier-table")
const editSection = document.getElementById("edit-section")
let ascending = true;




const saveTolokalStorage = () => {
    localStorage.setItem("soldiers", JSON.stringify(soldiers));
}
const loadFromLocalStorag = () => {
    const savedSoldiers = JSON.parse(localStorage.getItem("soldiers"));
    if(savedSoldiers){
        soldiers.push(...savedSoldiers);
    }
}
loadFromLocalStorag();

const personalForm = document.querySelector("form");
personalForm.addEventListener("submit",()=> {
    const newSoldier = {
        FullName:document.getElementById("full-name").value,
        Rank:document.getElementById("rank").value,
        Role:document.getElementById("role").value,
        Platoon:document.getElementById("platoon").value,
        MissionTime:document.getElementById("mission-time").value,
        Status:document.getElementById("status").value
    }
    soldiers.push(newSoldier);
    saveTolokalStorage();
}) 

const dsplaysoldirersInTable = () => {
    const tableBody = document.getElementById("soldier-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    soldiers.forEach((soldier,index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${soldier.FullName}</td>
            <td>${soldier.Rank}</td>
            <td>${soldier.Role}</td>
            <td>${soldier.Platoon}</td>
            <td>${soldier.Status}</td>
            <td id = "bottun">
            <button class = "Action" id = "btnEdit" onclick = "editSoldier(${index})">Edit</button> 
            <button class = "Action" id = "btnDel"  onclick = "deleteSoldier(${index})">Delete</button>
             ${soldier.Status == "Active" || soldier.Status == "Reserve" ? `<button class = "Action" onclick="startMission(${index})">Start mission</button>` : ""}
            </td>
        `;  
     
        tableBody.appendChild(row);
    });
}
dsplaysoldirersInTable();

 const deleteSoldier = (index)=>{
    
         soldiers.splice(index, 1);
         saveTolokalStorage();
         dsplaysoldirersInTable();

    }

const editSoldier = (index)=>{
    const soldier = soldiers[index];
    if(!soldier) return;
    document.getElementById('edit-full-name').value = soldier.FullName;
    document.getElementById('edit-rank').value = soldier.Rank;
    document.getElementById('edit-role').value = soldier.Role;
    document.getElementById('edit-platoon').value = soldier.Platoon;
    document.getElementById('edit-status').value = soldier.Status;
    document.getElementById('edit-mission-time').value = soldier.MissionTime || 0;

    const saveEdit = document.getElementById('saveEdit');
    const saveEditHeandlr = () =>{
       
        soldiers[index] = {
            FullName: document.getElementById('edit-full-name').value,
            Rank: document.getElementById('edit-rank').value,
            Role: document.getElementById('edit-role').value,
            Platoon: document.getElementById('edit-platoon').value,
            Status: document.getElementById('edit-status').value,
            MissionTime: document.getElementById('edit-mission-time').value
          };
          saveTolokalStorage()
        //   deleteSoldier()
          div1.style.display = 'block';
          div2.style.display = 'block';
          div3.style.display = 'block';
          tableBody.style.display = 'block';
          editSection.style.display = 'none';
          dsplaysoldirersInTable();
    }
    div1.style.display = 'none';
    div2.style.display = 'none';
    div3.style.display = 'none';
    tableBody.style.display = 'none';
    editSection.style.display = 'block';
     
    saveEdit.removeEventListener('click', saveEditHeandlr);
    saveEdit.addEventListener('click', saveEditHeandlr);
}
const startMission = (index) => {
     const soldier = soldiers[index];
     if(!soldier) return;

     const button = document.querySelector(`#soldier-table tr:nth-child(${index+1}) .Action:last-child`);

     let timeLeft = parseInt(soldier.MissionTime)
     button.textContent = `Start mission (${timeLeft} seconds)`;
     button.disabled = true;
     const interval = setInterval(() => {
        timeLeft--;
        button.textContent = `Start mission (${timeLeft} seconds)`;
        if(timeLeft < 0){
            clearInterval(interval);
            button.textContent = `mission completed`;
            button.disabled = true;
            soldier.Status = "Retired";
            saveTolokalStorage();
        }
     }, 1000);
 
}

// sortSoldiers();
const sortBtn = document.querySelector("#sortBtn");
if(sortBtn){

}
const sortSoldiers = () => {
    console.log("cdfcf");
    
    soldiers.sort((a, b) =>{
        const nameA = a.FullName.toLowerCase();
        const nameB = b.FullName.toLowerCase();
        if (nameA < nameB) return ascending? -1 : 1;
        if (nameA > nameB) return ascending? 1 : -1;
        return 0;

    })
     ascending =!ascending;
     dsplaysoldirersInTable(); 
}
// alert(sortBtn);
sortBtn.addEventListener("click",sortSoldiers); 
   
    

    
