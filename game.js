var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started=false;

  $("h1").on("tap", function() {
    if (!started){
      $("h1").text("Level "+level);
      nextSequence();
      started=true;}
  });
  $("h1").on("click", function() {
    if (!started){
      $("h1").text("Level "+level);
      nextSequence();
      started=true;}
  });

$("div[type='button']").click(function (event) {
  if (started){
  var userChosenColour= event.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}});


function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
$("#" + currentColour). removeClass("pressed");
}, 100);
}

function checkAnswer(currentValue){
  if (gamePattern[currentValue] == userClickedPattern[currentValue]){
    if (gamePattern.length=== userClickedPattern.length){
      setTimeout(function () {
      nextSequence();
    }, 1000);}
    }
  else{
    $("h1").text(" Game Over ");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      startOver();
    },1000);
  }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

 function startOver(){
   level=0;
   gamePattern=[];
   userClickedPattern=[];
   started=false;
   $("h1").text("Click Here to Start");

 }
