'user-strict'
  var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un.refugeesurvey-int-TMo.3qerdLuxruWXl9xSk2_6Lg_TZnhg9b1roTHtmgN8.TQmBi6niAwOfLQ_xBuQBiftjYKXCKn_Od2_Uu7dNw'
  });

function sendData(data){
  id ? data.externalId = id : null;
  data.tags.send_email = 0;
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
};



