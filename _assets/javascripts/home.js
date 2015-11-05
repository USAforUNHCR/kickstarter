'user-strict'

$(document).ready(function(){
  
  var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un.refugeesurvey-int-TMo.3qerdLuxruWXl9xSk2_6Lg_TZnhg9b1roTHtmgN8.TQmBi6niAwOfLQ_xBuQBiftjYKXCKn_Od2_Uu7dNw'

  });
  var id = getId();
  shareListener(id,gw);
});


function shareListener(id,gw){
  $('.share-social').click(function(event){
    event.preventDefault();
    var imgNumber = /\d/.exec($(this).attr('class'))[0];
    var target = $(event.target);
    var network = target.attr('class');
    var data = {
      id: id,
      network: network,
      imgNumber: imgNumber
    };
    sendData(data,gw);
  });
}

function getId(){
  var id = /=(.*)/.exec(document.location.href);
  if(id){
  return id[1];
  }
  else{
    return -1
  }
}

function sendData(inData,gw){
  var data = {
    source: "refugeesurvey graphic",
    tags: {
      network: inData.network,
      imgNumber: inData.imgNumber,
      send_email: 0
    }
  }
  if(inData.id !== -1){
    data.externalId = inData.id.toString();
  }
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
};