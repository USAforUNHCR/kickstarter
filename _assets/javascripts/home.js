'user-strict';

  var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un-test.refugee-survey-int-30wNLFqA4VCph7fWteAfRartPvyFP7XEuvE.XSI21OEpd4MFgLOqRPcGSdOTVxohT1XU18eLBVflSM2WjIHigw'
  });

  var id = {};
  var questions = {

    1: {
          q: "1.  How many Americans support the efforts of organizations like the UN Refugee Agency to serve people around the world who have been forced to flee their homes due to war, persecution and threats?",
          answers:[ "45%","64%","81%"],
          a: 2,
          p: 40,
        },
    2: {
          q: "2.  True or False: Most Americans agree with the statement “Illegal immigrants should be allowed to stay in the U.S. and eventually apply for citizenship.”",
          answers:["True", "False"],
          a: 1,
          p: 50,
          subQ: {
              q: "True. A majority of Americans believe illegal immigrants should be allowed to stay in the country",
              a: ["I agree. Illegal immigrants should be able to stay in the U.S.","I disagree. Illegal immigrants should be required to leave the country."]
          }
        },
    3: {
          q: "3.  How many Americans think the U.S. should take a lead role in negotiating with foreign governments to ensure that all refugees who have fled their home country find a safe place to live?",
          answers:["33%","50%","75%"],
          a: 3,
          p:30,
          subQ:{
            q: "1. Nearly three quarters of Americans support U.S. leadership in international negotiations about refugees.",
            a: ["I agree. The U.S. should take a lead role in negotiating with foreign governments to ensure that all refugees find a safe place to live."]
          }
      },
    4: {
          q: "4.  How many Americans think the U.S. should increase the amount of money budgeted to help refugees and communities in countries that are hosting a large number of refugees?",
          answers:["19%","37%","58%"],
          a: 3,
          p: 50,
          subQ: {
            q: "Nearly sixty percent of Americans believe the U.S. should provide more money and resources to communities in countries hosting large numbers of refugees.",
            a:["I agree. The U.S. should increase the budget for helping communities in countries that are hosting large numbers of refugees.","I disagree. The U.S. should not increase the budget for helping communities in countries that are hosting large numbers of refugees."]
          }
      },
    5: {
        q: "5.  True or False: Most Americans think that their community can accept some number of refugees from abroad into the community.",
        answers: ["True","False"],
        a: 1,
        p: 60,
        subQ: {
          q: "True. More than half of all Americans think their community can take in refugees.",
          a: ["I agree. My community can accept some number of refugees.","I disagree. My community should not accept any refugees."]
        }     
      },
    6: {
      q: "Bonus: Which action are you most likely to take to support refugees?",
      answers: ["Contact your Mayor", "Call your congrssional representative", "Submit a letter to the editor", "Tweet Obama and say thanks for standing up to refugees"]
    }
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



