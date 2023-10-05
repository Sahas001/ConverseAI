// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  set,
  get,
  child,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const signUp = document.getElementById("signupButton");
const login = document.getElementById("loginButton");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK49YwWDAAdthygbsPNBrzurb58mPWeEg",
  authDomain: "converse-ai-fcfd3.firebaseapp.com",
  databaseURL: "https://converse-ai-fcfd3-default-rtdb.firebaseio.com",
  projectId: "converse-ai-fcfd3",
  storageBucket: "converse-ai-fcfd3.appspot.com",
  messagingSenderId: "994019781672",
  appId: "1:994019781672:web:4d14c559554835521c191d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const user = auth.currentUser;

const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link");

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
    });
  });
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); //preventing form submit
    forms.classList.toggle("show-signup");
  });
});

signUp.addEventListener("click", (e) => {
  e.preventDefault();
  var name = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        username: name,
        email: email,
        password: password,
      });
      alert("User Created");
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});

login.addEventListener("click", (e) => {
  e.preventDefault();
  var email = document.getElementById("logEmail").value;
  var password = document.getElementById("logPassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      location.replace("home.html");
      const dt = new Date();
      update(ref(database, "users/" + user.uid), {
        lastLogin: dt,
      });

      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// get(ref(database, "users/" + user.uid)).then((snapshot) => {
//   if (snapshot.exists()) {
//     const data = snapshot.val();
//     const username = data.username;

//   }
// }).catch((error) => {
//   const errorMessage = error.message;
//   alert(errorMessage);
// });

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // location.replace("home.html");
    // ...
  } else {
    // User is signed out
    // location.replace("index.html");
    // ...
  }
});

// const logout = 0
// logout.addEventListener("click", (e) => {
//     signOut(auth).then(() => {
//         // Sign-out successful.
//         alert("User Logged Out");
//       }).catch((error) => {
//         // An error happened.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert(errorMessage);
//       });
// });
