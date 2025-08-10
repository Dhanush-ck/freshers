import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBUzclLb-x3w7gwhUI0yFjnSR9XK0qeZf4",
    authDomain: "freshers-b7154.firebaseapp.com",
    databaseURL: "https://freshers-b7154-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "freshers-b7154",
    storageBucket: "freshers-b7154.firebasestorage.app",
    messagingSenderId: "766559730907",
    appId: "1:766559730907:web:ea18f3f36cb85a3897a0fe",
    measurementId: "G-CY54P2HVGX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function getCount() {
    
    const usersDB = await get(ref(db, 'users'));
    const selectedUsersDB = await get(ref(db, 'selectedUsers'));

    let users = [];
    usersDB.forEach(child => {
        users.push({id: child.key, ...child.val()})
    });

    const alreadySelected = selectedUsersDB.exists() ? Object.keys(selectedUsersDB.val()): [];
    
    let year1Total, year2Total, year3Total, year1, year2, year3;
    
    if(users.length > 0) {
        // const data = Object.values(snapshot.val());
        // console.log(data)
        const temp1 = users.filter(user => user.year == 1);
        const temp2 = users.filter(user => user.year == 2);
        const temp3 = users.filter(user => user.year == 3);
        year1Total = temp1.length;
        year2Total = temp2.length;
        year3Total = temp3.length;
    }
    
    if(alreadySelected.length > 0) {
        year1 = users.filter(user=> user.year == 1 && alreadySelected.includes(user.id)).length;
        year2 = users.filter(user=> user.year == 2 && alreadySelected.includes(user.id)).length;
        year3 = users.filter(user=> user.year == 3 && alreadySelected.includes(user.id)).length;
    }
    
    const count = document.querySelector('.count');
    
    count.innerHTML = "<h1 class='top'>Count</h1>";
    count.innerHTML += `<div class='years'> <span> 1st Year </span> <span> ${year1}/${year1Total} </span> </div> `;
    count.innerHTML += `<div class='years'> <span> 2nd Year </span> <span> ${year2}/${year2Total} </span> </div> `;
    count.innerHTML += `<div class='years'> <span> 3rd Year </span> <span> ${year3}/${year3Total} </span> </div> `;
}

getCount();

async function getData(year) {
    const dbRef = ref(db);
    const usersDB = await get(child(dbRef, 'users'));
    if(usersDB.exists()) {
        const data = Object.values(usersDB.val());
        const filteredData = data.filter(user => user.year == year);

        const listContent = document.querySelector('.list-content');

        listContent.innerHTML = "<h1>Details</h1>";
        filteredData.forEach(child => {
            listContent.innerHTML += ` <span> ${child.name} </span> ` 
        })
    }

}

const year = document.getElementById('year');
const show = document.querySelector('.show');

show.addEventListener('click', ()=> {
    getData(year.value);
})

const optnButtons = document.querySelectorAll('.option');

optnButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        if(!button.classList.contains('selected')) {
            optnButtons.forEach(button=>button.classList.remove('selected'));
            button.classList.add('selected');
            year.value = button.dataset.value;
        }
    })
})