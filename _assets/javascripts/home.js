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
    event.preventDefault();
    var network = $(event.target).attr('class');
    sendData(id,network,gw);
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

function sendData(id,network,gw){
  var data = {
    source: "refugeesurvey graphic",
    email: "junk@junk.com",
    tags: {
      id: id,
      network: network
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