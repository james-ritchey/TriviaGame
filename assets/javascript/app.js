$(document).ready(function(){

    var nmbc = {
        question: "This movie follows Jack and his companion Zero.",
        answers: ["The Nightmare Before Christmas", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 30,
        correctAnswer: "The Nightmare Before Christmas",
        image: "assets/images/nmbc.gif",
    }

    var monhouse = {
        question: "Three friends investigate their spooky neighbor.",
        answers: ["The Nightmare Before Christmas", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 30,
        correctAnswer: "Monster House",
        image: "assets/images/nmbc.gif",
    }

    var gameManager = {
        questionArray: [nmbc, monhouse],
        currentQuestion: null,
        time: 0,
        intervalId: null,

        startGame: function() {
            gameManager.currentQuestion = gameManager.questionArray[0];
            gameManager.time = gameManager.currentQuestion.time;
            $("#time").text(gameManager.time);
            $("#question").text(gameManager.currentQuestion.question);
            $("#answer-list").empty();
            for(var i = 0; i < gameManager.currentQuestion.answers.length; i++) {
                var newAnswer = $("<li>" + gameManager.currentQuestion.answers[i] + "</li>");
                $("#answer-list").prepend(newAnswer);
            }
            gameManager.setTimer();
        },

        setTimer: function() {
            clearInterval(gameManager.intervalId);
            gameManager.intervalId = setInterval(gameManager.decrement(), 1000);
        },

        decrement: function() {
            gameManager.time--;
            $("#time").text(gameManager.time + "");
            if(gameManager.time <= 0) {gameManager.timeOut();}
        },

        timeOut: function() {
            clearInterval(gameManager.intervalId);
            gameManager.incorrect();
        },

        checkAnswer: function() {
            if($(this).text() === gameManager.currentQuestion.correctAnswer) {
                gameManager.correct();
            }
            else {
                gameManager.incorrect();
            }
        },
        
        incorrect: function() {
            clearInterval(gameManager.intervalId);
            console.log("wrong boi");
        },

        correct: function() {
            clearInterval(gameManager.intervalId);
            gameManager.intervalId = setInterval(gameManager.nextQuestion, 3000);
            $("#result").text("Correct!");
            $("#movie-img").attr("src", gameManager.currentQuestion.image);
            $("#question-answers").css("display", "none");
            $("#guess-result").css("display", "block");
        },

        nextQuestion: function() {
            gameManager.currentQuestion = gameManager.questionArray[1];
            gameManager.time = gameManager.currentQuestion.time;
            $("#time").text(gameManager.time);
            $("#question").text(gameManager.currentQuestion.question);
            $("#answer-list").empty();
            for(var i = 0; i < gameManager.currentQuestion.answers.length; i++) {
                var newAnswer = $("<li>" + gameManager.currentQuestion.answers[i] + "</li>");
                $("#answer-list").prepend(newAnswer);
            }
            gameManager.setTimer();
            $("#question-answers").css("display", "block");
            $("#guess-result").css("display", "none");
        }
    }

    gameManager.startGame();

    $(document).on("click", "li", gameManager.checkAnswer);

});