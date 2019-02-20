

function SetData(search){
    localStorage.setItem("Search", search);
    localStorage.setItem("City", 'All cities');
}
function SetCity(city){
  localStorage.setItem("City", city);
}

document.querySelector('.search-ad').addEventListener('click',()=>{
  localStorage.setItem("City", document.querySelector('.location-ad').value);
  localStorage.setItem("Search", document.querySelector('.search-bar-ad').value);
  window.location.href="ads.html";
})

// document.querySelector('.link-adad').addEventListener('click',()=>{
//   localStorage.setItem("City", 'All cities');
// })

var provider = new firebase.auth.GoogleAuthProvider();

 document.getElementById('ggl').addEventListener("click",()=>{
   console.log("working");
   firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    var obj={
      displayName:result.user.displayName,
      email:result.user.email,
      profilePic:result.user.photoURL
    }
    firebase.database().ref("user/"+result.user.uid).set(obj);
    console.log(result);
    console.log(obj);

    // The signed-in user info.
    var user = result.user;
    console.log(user);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(" code = "+error.code, " message "+error.message);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
 })

 document.getElementById('signOut').addEventListener('click',()=>{
   firebase.auth().signOut().then(function() {
     // Sign-out successful.
     console.log("signout");
   }).catch(function(error) {
     // An error happened.
     console.log("error");
     
   });

 });

