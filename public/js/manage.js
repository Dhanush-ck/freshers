import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, get, remove } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

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

const content = document.querySelector('.content');

async function loadUsers() {

    const selectedDB = await get(ref(db, 'selectedUsers'))
    const usersDB = await get(ref(db, 'users'))
    
    let users = []
    
    usersDB.forEach(child => {
        users.push({id: child.key, ...child.val()})
    });
    
    const alreadySelected = selectedDB.exists()? Object.keys(selectedDB.val()): [];
    
    const filteredData = Object.values(users).filter(user => alreadySelected.includes(user.id));
    
    content.innerHTML = "";
    
    if(filteredData.length > 0) {
        filteredData.forEach(data => {
            content.innerHTML += `${data.name} - Year ${data.year} <button class="remove-button" value=${data.id}>Remove</button> <br>`
            
        })
    }
    else {
        content.innerHTML = "No selected users";
    }
}
loadUsers();

content.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-button")) {
        let id = event.target.value;
        const userRef = ref(db, 'selectedUsers/'+id)

        remove(userRef)
            .then(()=> {
                console.log(`Removed`);
            })        
            .catch((error)=> {
                console.log("Error in deleting user: ", error);
            })
    }
    loadUsers();
});