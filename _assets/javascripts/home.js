'user-strict'
  var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un-test.refugee-survey-int-30wNLFqA4VCph7fWteAfRartPvyFP7XEuvE.XSI21OEpd4MFgLOqRPcGSdOTVxohT1XU18eLBVflSM2WjIHigw'
  });

  var id = {};
  var questions = {

    1: {
          q: "1.  How many U.S. mayors have officially declared their city to be a “Supportive Community” for resettled refugees?",
          answers:[ "1","10","100","1000"],
          a: 2,
          p: 40
        },
    2: {
          q: "2.  Which state housed the largest number of resettled refugees in 2013?",
          answers:["Texas","California","New York","Tennessee"],
          a: 3,
          p: 50
        },
    3: {
          q: "3.  Which state has the most cities in the “Supportive Communities” program?",
          answers:["Wisconsin","California","Michigan","Pennsylvania"],
          a: 1,
          p:30
      },
    4: {
          q: "4.  In 2014, from where did most resettled refugees flee before arriving in the U.S.?",
          answers:["Africa","Middle East","Latin America","Asia"],
          a: 2,
          p: 50
      },
    5: {
        q: "Bonus Question: If your mayor were open to making your city a “Supportive Community” for refugees, would send him / her a message supporting the decision?",
        answers: ["Yes!","Maybe","No"],
        a:0     
      },
  }


function sendData(data){
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
};



