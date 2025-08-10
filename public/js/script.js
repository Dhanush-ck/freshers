import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, push, set, get, orderByChild, equalTo, query } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

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

const submitButton = document.getElementById('submit-button');

const optnButtons = document.querySelectorAll('.option');
const year = document.getElementById('year');

const errorMessage = document.querySelector('.error');

function addUser(name, year) {
    const userRef = ref(db, 'users');
    const newUserRef = push(userRef);

    get(query(userRef, orderByChild("name"), equalTo(name)))
    .then((snapshot)=> {
        if(snapshot.exists()) {
            errorMessage.innerHTML = "This name already exists";
            messagePopup();
        }
        else {
            set(newUserRef, {
                name: name,
                year: year
            }).then(() => {
                console.log("User added successfully!");
                errorMessage.innerHTML = "Details Submitted Successfully"
                let username = document.getElementById('username');
                username.value = "";
                messagePopup();
            }).catch((error) => {
                console.error("Error adding user: ", error);
            });
        }
    })
    

}

submitButton.addEventListener('click', ()=> {
    const username = document.getElementById('username').value;
    const year = document.getElementById('year').value;
    // console.log(username);
    // console.log(year);
    if(username == ""){
        errorMessage.innerHTML = "Name can't be blank";
        messagePopup();
    }
    else{
        addUser(username, year);
    }
})

function messagePopup() {
    if(errorMessage.classList.contains('fadeOut')){
        errorMessage.classList.remove('fadeOut');
    }
    errorMessage.classList.add('fadeIn');
    setTimeout(() => {
        errorMessage.classList.remove('fadeIn');
        errorMessage.classList.add('fadeOut');
    }, 3000);
}

optnButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        if(!button.classList.contains('selected')) {
            optnButtons.forEach(button=>button.classList.remove('selected'));
            button.classList.add('selected');
            year.value = button.dataset.value;
            // console.log(button.dataset.value)
            // console.log(year.value);
        }
    })
})