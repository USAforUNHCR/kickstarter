'use-strict';

var introText = "Do you know which communities in the U.S. are most welcoming for refugees?";
var ansElement = {};
var qElement = {};
var subAnswer = {};
var subElement = {};
var ansCollection = [];
var subCollection = {};

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
  subAnswer = $('.sub-answer-container').detach();
  subElement = $('.sub-container').detach();
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
    var answerNum = $(event.target.closest('.answer-container')).data("ansNumber");
    nextQ(answerNum);
  });
}

function subListener(cQ){
  var subBut = $('.subContainer');
  subBut.click(event,function(){
    event.preventDefault();
    var answerNum = $(event.target.closest('.sub-answer-container')).data("ansNumber");
    subCollection[cQ] = answerNum;
    console.log(subCollection);
    closeModal();
  });
}

function closeModal(){
  $('.sub-container').remove();
  $('#overlay').css('visibility','hidden');
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
  var currQ = $('.quiz-container').data("question");
  if(questions[currQ] && questions[currQ].subQ){
    modalQ(currQ);
  }
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

function modalQ(cQ){
  $('#overlay').css('visibility','visible');
  var subQuestion = subElement.clone();
  subQuestion.find('.sub-question-text').html(questions[cQ].subQ.q);
  makeSubAnswers(subQuestion,cQ).appendTo('#overlay');
  subListener(cQ);
}

function makeSubAnswers(question,cQ){
  for(var i=0; i < questions[cQ].subQ.a.length; i++){
    answer = subAnswer.clone();
    answer.find('.sub-ans-button').html(questions[cQ].subQ.a[i]);
    answer.filter('.sub-answer-container').data('question')
    answer.appendTo(question);
    return question;
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

    for(var i=0; i< answers.length; i++){
      createAnswer(answers[i],(i+1).toString(),i+1,colors[i]);
    }
}

function endQuiz(){
  sendResults();
  var points = 0;
  for(var i=1; i < ansCollection.length; i++){
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
