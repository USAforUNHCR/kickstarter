function geofunc(zip){
  var pols = getPols(zip);
  displayPols(pols);
}

function getPols(zip){
  var url = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + encodeURIComponent(zip) + "&key=AIzaSyB8XPwLLVLQTQAQpjJgGoTR85D_cmUDJ1s";
  var text = makeCorsRequest(url);
}


// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(url) {
  // All HTML5 Rocks properties support CORS.
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    console.log('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    displayPols(text);
    return;
  };

  xhr.onerror = function() {
    console.log('Woops, there was an error making the request.');
  };

  xhr.send();
}

function displayPols(response){
  if(response){
    var reps = JSON.parse(response);
    var offices = reps.offices;
    for(var i = 0; i < offices.length; i++){
      if(offices[i].name.toUpperCase() === "GOVERNOR"){
        var governor = (reps.officials[i+1]);
        changeSubmit(governor);
      }
    }
  }
}

function changeSubmit(governor){
  if(governor){
    $('#message-submit').html("Send your message to Governor " + governor.name + ".");
  }
}
