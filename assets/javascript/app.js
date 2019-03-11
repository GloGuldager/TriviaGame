
//variable to hold array of question objects
var triviaQuestions = [
    {
        question: "Who defeated tennis player Bobby Riggs in the famous 'Battle of the Sexes'?",
        choices: {
            a: "  Margaret Court",
            b: "  Billie Jean King",
            c: "  Chris Evert-Lloyd",
            d: "  Martina Navratilova",
        },
        correctAnswer: "b"
    },
    {
        question: "Who did John McEnroe defeat in the final to win his first Wimbledon singles title?",
        choices: {
            a: "  Jimmy Connors",
            b: "  Bjorn Borg",
            c: "  Chris Lewis",
            d: "  Kevin Curren",
        },
        correctAnswer: "b"
    },
    {
        question: "What year was tennis originally introduced as an Olympic sport?",
        choices: {
            a: "  1896",
            b: "  1924",
            c: "  1968",
            d: "  1988",
        },
        correctAnswer: "a"
    },
    {
        question: "What is the name for the left side of the tennis court for each player?",
        choices: {
            a: "  Ad Court",
            b: "  Od Court",
            c: "  Deuce Court",
            d: "  Base Court",
        },
        correctAnswer: "a"
    }
];
//put entire game in function
(function () {
    //assign variables to divs for game components
    var triviaContainer = document.getElementById("questions");
    var tallyContainer = document.getElementById("tally");

    // Define how much time to put on timer
    var countdownNumber = 20;
    //  Variable to hold Timer once user hits Start
    var startTimerId;
    var clockRunning = false;

    //  Function to run countdown Timer
    // use with start game click event to start clock, reveal questions
    function runClock() {
        countdownNumber = 20;
        if (!clockRunning) {
            clearInterval(startTimerId);
            startTimerId = setInterval(countDown, 1000);
            clockRunning = true;
        }
    }
    //functon for stopping the clock
    function stopClock() {
        clearInterval(startTimerId);
        clockRunning = false;
    }
    //function when time runs out      
    function timesUp() {
        clearInterval(startTimerId);
        countdownNumber = 20;
        alert("Time Up!");
    }

    //function for when user selects to Try Again
    function tryAgain() {
        clearInterval(startTimerId);
        countdownNumber = 20;
        document.getElementById('tally').style.display = "none";
    
    }

    //  Count down function decreasing by 1 each second and write to html
    function countDown() {
        countdownNumber--;
        $("#time-remaining").text("Time Remaining: " + countdownNumber);

        //  Alert player when time is up by running timesUp function...
        if (countdownNumber === 0) {
            tallyResults();
            timesUp();
            //can I write this to DOM instead with Div?
        }
    }

    function displayQuestions() {
        // store questions in array
        var questionArray = [];

        // for each question...using forEach with for...in method
        triviaQuestions.forEach(
            (currentQuestion, questionLetter) => {
                // variable to hold the user choices to compare
                var choices = [];

                // and for each available answer...
                for (letter in currentQuestion.choices) {
                    // ...add a radio button for user to select
                    choices.push(
                        `<label>
          <input type="radio" name="question${questionLetter}" value="${letter}">
          ${letter} :
          ${currentQuestion.choices[letter]}
        </label>`
                    );
                }

                // add this question and its choices to the questionArray
                questionArray.push(
                    `<div class="question"> ${currentQuestion.question} </div>
      <div class="choices"> ${choices.join("")} </div>`
                );
            });

        // place questionArray on the DOM
        questions.innerHTML = questionArray.join("");
        //reveal finish or exit button
        document.getElementById("submit").style.display = "block";
    }

    //function to gather user choices and tally results
    function tallyResults() {
        document.getElementById('tally').style.display = "block";

        // save user choices in variable answers
        var answers = triviaContainer.querySelectorAll(".choices");

        // tally number correct
        var numCorrect = 0;

        // forEach loop to find what selections user made and send values to .choices via answers variable
        triviaQuestions
            .forEach((currentQuestion, questionLetter) => {

                // find selected answer
                var answerContainer = answers[questionLetter];
                var selector = 'input[name=question' + questionLetter + ']:checked';
                var userSelection = (answerContainer.querySelector(selector) || {}).value;

                // if answer is correct
                if (userSelection === currentQuestion.correctAnswer) {
                    // add to tally of correct choices
                    numCorrect++;

                    // color correct answers background color green to match tennis image
                    answers[questionLetter].prepend("CORRECT!");
                    answers[questionLetter].style.background = "#8ed416";
                }
                // if answer is wrong or blank
                else {
                    // color incorrect or skipped answers fuchsia
                    answers[questionLetter].prepend("SORRY, INCORRECT");
                    answers[questionLetter].style.color = "#8f0f60";
                }
            });

        // show number of correct choices out of total
        tallyContainer.innerHTML = "You got " + numCorrect + " out of " + triviaQuestions.length + " correct!";
        //reveal "try again" button
        document.getElementById("reset").style.display = "block";
    }

    // display quiz when start button is pressed
    $("#startGame").on("click", runClock);
    $("#startGame").on("click", displayQuestions);
    $("#startGame").on("click", function () {
        $(this).hide(); // disappear the button after first click
        $("#toggle").slideToggle();
    });

    // on submit, show results
    $("#submit").on("click", tallyResults);
    $("#submit").on('click', function () {
        stopClock();
        $(this).hide(); // disappear the button after first click
        $('#toggle').slideToggle();

    });

    //when user hits "Try Again" start game again
    $("#reset").on("click", tryAgain);
    $("#reset").on("click", runClock);
    $("#reset").on("click", displayQuestions);
    $("#reset").on("click", function () {
        $(this).hide(); // disappear the button after first click
        $("#toggle").slideToggle();

    });


})();