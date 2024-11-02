const questions = [
    { questionP1: "What is the ", bold: "574th", questionP2: "digit of pi?", answer: "7" },
    { questionP1: "What is the natural", bold: "log of 8462?", questionP2: " ", answer: "9.043340831280013" },
    { questionP1: "Enter the", bold: "SHA256", questionP2: "hash of 'edad5a2'", answer: "d3b2e313a3c282b54da40e4d420e02b899c67a5b1a0bc582da80db6111b6e2399" }
];

let checkboxWindow = document.getElementById("checkbox-window");
let checkboxBtn = document.getElementById("checkbox");
let checkboxBtnSpinner = document.getElementById("spinner");
let verifyWindow = document.getElementById("verifywin-window");
let verifyWindowArrow = document.getElementById("verifywin-window-arrow");
let verifyBtn = document.getElementById("verifywin-verify-button");

let currentQuestionIndex = Math.floor(Math.random() * questions.length);
let timeout = false;
let timer;

function startTimer() {
    timeout = false; // Reset timeout status
    let timeRemaining = 5; // Set timer for 5 seconds

    timer = setInterval(() => {
        timeRemaining -= 1;
        if (timeRemaining <= 0) {
            clearInterval(timer); // Stop the timer
            timeout = true; // Set timeout to true when time is up
        }
    }, 1000);
}

function isVerifyWindowVisible() {
    return verifyWindow.style.display !== "none" && verifyWindow.style.display !== "";
}

function loadQuestion() {
    document.getElementById("result-text").innerText = ""; // Clear result
    document.getElementById("answer-input").value = ""; // Clear input

    document.getElementById("question-P1").innerText = questions[currentQuestionIndex].questionP1;
    document.getElementById("question-bold").innerText = questions[currentQuestionIndex].bold;
    document.getElementById("question-P2").innerText = questions[currentQuestionIndex].questionP2;
}

function endQuiz(message) {
    closeVerifyWindow();
    document.getElementById("checkbox").style.border = "2px solid #ff0000"; // Set border color to red
    document.getElementById("result-text").innerText = message;
    document.getElementById("checkbox").disabled = true;
}

function verifyCaptcha() {
    clearInterval(timer); // Stop the timer when verifying

    closeVerifyWindow();
    const userAnswer = document.getElementById("answer-input").value.trim();

    if (userAnswer !== questions[currentQuestionIndex].answer) {
        endQuiz("Damm! humans are't suppose to be here ");
    } else if (timeout) {
        endQuiz("Nice try! U Did't complete it in 0.03 sec ");
    } else {
        endQuiz("Access granted!");
    }
}

function addCaptchaListeners() {
    if (checkboxBtn && verifyBtn) {
        document.addEventListener("click", function (event) {
            const path = event.composedPath();
            if (!path.includes(verifyWindow) && isVerifyWindowVisible()) {
                closeVerifyWindow();
            }
        });

        verifyBtn.addEventListener("click", function (event) {
            event.preventDefault();
            verifyBtn.disabled = true;
            verifyCaptcha();
        });

        checkboxBtn.addEventListener("click", function (event) {
            event.preventDefault();
            checkboxBtn.disabled = true;
            runClickedCheckboxEffects();
        });
    }
}

addCaptchaListeners();

function runClickedCheckboxEffects() {
    hideCaptchaCheckbox();
    setTimeout(showCaptchaLoading, 500);
    setTimeout(showVerifyWindow, 900);
}

function showCaptchaCheckbox() {
    checkboxBtn.style.width = "100%";
    checkboxBtn.style.height = "100%";
    checkboxBtn.style.borderRadius = "2px";
    checkboxBtn.style.margin = "21px 0 0 12px";
    checkboxBtn.style.opacity = "1";
}

function hideCaptchaCheckbox() {
    checkboxBtn.style.width = "4px";
    checkboxBtn.style.height = "4px";
    checkboxBtn.style.borderRadius = "50%";
    checkboxBtn.style.marginLeft = "25px";
    checkboxBtn.style.marginTop = "33px";
    checkboxBtn.style.opacity = "0";
}

function showCaptchaLoading() {
    checkboxBtnSpinner.style.visibility = "visible";
    checkboxBtnSpinner.style.opacity = "1";
}

function hideCaptchaLoading() {
    checkboxBtnSpinner.style.visibility = "hidden";
    checkboxBtnSpinner.style.opacity = "0";
}

function showVerifyWindow() {
    verifyWindow.style.display = "block";
    verifyWindow.style.visibility = "visible";
    verifyWindow.style.opacity = "1";
    verifyWindow.style.top = checkboxWindow.offsetTop - 80 + "px";
    verifyWindow.style.left = checkboxWindow.offsetLeft + 54 + "px";

    if (verifyWindow.offsetTop < 5) {
        verifyWindow.style.top = "5px";
    }

    if (verifyWindow.offsetLeft + verifyWindow.offsetWidth > window.innerWidth - 10) {
        verifyWindow.style.left = checkboxWindow.offsetLeft - 8 + "px";
    } else {
        verifyWindowArrow.style.top = checkboxWindow.offsetTop + 24 + "px";
        verifyWindowArrow.style.left = checkboxWindow.offsetLeft + 45 + "px";
        verifyWindowArrow.style.visibility = "visible";
        verifyWindowArrow.style.opacity = "1";
    }

    startTimer(); // Start the timer after the question is shown
}

function closeVerifyWindow() {
    verifyWindow.style.display = "none";
    verifyWindow.style.visibility = "hidden";
    verifyWindow.style.opacity = "0";

    verifyWindowArrow.style.visibility = "hidden";
    verifyWindowArrow.style.opacity = "0";

    showCaptchaCheckbox();
    hideCaptchaLoading();
    checkboxBtn.disabled = false;
    verifyBtn.disabled = false;
}

window.onload = loadQuestion;
