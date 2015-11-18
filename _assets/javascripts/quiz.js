'use-strict';

var introText = "Make your voice heard. Share your thoughts in our poll below so that we can send a clear message that the U.S. must continue to support and welcome refugees.";
var ansElement = {};
var qElement = {};
var formEl = {};
var ansCollection = [];


$(document).ready(function(){
  id = getId();
  quiz();
});

function getId(){
  var id = /=(.*)/.exec(document.location.href);
  if(id){
  return id[1];
  }
  else{
    return null;
  }
}

var colors = ["blue","red","orange","green","purple"]

function quiz(){
  ansElement = $('.answer-container').detach();
  qElement = $('.question-text').clone();
  formEl = $('.zip-form').detach();
  $('.quiz-container').data({question: 0});
  buttonListener();
  formListener();
  quizInit(introText);
}

function quizInit(){
  var introAnswer ="Click here to take the poll.";
  $('.question-text').html(introText);
  var label="1";
  createAnswer(introAnswer,label,1);
}

function buttonListener(){
  var quizCont = $('.quiz-container');
  quizCont.click(event,function(){
    event.preventDefault();
    answerNum = $(event.target.closest('.answer-container')).data("ansNumber");
    nextQ(answerNum);
  });
}

function formListener(){
  $('.quiz-container').submit(event,function(event){
      event.preventDefault();
      var zip = $('.quiz-container').find('#zip').val();
      sendForm(zip);
    });
}

function createAnswer(text,label,data,color){
  var newAns = $(ansElement).clone();
  newAns.find('.answer').html(text);
  newAns.find('.ans-button').html(label);
  if(color){
    newAns.find('.ans-button').css("background-color", color);
    newAns.filter('.answer-container').css("border" ,"3px solid " + color);
  }
  container = newAns.filter('.answer-container');
  container.data("ansNumber",data);
  $('.quiz-container').append(newAns);
}

function nextQ(answerNum){
  currQ = $('.quiz-container').data("question");
  ansCollection[currQ] = answerNum;
  $('.quiz-container').data("question",currQ += 1);
  if(currQ <= 5){
    destroyQs(currQ,makeQs);
  }
  else{
    destroyQs(6,endQuiz);
    
  }
}

function destroyQs(currQ,callback){
  $('.quiz-container').children().fadeOut(500, function(){
  });
  $('.quiz-container').promise().done(function(){
    $('.quiz-container').children().remove();
    if( callback ){
      callback(currQ);
    }
  });
}
  
function makeQs(currQ){
    var container = $('.quiz-container');
    var question = qElement.clone();
    question.filter('.question-text').html(questions[currQ].q);
    question.hide().appendTo(container).fadeIn(500);

    var answers = questions[currQ].answers;

    for(i=0; i< answers.length; i++){
      createAnswer(answers[i],(i+1).toString(),i+1,colors[i]);
    }
}

function endQuiz(){
  sendResults();
  showForm();
}

function showForm(){
  $('.quiz-container').off('click');
  formEl.appendTo('.quiz-container');
}

function sendResults(){
  var data = {
    source: 'refugeesurvey Quiz',
    tags:{
      answers: ansCollection.slice(1).toString(),
      send_email: 0
    }
  }
  id ? data.externalId = id : null;
  sendData(data);
}

function sendForm(zip){
  var data = {
    source: 'refugeesurvey zip',
    tags:{
      zip: zip,
      send_email: 0
    }
  }
  id ? data.externalId = id : null;
  sendData(data);
  $('.zip-submit').prop("disabled",true);
  $('#zip').val('Thanks!');
  $('#zip').prop("disabled",true);
}

function storeLocal(points){
  var dataStore = {
    answers: ansCollection,
    points: points,
  }
  id ? dataStore.id = id : null;
  console.log(dataStore);
  localStorage.setItem('refugeeQuiz', JSON.stringify(dataStore));
}

