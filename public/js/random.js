import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, push, set, get, child } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBUzclLb-x3w7gwhUI0yFjnSR9XK0qeZf4",
    authDomain: "freshers-b7154.firebaseapp.com",
    databaseURL: "https://freshers-b7154-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "freshers-b7154",
    storageBucket: "freshers-b7154.firebasestorage.app",
    messagingSenderId: "766559730907",
    appId: "1:766559730907:web:483353c400287fb297a0fe",
    measurementId: "G-2JFT2N8ZNK"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const result = document.querySelector('.result');

async function getRandomeUser(year) {

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
            const randomUser = filteredData[Math.floor(Math.random() * filteredData.length)]
            console.log(alreadySelected)
            setSelectedUsers(randomUser.id)
            console.log(randomUser)
            result.innerHTML = randomUser.name + '<br>';
        }
        else {
            result.innerHTML = 'No entries for this year';
        }
    }
    else { 
        result.innerHTML = 'No data found';
    }
    
}

async function setSelectedUsers(userID) {
    const selectedUserRef = ref(db, 'selectedUsers/'+userID);
    await set(selectedUserRef, true);
}

const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', ()=> {
    const year = document.getElementById('year').value;

    getRandomeUser(year);
})