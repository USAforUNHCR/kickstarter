'user-strict'
  var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un.refugeesurvey-int-TMo.3qerdLuxruWXl9xSk2_6Lg_TZnhg9b1roTHtmgN8.TQmBi6niAwOfLQ_xBuQBiftjYKXCKn_Od2_Uu7dNw'
  });

  var id = {};
  var questions = {

    1: {
          q: "Do you support the efforts of organizations like the UN Refugee Agency to serve people around the world who have been forced to flee their homes due to war, persecution and threats?",
          answers:[ "Yes","No","I don't know"]
        },
    2: {
          q: "<b>Do you support the following statement?</b> The US can a take lead role in negotiating with foreign governments to ensure that all refugees who have fled their home country find a safe place to live.",
          answers:["I strongly support it","I somewhat support it","I somewhat oppose it","I strongly oppose it","I don't know"]
        },
    3: {
          q: "<b>Do you support the following statement?</b> The US can increase the amount of money budgeted to help refugees and communities in countries that are hosting a large number of refugees.",
          answers:["I strongly support it","I somewhat support it","I somewhat oppose it","I strongly oppose it","I don't know"]
      },
    4: {
          q: "<b>Do you support the following statement?</b> My community can accept some number of refugees from abroad into the community.",
          answers:["I strongly support it","I somewhat support it","I somewhat oppose it","I strongly oppose it","I don't know"]
      },
    5: {
        q: "What types of group are you most strongly connected with in your community?",
        answers: ["Community group","Church group","Recreational sports league","Business/Trade association","None of the above"]
      },
    6: {
        q: "Bonus Question: Which elected official(s) can most directly impact the number of resettled refugees where you live?",
        answers: ["Mayor", "Governor", "Member of Congress", "President of the United States"]
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



