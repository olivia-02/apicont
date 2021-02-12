document.addEventListener("DOMContentLoaded", function () {
	console.log("Loaded!");
  
	const db = firebase.firestore();
	const form = document.getElementById("form");
	const nickname = document.getElementById("nickname");
	const msg = document.getElementById("message");
	const chat = document.getElementById("chat");
  
	form.addEventListener("submit", function (event) {
	  event.preventDefault();
  
	  if (nickname.value && msg.value) {
		console.log("form submit!");
		addChat(nickname.value, msg.value);
  
		msg.value = "";
	  }
	});
  
	function deleteChat(id) {
	  db.collection("Chat")
		.doc(id)
		.delete()
		.then(function () {
		  console.log("Document successfully deleted!");
		})
		.catch(function () {
		  console.log("Error deleting document");
		});
	}
  
	function addChat(nickname, msg) {
	  db.collection("Chat")
		.add({
		  nickname,
		  msg,
		  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		.then(function (docRef) {
		  console.log("Document written with ID:", docRef.id);
		})
		.catch(function (error) {
		  console.log("Error adding document", error);
		});
	}
  
	function updateChat(id, msg) {
	  db.collection("Chat")
		.doc(id)
		.update({
		  msg,
		})
		.then(function () {
		  console.log("Document successfully updated!");
		})
		.catch(function (error) {
		  console.log("Error updating document", error.message);
		});
	}
  
	function init() {
	  db.collection("Chat").onSnapshot(function (querySnapshot) {
		chat.innerHTML = "";
  
		querySnapshot.forEach((doc) => {
		  const li = document.createElement("li");
		  li.innerHTML = doc.data().nickname + ": " + doc.data().msg + "</br>" + new Date((doc.data().timestamp.seconds)*1000.0).toLocaleString();

		  li.style = `
		  background-color: #efefef;
		  font-size: 17px;
		  padding:10px 30px;
		  margin: 10px 0;
		  line-height: 50px;
		  width:300px;
		  border-radius: 40px;
		  position:relative
		  `;
  
		  let span = document.createElement("span");
		  span.innerHTML = "&#10005;";
		  span.style = ` 
			  position: absolute;
			  right: 25px;
			  cursor:pointer
		  `;
  
		  span.addEventListener("click", () => deleteChat(doc.id));
		  li.appendChild(span);
		  chat.appendChild(li);
		});
	  });
	}
	init();
	//   deleteChat("Zu7UgpOcHMsF5rwHuZok");
	//   updateChat("Zu7UgpOcHMsF5rwHuZok", "Bye!");
  });