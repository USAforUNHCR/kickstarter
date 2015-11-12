'use-strict';

var introText = "This is the intro text.";
var ansElement = {};
var qElement = {};
var ansCollection = {};
var questions = {

    1: {
          q: "Here is the first Question",
          answers:[ 
            "First Answer",
            "Second Answer",
            "Third Answer",
            "Fourth Answer"  
          ],
          a: 2
        },
    2: {
          q: "Here is the second Question",
          answers:[ 
            "First Answer",
            "Second Answer",
            "Third Answer",
            "Fourth Answer"  
          ],
          a: 3
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
  destroyQs(currQ);
}

function destroyQs(currQ){
  $('.quiz-container').children().fadeOut(500, function(){
    $('.quiz-container').children().remove();
    makeQs(currQ);
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






