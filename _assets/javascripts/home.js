'user-strict'

$(document).ready(function(){
  
  var gw = new Groundwork({
    'api-url': 'https://un.dev.thegroundwork.com',
    'oauth_client_id': 'U5uNl/UrqxMob5ZQFBIsE3FW6dAogwrAYQAA+MximWKBwCnpgOB5WavsNbiyImL4+5vmq4t5F1TAKRIMVQnE0w=='

  });
  var id = getId();
  shareListener(id,gw);
});


function shareListener(id,gw){
  $('.share-social').click(function(event){
    event.preventDefault(); //BUGBUG - Remove before deploying, prevents sharing.
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
    email: "junk@junk.com",
    tags: {
      id: inData.id,
      network: inData.network,
      imgNumber: inData.imgNumber
    }
  }
  console.log(data);
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
};