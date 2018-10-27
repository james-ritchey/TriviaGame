$(document).ready(function(){

    var nmbc = {
        question: "This movie follows Jack and his companion Zero.",
        answers: ["The Nightmare Before Christmas", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 20,
        correctAnswer: "The Nightmare Before Christmas",
        image: "assets/images/nmbc.gif",
    }

    var monhouse = {
        question: "Three friends investigate their spooky neighbor.",
        answers: ["The Nightmare Before Christmas", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 20,
        correctAnswer: "Monster House",
        image: "assets/images/monhouse.gif",
    }

    var bride = {
        question: "Victor ruins an arranged wedding with a woman from another world.",
        answers: ["The Nightmare Before Christmas", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 20,
        correctAnswer: "Corpse Bride",
        image: "assets/images/bride.gif",
    }

    var weenie = {
        question: "A boy goes to great lengths to bring his pal Sparky back from the dead.",
        answers: ["The Nightmare Before Christmas", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 20,
        correctAnswer: "Frankenweenie",
        image: "assets/images/weenie.gif",
    }

    var spooky = {
        question: "When her cousin Jimmy scares her to tears on Halloween, Hannah-Marie gets help from an unexpected friend.",
        answers: ["Scary Godmother", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 20,
        correctAnswer: "Scary Godmother",
        image: "assets/images/spooky.gif",
    }

    var hocus = {
        question: "On Halloween night, Max accidentally frees a coven of children eating witches.",
        answers: ["The Nightmare Before Christmas", "Monster House", "Hocus Pocus", "Corpse Bride"],
        time: 20,
        correctAnswer: "Hocus Pocus",
        image: "assets/images/hocus.gif",
    }

    var town = {
        question: "Marnie discovers she's a witch and must use her powers to save her new friends.",
        answers: ["Halloween Town", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 20,
        correctAnswer: "Halloween Town",
        image: "assets/images/town.gif",
    }

    var casper = {
        question: "A man and his daughter move into an abandoned house with four ghosts, one surprisingly friendly.",
        answers: ["Casper", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 20,
        correctAnswer: "Casper",
        image: "assets/images/casper.gif",
    }

    var mansion = {
        question: "A workaholic real estate agent takes his family on a vacation, and winds up being asked to help break a curse.",
        answers: ["The Haunted Mansion", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 20,
        correctAnswer: "The Haunted Mansion",
        image: "assets/images/mansion.gif",
    }

    var addams = {
        question: "A missing brother appears and attempts to swindle the family out of their fortune.",
        answers: ["The Addams Family", "Monster House", "Frankenweenie", "Corpse Bride"],
        time: 20,
        correctAnswer: "The Addams Family",
        image: "assets/images/addams.gif",
    }

    var gameManager = {
        questionArray: [nmbc, monhouse, bride, weenie, spooky, hocus, town, casper, mansion, addams],
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
                gameManager.setTimer();
                gameManager.questionIndex++;
                gameManager.currentQuestion = gameManager.questionArray[gameManager.questionIndex];
                gameManager.time = gameManager.currentQuestion.time;
                $("#time").text(gameManager.time);
                $("#question").text(gameManager.currentQuestion.question);
                $("#answer-list").empty();
                for(var i = 0; i < gameManager.currentQuestion.answers.length; i++) {
                    var newAnswer = $("<li>" + gameManager.currentQuestion.answers[i] + "</li>");
                    $("#answer-list").prepend(newAnswer);
                }
                $("#question-answers").css("display", "block");
                $("#guess-result").css("display", "none");
            }
        },

        endGame: function() {
            clearInterval(gameManager.intervalId);
            $("#guess-result").css("display", "none");
            $("#question-answers").css("display", "none");
            $("#score-results").css("display", "block");
            $("#score").text(gameManager.score);
            console.log("Game ovr");
        },

        restartGame: function() {
            gameManager.questionIndex = 0;
            gameManager.score = 0;
            gameManager.startGame();
            $("#question-answers").css("display", "block");
            $("#score-results").css("display", "none");

        }
    }

    $(document).on("click", "li", gameManager.checkAnswer);
    $("#retry").on("click", gameManager.restartGame);
});