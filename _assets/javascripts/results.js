'user-strict'

var resultLi = {};
storeObj = {};

var gw = new Groundwork({
  'api_url': 'https://api.thegroundwork.com',
  'oauth_client_id': 'pub-un-test.refugee-survey-int-30wNLFqA4VCph7fWteAfRartPvyFP7XEuvE.XSI21OEpd4MFgLOqRPcGSdOTVxohT1XU18eLBVflSM2WjIHigw'
});

var id = {};

$(document).ready(function(){
  submitListener();
  results();
});

function sendData(data){
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
}