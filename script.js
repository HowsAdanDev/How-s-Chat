// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get username from local storage
let username = localStorage.getItem("username");
if (!username) {
    window.location.href = "index.html"; // Redirect if username is missing
}

// Send message
function sendMessage() {
    let message = document.getElementById("message").value.trim();
    if (message === "") return;

    db.collection("messages").add({
        text: message,
        sender: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("message").value = "";
}

// Load messages in real-time
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    snapshot.forEach(doc => {
        let data = doc.data();
        let msgElement = document.createElement("p");
        msgElement.textContent = `${data.sender}: ${data.text}`;
        chatBox.appendChild(msgElement);
    });

    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
});

// Exit chat
function exitChat() {
    localStorage.removeItem("username");
    window.location.href = "index.html";
}
