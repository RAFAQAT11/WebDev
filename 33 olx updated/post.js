
var url; 
var photo = document.getElementById('up');

photo.addEventListener("change",(e)=>{
  var file = e.target.files[0];
  var task = firebase.storage().ref('test/'+file.name).put(file);
  task.on('state_changed',
  function progress(snap){
    var per = (snap.bytesTransferred/snap.totalBytes)*100;
    document.getElementById('prog').value=per;
    if(per==100){
      firebase.storage().ref('test/'+file.name).getDownloadURL().then((URL)=>{
        url=URL;
        console.log(URL);
      })
    }
  }
)
})





var submit = document.getElementById('submit-ad');

submit.addEventListener('click',()=>{
  var title = document.getElementById('title-ad');
var category = document.getElementById('select-ad');
var price = document.getElementById('price-ad');
var textarea = document.getElementById('textarea-ad');
var name = document.getElementById('name-ad');
var phoneNo = document.getElementById('phoneNo-ad');
var city = document.getElementById('city-ad');

var obj={
    title:title.value,
    category:category.value,
    price:price.value,
    description:textarea.value,
    photo: url,
    name:name.value,
    phoneNo:phoneNo,
    city:city.value
  }
  var newRef = firebase.database().ref('OLX/'+city.value).push();
  var key = newRef.key;
  var updateData={};
  updateData['OLX/'+city.value+'/'+key]=obj;
  updateData['OLX/All cities/'+key]=obj;
  firebase.database().ref().update(updateData,(error)=>console.log(error));

  console.log(obj);
  console.log(updateData);

})