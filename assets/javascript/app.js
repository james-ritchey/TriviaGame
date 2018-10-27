$(document).ready(function(){

    var nmbc = {
        question: "test",
        answers: ["one", "dos", "tri"],
        time: 30,
        correctAnswer: "dos",
        image: "nmbc.gif",
    }

    var gameManager = {
        questionArray: [nmbc],
        currentQuestion: null,

        startGame: function() {
            this.currentQuestion = this.questionArray[0];
            $("#time").text(this.currentQuestion.time);
            $("#question").text(this.currentQuestion.question);
            $("#answer-list").empty();
            for(var i = 0; i < this.currentQuestion.answers.length; i++) {
                var newAnswer = $("<li>" + this.currentQuestion.answers[i] + "</li>");
                $("#answer-list").prepend(newAnswer);
            }
        },

        setTimer: function() {

        }
    }

    gameManager.startGame();

});