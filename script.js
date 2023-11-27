const questions = [
    {
        question: "What is the capital city of Minnesota?",
        answers: [
            { Text: "Saint Paul", correct: true},
            { Text: "Minneapolis", correct: false},
            { Text: "Blaine", correct: false},
            { Text: "coonrapids", correct: false},
              
        ]
    },
    {
        question: "What is the capital city of Texas?",
        answers: [
            { Text: "Dallas", correct: false},
            { Text: "Austin", correct: true},
            { Text: "Houston", correct: false},
            { Text: "SanAntonio", correct: false},  
        ]
    }
    
        
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
var timer;
var ele = document.getElementById('timer');

(function(){
    var sec = 10;
    timer = setInterval(()=>{
        ele.innerHTML = '00:'+sec;
        sec --;
        if(sec < 0){
            clearInterval(timer);
        }
}, 1000) // each 1 second
})()

function pause(){
    clearInterval(timer);
}
startQuiz()
