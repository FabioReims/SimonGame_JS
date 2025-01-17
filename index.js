var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).ready(function () {
    $(document).keypress(function () {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });

    $(".btn").click(function () {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        console.log("User Pattern: ", userClickedPattern);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });

    function nextSequence() {
        userClickedPattern = [];
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];

        level++;
        $("#level-title").text("Level " + level);

        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

        console.log("Game Pattern: ", gamePattern);

        playSound(randomChosenColor);
    }

    function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            console.log("success");

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(nextSequence, 1000);
            }
        } else {
            console.log("wrong");

            $("#level-title").text("Game Over, Press Any Key to Restart");
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
    }

    function playSound(color) {
        var audio = new Audio("sounds/" + color + ".mp3");
        audio.play();
        console.log("Attempting to play sound at: ", audio);
    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
});