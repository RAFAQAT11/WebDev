
var city = localStorage.getItem('City');
var key = localStorage.getItem('ID');

firebase.database().ref("OLX/"+city+"/").orderByKey().equalTo(key).on('child_added',(snap)=>{
    console.log(city);
    console.log(key);
    console.log(snap.val());
 var html =  ' <div class="mid">'+
              ' <div class="adBody">'+
                  ' <div class="adTitle ">'+
                   '    <h3 class="titleAd">'+snap.val().title+'</h3> '+
                   '</div>'+
                  ' <div class="adInfo adContent">'+
                   '    <div class="cityNameAd">'+
                   '         <h3 class="infor"><i class="fas fa-map-marker-alt"></i> '+snap.val().city+'</h3>'+
                   '    </div>'+
                   '    <div class="priceAd">'+
                   '         <h3 class="infor"><i class="fas fa-hand-holding-usd"></i> '+snap.val().price+' Rs</h3>'+
                   '    </div>'+
                   '    <div class="priceAd">'+
                   '         <h3 class="infor"><i class="fas fa-user-circle"></i> '+snap.val().name+' </h3>'+
                   '    </div>'+
                  ' </div>'+
                  ' <div class="photo adContent">'+
                  '      <img src="'+snap.val().photo+'" alt="" id="tipho">'+
                  ' </div>'+
                  ' <div class="discriptionAd adContent">'+
                   ' <h4 class="start">Discription</h4>  ' + 
                   ' <p class="detailed">'+
                           snap.val().description+
                    '    </p>'+
                 '  </div>'+
             '  </div>'+
           ' </div>';
           document.getElementById('cen').innerHTML+=html;
})