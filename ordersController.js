// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { doc, deleteDoc, getDocs, setDoc, getFirestore, collection, Timestamp, addDoc, orderBy, query } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js"
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

var docRef = collection(fs, "orders");
const q = query(docRef, orderBy("timestamp"));
const snapshot = await getDocs(q);

snapshot.docs.forEach(Doc => {
    console.log(Doc.id);
    console.log(Doc.data());

    let container = document.getElementById("ordersContainer");

    let orderItem = document.createElement("div");
    orderItem.setAttribute("class", "menuItem");

    orderItem.appendChild(document.createElement("hr"));

    let tableNo = document.createElement("h3");
    tableNo.innerHTML = "Table " + Doc.data().table;
    orderItem.appendChild(tableNo);
    orderItem.appendChild(document.createElement("br"));


    let orderDetails = Doc.data().order;
    orderDetails.forEach(element => {
        let item = document.createElement("p");
        item.innerHTML = element;
        orderItem.appendChild(item);
    })

    let orderDate = document.createElement("p");
    let bold = document.createElement("b");
    bold.innerHTML = "Order Received At: " + Doc.data().receivedAt;
    orderDate.appendChild(bold);
    orderItem.appendChild(orderDate);

    let button = document.createElement("button");
    button.setAttribute("class", "orderbtn");
    button.setAttribute("id", "" + Doc.id);
    let buttontxt = document.createElement("b");
    buttontxt.innerHTML = "order done";
    button.appendChild(buttontxt);
    button.addEventListener("click", () => {
        const ref = doc(fs, "orders", button.id);
        deleteDoc(ref)
            .then(() => {
                alert("Order Removed");
                button.parentElement.remove();
            })
            .catch(error => {
                console.log(error);
            })
    });
    orderItem.appendChild(button);

    orderItem.appendChild(document.createElement("hr"));
    container.appendChild(orderItem);
});