// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { doc, getDocs, setDoc, getFirestore, collection, Timestamp, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7WJXKnU_BjfmGs0Qw6PkZICcHQNK_jYA",
    authDomain: "mama-80c30.firebaseapp.com",
    projectId: "mama-80c30",
    storageBucket: "mama-80c30.appspot.com",
    messagingSenderId: "1078594718626",
    appId: "1:1078594718626:web:e79ec79f6daabc9d1500fb",
    measurementId: "G-QCSFTJR8TR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var orders = [];
function addToOrder(name) {
    orders.push(name);
    console.log(orders);
}

function createOrderItemDiv(btn) {
    let item = document.createElement("div");
    item.setAttribute("class", "orderItem");

    let itemLabel = document.createElement("div");
    itemLabel.setAttribute("class", "itemLabel");
    itemLabel.innerHTML = "1 " + btn.id;

    let iconScript = document.createElement("script");
    iconScript.setAttribute("src", "https://cdn.lordicon.com/ritcuqlt.js");

    let icon = document.createElement("lord-icon");
    icon.setAttribute("class", "removebtn");
    icon.setAttribute("src", "https://cdn.lordicon.com/kfzfxczd.json");
    icon.setAttribute("trigger", "click");
    icon.setAttribute("colors", "primary:#e4d2b2");

    document.getElementById("ordersContainer").appendChild(item);
    item.appendChild(itemLabel);
    item.appendChild(iconScript);
    item.appendChild(icon);
}

const btns = document.querySelectorAll("button");
btns.forEach(btn => {
    if (btn.id != "confirmbtn")
        btn.addEventListener("click", () => {
            let skip = false;
            let found = false;
            addToOrder(btn.id);
            let allItemLabels = document.querySelectorAll(".itemLabel");
            if (allItemLabels.length > 0) {
                allItemLabels.forEach(label => {
                    if (skip) {
                        return;
                    }
                    let splittedLabel = label.innerHTML.split(' ');
                    if (splittedLabel[1] == btn.id) {
                        found = true;
                        let count = parseInt(splittedLabel[0]);
                        count++;
                        label.innerHTML = count + ' ' + splittedLabel[1];
                        skip = true;
                        return;
                    }
                });
                if (found == false) {
                    createOrderItemDiv(btn);
                }
            }
            else {
                createOrderItemDiv(btn);
            }
        });
});