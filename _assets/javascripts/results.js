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

function results(){
  resultLi = $('.result-list').detach();
  storeObj = JSON.parse(localStorage.getItem('refugeeQuiz'));
  var answers = storeObj.answers;
  var points = storeObj.points;
  var id = storeObj.id;
  showPoints(points);
  showAnswers(answers);
}

function showPoints(points){
  pointsEl= $('.points-heading');
  pointsEl.html('You scored ' + points + ' points');
}

function showAnswers(answers){
 for( i=1; i < (answers.length -1); i++ ){
  resultNew = resultLi.clone();
  resultNew.find('.question').html(questions[i].q);
  resultNew.find('.your-answer').html("You Answered: " + questions[i].answers[answers[i]-1]);
  var correctAnswer = resultNew.find('.correct-answer');
  correctAnswer.html(createText(i));
  correctAnswer.css(addColor(i));

  resultNew.find('.local-answer').html(addPoll(i));
  resultNew.appendTo('.results');}
 }

 function createText(i){
  return 'The correct answer was ' + questions[i].answers[(questions[i].a)-1];
 }

 function addColor(i){
  var color = '';
  storeObj.answers[i] === questions[i].a ? color = 'green' : color = 'red';
  return {'background-color' : color};
 }

 function addPoll(i){
  return questions[i].p + '% of people in your area got this question correct.'
 }

function submitListener(){
  $('.zip').on('submit', function(event){
    event.preventDefault();
    var id = storeObj.id;
    var zip = $('input[name=zip').val();
    showPollData();
  });
}

function showPollData(){
  $('.local-answer').show();
}