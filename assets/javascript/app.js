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
        image: "assets/images/monhouse.gif",
    }

    var gameManager = {
        questionArray: [nmbc, monhouse],
        currentQuestion: null,
        time: 0,
        intervalId: null,
        score: 0,
        questionIndex: 0,

        startGame: function() {
            gameManager.currentQuestion = gameManager.questionArray[gameManager.questionIndex];
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
            gameManager.intervalId = setInterval(gameManager.decrement, 1000);

        },

        decrement: function() {
            gameManager.time--;
            $("#time").text(gameManager.time);
            if(gameManager.time < 1){
                gameManager.timeOut();
            }
        },

        timeOut: function() {
            gameManager.incorrect();
        },

        checkAnswer: function() {
            if($(this).text() === "Start") {
                gameManager.startGame()
            }
            else if($(this).text() === gameManager.currentQuestion.correctAnswer) {
                gameManager.correct();
            }
            else {
                gameManager.incorrect();
            }
        },
        
        incorrect: function() {
            clearInterval(gameManager.intervalId);
            gameManager.intervalId = setInterval(gameManager.nextQuestion, 5000);
            $("#result").text("Sorry, the correct answer was " + gameManager.currentQuestion.correctAnswer + "!");
            $("#movie-img").attr("src", gameManager.currentQuestion.image);
            $("#question-answers").css("display", "none");
            $("#guess-result").css("display", "block");
        },

        correct: function() {
            clearInterval(gameManager.intervalId);
            gameManager.score++;
            gameManager.intervalId = setInterval(gameManager.nextQuestion, 3000);
            $("#result").text("Correct!");
            $("#movie-img").attr("src", gameManager.currentQuestion.image);
            $("#question-answers").css("display", "none");
            $("#guess-result").css("display", "block");
        },

        nextQuestion: function() {
            if(gameManager.questionIndex >= gameManager.questionArray.length - 1) {
                gameManager.endGame();
            }
            else {
                gameManager.questionIndex++;
            }
            gameManager.currentQuestion = gameManager.questionArray[gameManager.questionIndex];
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
        },

        endGame: function() {
            console.log("Game ovr");
        }
    }

    $(document).on("click", "li", gameManager.checkAnswer);

});