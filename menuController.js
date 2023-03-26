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
const fs = getFirestore(app);


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
    icon.setAttribute("id", "remove" + btn.id);
    icon.addEventListener("click", () => {
        let label = icon.parentElement.firstChild.innerHTML.split(' ');
        let count = parseInt(label[0]);
        if (count > 1) {
            count--;
            icon.parentElement.firstChild.innerHTML = count + " " + label[1];
        }
        else {
            icon.parentElement.remove();
        }
        alert("Item Removed");
    })

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
            alert("Item Added");
        });
});
var order = [];
const confirmbtn = document.getElementById("confirmbtn");
confirmbtn.addEventListener("click", () => {
    const orderItems = document.querySelectorAll(".itemLabel");
    orderItems.forEach(orderItem => {
        order.push(orderItem.innerHTML);
    });
    console.log(order);
    const date = new Date();
    let minute = date.getMinutes();
    let hour = date.getHours();
    let currentTime = `${hour}:${minute}`;
    const docData = {
        table: 1,
        order: order,
        receivedAt: currentTime
    };
    var docRef = doc(collection(fs, "orders"));
    setDoc(docRef, docData).then(() => {
        alert("Order Confirmed!");
        location.reload();

    })
        .catch((error) => {
            // The write failed...
            alert(error);
        });
});
