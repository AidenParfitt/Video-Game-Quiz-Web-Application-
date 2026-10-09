// global is available -- see HTML file

let currentIndex;

let storedAnswer = [];

window.onload = function () {
  let titleArea = document.querySelector("#Title");
  let html = "";
  html += "<h1>" + VIDEO_GAME_QUIZ.title + "</h1>";
  html += `This quiz has ${VIDEO_GAME_QUIZ.questions.length} questions.`;
  titleArea.innerHTML = html;

  let nextButton = document
    .querySelector(".next")
    .addEventListener("click", nextQuestion);

  let prevButton = document
    .querySelector(".prev")
    .addEventListener("click", prevQuestion);

  let resultButton = document
    .querySelector(".done")
    .addEventListener("click", results);

  currentIndex = 0;
  displayQuestion(currentIndex);
};

// show the question at the specified position in the web page
function displayQuestion(position) {
  let question = VIDEO_GAME_QUIZ.questions[position];
  let Textquestions = question.questionText;
  let checkedRadio = "";
  let html = `<div class="card">
                <div class="card-header">${Textquestions}</div>
                <div class="card-body">`;
  for (let i = 0; i < question.choices.length; i++) {
    let allChoices = question.choices[i];
    //html += `<input type="radio" name="question${position}" value="${allChoices}" />`;
    if (i === storedAnswer[position]) {
      checkedRadio = `<input type='radio' name='question${position}' value='${i}' checked />`;
      html += checkedRadio;
    } else {
      checkedRadio = `<input type='radio' name='question${position}' value='${i}' />`;
      html += checkedRadio;
    }

    html += `<label>${allChoices}</label><br />`;
  }

  document.querySelector("#theCurrentQuestion").innerHTML = html;
}
// The following is for the next button that goes to the next question
function nextQuestion() {
  let nextButton = document.querySelector(".next");

  let prevButton = document.querySelector(".prev");

  let resultButton = document.querySelector(".done");

  let radio = document.querySelector(
    `input[type='radio'][name='question${currentIndex}']`,
  );
  let checkedRadio = document.querySelector(
    `input[type='radio'][name='question${currentIndex}']:checked`,
  );

  let question = VIDEO_GAME_QUIZ.questions[currentIndex];

  let options = question.choices;

  if (checkedRadio != undefined) {
    for (let i = 0; i < options.length; i++) {
      let allOptions = options[i];
      let radValues = Number(checkedRadio.value);
      if (i === radValues) {
        savedChecked(radValues);
      }
    }
  }

  if (currentIndex > VIDEO_GAME_QUIZ.questions.length - 2) {
    nextButton = nextButton.disabled = true;
    prevButton = prevButton.disabled = false;
  } else if (currentIndex <= VIDEO_GAME_QUIZ.questions.length - 2) {
    nextButton = nextButton.disabled = false;
    currentIndex++;
    displayQuestion(currentIndex);
    prevButton = prevButton.disabled = false;
  }

  if (currentIndex === VIDEO_GAME_QUIZ.questions.length - 1) {
    resultButton = resultButton.disabled = false;
  } else if (currentIndex != VIDEO_GAME_QUIZ.questions.length - 1) {
    resultButton = resultButton.disabled = true;
  }
}
// the follwing is the button that goes back to a previous question
function prevQuestion() {
  let prevButton = document.querySelector(".prev");

  let resultButton = document.querySelector(".done");

  let nextButton = document.querySelector(".next");

  let radio = document.querySelector(
    `input[type='radio'][name='question${currentIndex}']`,
  );
  let checkedRadio = document.querySelector(
    `input[type='radio'][name='question${currentIndex}']:checked`,
  );

  let question = VIDEO_GAME_QUIZ.questions[currentIndex];

  let options = question.choices;

  if (checkedRadio != undefined) {
    for (let i = 0; i < options.length; i++) {
      let allOptions = options[i];
      let radValues = Number(checkedRadio.value);
      if (i === radValues) {
        savedChecked(radValues);
      }
    }
  }
  if (currentIndex <= 0) {
    prevButton = prevButton.disabled = true;
    nextButton = nextButton.disabled = false;
  } else if (currentIndex > 0) {
    prevButton = prevButton.disabled = false;
    nextButton = nextButton.disabled = false;
    currentIndex--;
    displayQuestion(currentIndex);
  }

  if (currentIndex === VIDEO_GAME_QUIZ.questions.length - 1) {
    resultButton = resultButton.disabled = false;
  } else if (currentIndex != VIDEO_GAME_QUIZ.questions.length - 1) {
    resultButton = resultButton.disabled = true;
  }
}
// This function is used to save checked answers
function savedChecked(radiobuttonCheck) {
  let question = VIDEO_GAME_QUIZ.questions[currentIndex];

  let options = question.choices;

  let Values = Number(radiobuttonCheck);

  let radio = document.querySelectorAll(
    `input[type='radio'][name='question${currentIndex}']`,
  );
  for (let i = 0; i < options.length; i++) {
    let allOptions = options[i];

    if (i === Values) {
      storedAnswer[currentIndex] = i;
    } else {
      allOptions = radio;
    }
  }

  displayQuestion(currentIndex);

  return storedAnswer;
}
// this function is used to show the score and results of the quiz
function results() {
  let score = document.querySelector("#Score");
  let resultBody = document.querySelector("#results");
  let checkedItems = `input[type='radio'][name='question${currentIndex}']:checked`;
  let question = VIDEO_GAME_QUIZ.questions;
  let scoreHTML = "";
  let tableHTML = "";
  let scoreNum = 0;
  let questionPoints = 1;
  let correctPoint = 1;
  let incorrectPoint = 0;

  if (question.length === storedAnswer.length) {
    tableHTML += "<table>";
    tableHTML += "<tr>";
    tableHTML += "<th>" + "Questions" + "</th>";
    tableHTML += "<th>" + "Your answers" + "</th>";
    tableHTML += "<th>" + "Correct Answers" + "</th>";
    tableHTML += "<th>" + "Question Score" + "</th>";
    tableHTML += "</tr>";

    for (let i = 0; i < question.length; i++) {
      let index = question[i];
      let allSavedAnswers = storedAnswer[i];
      let choice = index.choices;
      let correctAnswer = index.answer;
      if (allSavedAnswers === correctAnswer) {
        scoreNum = scoreNum + 1;

        tableHTML += "<tr class='pass'>";
        tableHTML += "<td>" + index.questionText + "</td>";
        tableHTML += "<td>" + choice[allSavedAnswers] + "</td>";
        tableHTML += "<td>" + choice[correctAnswer] + "</td>";
        tableHTML += "<td>" + correctPoint + "/" + questionPoints + "</td>";
        tableHTML += "</tr>";
      } else {
        scoreNum = scoreNum + 0;

        tableHTML += "<tr class='fail'>";
        tableHTML += "<td>" + index.questionText + "</td>";
        tableHTML += "<td>" + choice[allSavedAnswers] + "</td>";
        tableHTML += "<td>" + choice[correctAnswer] + "</td>";
        tableHTML += "<td>" + incorrectPoint + "/" + questionPoints + "</td>";
        tableHTML += "</tr>";
      }
    }
    scoreHTML +=
      "<h1>" + "Your Score is:" + scoreNum + "/" + question.length + "</h1>";
    tableHTML += "</table>";
    score.innerHTML = scoreHTML;
    resultBody.innerHTML = tableHTML;
  } else {
    alert(
      "You have not answerd all of the questions!, please answer all of the questions!",
    );
  }
}
