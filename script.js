const soldiers = [];
const saveTolokalStorage = () => {
    localStorage.setItem("soldiers", JSON.stringify(soldiers));
}
const loadFromLocalStorag = () => {
    const savedSoldiers = JSON.parse(localStorage.getItem("soldiers"));
    if(savedSoldiers){
        soldiers.push(...savedSoldiers);
    }
}

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
    soldiers.forEach(soldier => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${soldier.FullName}</td>
            <td>${soldier.Rank}</td>
            <td>${soldier.Role}</td>
            <td>${soldier.Platoon}</td>
            <td>${soldier.Status}</td>
            <td>
            <button onclick="editSoldier(${soldier[0]})">Edit</button> 
            <button onclick="deleteSoldier(${soldier[0]})">Delete</button></td>`
               
     
        tableBody.appendChild(row);
    });
}
// const sortSoldiers = () => {
//     const btnSort = document.getElementById("Full-name");
//     btnSort.addEventListener("click",() => {
//         ascending = !ascending;
//         soldiers.sort((a, b) => {
//           if (a.fullName < b.fullName) return ascending ? -1 : 1;
//           if (a.fullName > b.fullName) return ascending ? 1 : -1;
//           return 0;
//         });
//         sortBtn.textContent = ascending ? 'Sort Descending' : 'Sort Ascending';
//     })
// }




loadFromLocalStorag();
dsplaysoldirersInTable();



