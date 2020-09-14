
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var fired = false;

// add listeners
$(document).on("keydown", function() {
  if (!fired) {
    nextSequence();
    fired = true;
  }
})

$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level);
});

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var target = $("#" + currentColour);
  target.addClass(" pressed");
  setTimeout(function() {
    target.removeClass("pressed")
  }, 70);

}

function nextSequence() {
  level++;
  $("#level-title").text("Level: " + level.toString());
  var randomNumber = Math.floor(Math.random() * 4); // a random number from 0 to 3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // flash
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    // check current answer
    if (userClickedPattern[userClickedPattern.length - 1] != gamePattern[userClickedPattern.length - 1]) {
      // gameover
      playSound("wrong");
      $("body").addClass(" game-over");
      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 200);
      startOver();
    }

    // go to the next level if needed
    if (userClickedPattern.length === currentLevel) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  fired = false;
  $("#level-title").text("Game Over, Press Any Key to Restart.");
}
