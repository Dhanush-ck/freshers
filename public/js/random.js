import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

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

const result = document.querySelector('.result');

const activeUser = document.getElementById('active-user');
const activePass = document.getElementById('active-pass');

const admin = "hjYdVYb^c";
const passwd = "dfU`XTe";

async function getRandomUser(year) {

    if(activeUser.value == convStr(admin, 11) && activePass.value == convStr(passwd, 15)){
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, 'users'));

        if(snapshot.exists()) {

            let users = [];
            snapshot.forEach(child => {
                users.push({ id: child.key, ...child.val() });
            });
    
            const selectedSnapshot = await get(ref(db, 'selectedUsers'));
            const alreadySelected = selectedSnapshot.exists()? Object.keys(selectedSnapshot.val()): [];
    
            const filteredData = Object.values(users).filter(user => user.year == year && !alreadySelected.includes(user.id));
    
            if(filteredData.length > 0) {
                result.style.display = 'flex';
                const randomUser = filteredData[Math.floor(Math.random() * filteredData.length)]
                // console.log(alreadySelected)
                setSelectedUsers(randomUser.id)
                // console.log(randomUser)
                result.innerHTML = randomUser.name;
            }
            else {
                result.innerHTML = 'No entries for this year';
            }
        }
        else { 
            result.innerHTML = 'No data found';
        }
    }
    else {
        result.style.display = 'flex';
        result.innerHTML = 'Thanks for your IP address!';
    }
    
}

async function setSelectedUsers(userID) {
    const selectedUserRef = ref(db, 'selectedUsers/'+userID);
    await set(selectedUserRef, true);
}

const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', ()=> {
    const year = document.getElementById('year').value;

    getRandomUser(year);
})

const optnButtons = document.querySelectorAll('.option');
const year = document.getElementById('year');

optnButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        if(!button.classList.contains('selected')) {
            optnButtons.forEach(button=>button.classList.remove('selected'));
            button.classList.add('selected');
            year.value = button.dataset.value;
        }
    })
})

const submit = document.querySelector('.submit');
const username = document.getElementById('username');
const password = document.getElementById('password');
const closeButton = document.querySelector('.close');

const dialogBox = document.querySelector('.popup')

submit.addEventListener('click', ()=> {
    activeUser.value = username.value;
    activePass.value = password.value;
    username.value = "";
    password.value = "";
})

closeButton.addEventListener('click', ()=> {
    dialogBox.style.display = 'none';
})

const info = document.querySelector('.info');

info.addEventListener('click', ()=> {
    dialogBox.style.display = 'grid';
})

function convStr(str, shift) {
  return str
    .split("")
    .map(ch => String.fromCharCode(ch.charCodeAt(0) + shift))
    .join("");
}