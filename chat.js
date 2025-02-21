firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Check if user is logged in
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
    }
});

// Send message
function sendMessage() {
    let message = document.getElementById("message").value;
    if (message.trim() === "") return;

    db.collection("messages").add({
        text: message,
        sender: auth.currentUser.email,
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
});

// Logout
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}