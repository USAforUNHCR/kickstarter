'use-strict';

var introText = "Do you know which communities in the U.S. are most welcoming for refugees?";
var ansElement = {};
var qElement = {};
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
  $('.quiz-container').data({question: 0});
  buttonListener();
  quizInit(introText);
}

function quizInit(){
  var introAnswer ="Click here to begin the quiz.";
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
    destroyQs();
    endQuiz();
  }
}

function destroyQs(currQ,callback){
  $('.quiz-container').children().fadeOut(500, function(){
    $('.quiz-container').children().remove();
    if(callback){
      callback(currQ)
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
  var points = 0;
  for(i=1; i < ansCollection.length; i++){
    if( ansCollection[i] === questions[i].a ){
      points += 1;
    }
  }
  storeLocal(points);
  window.location.href = "/results"
}

function sendResults(){
  data = {
    source: 'refugeesurvey Quiz',
    tags:{
      answers: ansCollection,
      send_email: 0
    }
  }
  id ? data.externalId = id : null;
  sendData(data);
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

