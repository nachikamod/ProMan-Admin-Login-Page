function login() {
  var email = document.getElementById("admin_email").value;
  var password = document.getElementById("admin_password").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  window.alert("Error : " + errorMessage);
  // ...
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;
    var email_id = user.email;
    window.location.replace("addCompany.html");
    window.alert(" You are logged in : " + email_id);

  } else {
    //window.alert("You are not logged in");
  }
});

}

function logout(){
  firebase.auth().signOut();
  window.location.replace("index.html");
}

function register() {
  var checkUser = firebase.auth().currentUser;
  if (checkUser != null) {

    var database = firebase.database().ref().child("Company Database").push();
    var companyRef = firebase.database().ref().child("Company References");
    var companyId = document.getElementById("unique_code").value;
    var companyName = document.getElementById("company_name").value;
    var getKey = database.key;



    database.child(companyName).set("");
    companyRef.child(companyId).child("Company Name").set(companyName);
    companyRef.child(companyId).child("Company UID").set(companyId);
    companyRef.child(companyId).child("Key").set(getKey);

    companyRef.on('child_added', function(data){
      window.alert("Company added successfuly\nCompany Name: " + companyName + "\nCompany ID: " + companyId);
    });

  }
  else {
    window.location.replace("index.html");
    window.alert("You are not authorized to do changes.\nYour device may get ban if you do unauthorized access.\nIf you are authorized to do changes contact developer.");
  }
}

function gotdata(data){
  //console.log(data.val());
  var retCompanyList = data.val();
  var companyList = Object.keys(retCompanyList);
  console.log(companyList);

  for (var i = 0; i < companyList.length; i++) {
    var k = companyList[i];
    var getData = retCompanyList.getData;
    console.log(getData);
  }
}

function errData(data) {

}

function see(){
  // Initialize Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyDx2ExBSoWJqeChyE8GXyXwYIhD-rktHx8",
      authDomain: "proman-56b51.firebaseapp.com",
      databaseURL: "https://proman-56b51.firebaseio.com",
      projectId: "proman-56b51",
      storageBucket: "proman-56b51.appspot.com",
      messagingSenderId: "945680656401",
      appId: "1:945680656401:web:34df68fda632f98e"
    };
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //console.log(firebase);

    var dataRef = firebase.database();
    var retRef = dataRef.ref().child("Company Database");
    retRef.on('value', gotdata, errData);
}
