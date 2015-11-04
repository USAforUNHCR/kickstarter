'user-strict'

$(document).ready(function(){
  
  var gw = new Groundwork({
    'api_url': 'https://un-api.thegroundwork.com',
    'oauth_client_id': 'pub-un.un-test--s5nLtfhyTW_yoshd7vr9fPOYz9xy6XxomJGVmtMwnLpTowm4x.eFgqe8zqbEH5dcIG1R38j6DEeW1dS7.ArjMg'

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
    tags: {
      network: inData.network,
      imgNumber: inData.imgNumber,
      send_email: 0
    }
  }
  if(inData.id !== -1){
    data.externalId = inData.id.toString();
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