

function addFav(id) {
    var uid = firebase.auth().currentUser.uid;
    if(document.getElementById(id).classList.contains("red")){
        document.getElementById(id).classList.remove("red");
        var updateData={};
    updateData["user/"+uid+"/favourite/"+id]=null;
    updateData["OLX/All cities/"+id+"/favourite/"]=null;
    firebase.database().ref("OLX/All cities/").orderByKey().equalTo(id).on('child_added',(data)=>{
        updateData["OLX/"+data.val().city+"/"+id+"/favourite/"]=null; 
        firebase.database().ref().update(updateData,(error)=>console.log(error));
    })


    }
    else{
    console.log(id)
    var updateData={};
    updateData["user/"+uid+"/favourite/"+id]=true;
    updateData["OLX/All cities/"+id+"/favourite/"+uid]=true;
    firebase.database().ref("OLX/All cities/").orderByKey().equalTo(id).on('child_added',(data)=>{
        console.log("dttaatta "+data.val().city)
        updateData["OLX/"+data.val().city+"/"+id+"/favourite/"+uid]=true; 
        firebase.database().ref().update(updateData,(error)=>console.log(error));
    })
    document.getElementById(id).classList.toggle("red");
    }
}


document.getElementById("titi").innerHTML = localStorage.getItem("Search");

var search = localStorage.getItem("Search");
var city = localStorage.getItem("City");


    firebase.database().ref('OLX/'+city).orderByChild('category').startAt(search).endAt(search).on('child_added',(data)=>{
        console.log(data.val().category);
        Update(data);
      })

  function Update(data){
      var red="";
      firebase.database().ref("OLX/"+localStorage.getItem("City")+"/"+data.key+"/favourite/").on('child_added',data=>{
        if(data.val()==true){
          console.log(data.val());
          red=" red";
        }
    });
        var html = '<li id="">'+
        '<div class="ad-card">'+
            '<div class="card-image">'+
                '<img src="'+data.val().photo+'" class="adiphoto">'+
            '</div>'+
            '<div class="card-content">'+
                '<div class="favourite" onclick="addFav('+"'"+data.key+"'"+');">'+
                    '<input id="" type="checkbox" />'+
                    '<label for="">'+
                        '<i id="'+data.key+'" class="fas fa-heart '+red+'"></i>'+
                    '</label>'+
                '</div>'+
                '<h3 class="title">'+data.val().description+'</h3>'+
                '<small class="cat">&gt;&gt;Cars</small>'+
                '<div class="price">Rs.'+
                    '<span class="digits">'+data.val().price+'</span>'+
                '</div>'+
            '</div>'+
        '</div> '+
      '</li>';
      document.getElementById('ulist').innerHTML=document.getElementById('ulist').innerHTML+html;
          
  }

  function setID(id){
      localStorage.setItem('ID',id);
  }