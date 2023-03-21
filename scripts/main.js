// Llamada a los elementos del DOM para dar funcionalidades.

// --> Botones
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const homeButton = document.getElementById("home-btn")
const clearBtn = document.getElementById("clear-btn")
const answerButtonsElement = document.getElementById("answer-buttons");
const resultButton = document.getElementById("results-btn")

// --> Containers
const questionContainerElement = document.getElementById("question-container");
const cardQuiz = document.getElementById("quizSport")
const scoreCard = document.getElementById("card-score")
const containerAverage = document.getElementById("average-container")
const chartDiv = document.getElementById("chart-div")

// --> Elementos individuales
const yourScore = document.getElementById("your-score")
const cardTitle = document.getElementById("card-title")
const textScore = document.getElementById("text-score")
const average = document.getElementById("average-title")
const questionElement = document.getElementById("question");
const averageText = document.getElementById("average-text")
const ctx = document.getElementById("myChart")


// Enlace de la API almacenada en una variable
const API_URL = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"

// Variables globales
const datosQuiz = []
let currentQuestionIndex; 
let countCorrect = 0;
let answerFalse = []
let answerTrue = []

// LLamada a la API mediante axios + Datos en array datosQuiz
axios.get(API_URL)
    .then(res => {
        const datos = res.data.results
        for (let i = 0; i < datos.length; i++) {
        datosQuiz.push(datos[i]);
        }
    })
    .catch(err=> console.error(err))
            
// Funcion para empezar el quiz al darle al boton
function startGame() {
    cardQuiz.classList.add("hide");
    scoreCard.classList.add("hide");
    containerAverage.classList.add("hide");
    questionContainerElement.classList.remove("hide");
    currentQuestionIndex = 0;
    countCorrect = 0
    setNextQuestion()  
}

// Funcion mostrar siguiente pregunta + Recibe showQuestion() & resetState()
function setNextQuestion() {
    resetState();
    showQuestion(datosQuiz[currentQuestionIndex]);
}

// Funcion para mostrar las questiones random 
function showQuestion(question) {  
    questionElement.innerHTML = question.question
    const answers = [...question.incorrect_answers, question.correct_answer]
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    
    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.id = "answerButton"
        button.innerHTML = answer;
        answerButtonsElement.appendChild(button);

        // Funcion  que se le añade al boton de cada una de las respuestas
        button.addEventListener("click",()=>{
            selectAnswer()
            if(button.dataset.correct){
                countCorrect++
            }              
        });
    });
}

// Funcion para eliminar el contendor de botones respuesta
function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}   

// Funcion para chekear las respuestas son correctas o incorrectas
function checkAnswer(button) {
    answerFalse = datosQuiz[currentQuestionIndex].incorrect_answers
    answerTrue = datosQuiz[currentQuestionIndex].correct_answer

        if(answerFalse.includes(button.innerText)){
            button.classList.add("erronea")
            button.disabled = true
        
        }else{
            button.classList.add("correcta")
            button.disabled = true 
            button.dataset.correct = true
        }
}

// Funcion para comprobar el estado de numero de pregunta + Se llama en ShowQuestion
function selectAnswer() {
    Array.from(answerButtonsElement.children).forEach((button) => {
        checkAnswer(button);
    }); 

        if (datosQuiz.length > currentQuestionIndex + 1) {
            nextButton.classList.remove("hide");
        } else {
            printScore()
            saveScore()
            scoreCard.classList.remove("hide");
            questionContainerElement.classList.add("hide");
        } 
}

        
// Funcion para pintar el resultado en la tajeta de scoreCard
function printScore(){
    yourScore.innerHTML = `${countCorrect}`

    if(countCorrect <= 2){
        cardTitle.innerText = "Nice one troll"
        textScore.innerText = "Nice try, but you still need to improve your general knowledge skills! Keep going and keep learning to improve your score next time."
    }
    else if(countCorrect > 2 && countCorrect < 5){
        cardTitle.innerText = "Almost there loser"
        textScore.innerText = "You're almost there! Keep working hard and learning more to improve your results in the future."
    }
    else if(countCorrect >= 5 && countCorrect < 7){
        cardTitle.innerText = "You are a kiss-ass"
        textScore.innerText = "You are a kiss-ass! Your general knowledge skills are impressive, keep it up!"
        
    }
    else{
        cardTitle.innerText = "You are el BICHO"
        textScore.innerText = "You are el BICHO! Your general knowledge skills are exceptional and truly impressive. Keep going and show off your skills to everyone! SSSSSSSUUUUUU!" 
    }
}

// Funcion para almacenar los datos en el localStore
let scoreArray = JSON.parse(localStorage.getItem("scores")) || [];
function saveScore() {
    scoreArray.push(countCorrect);
    localStorage.setItem("scores", JSON.stringify(scoreArray));
}

// Funcion que muestra los resultados en containerAverage
function showStats() {
    if(scoreArray.length == 0) {
        average.innerHTML = "No game history";
        averageText.classList.remove("hide")
        clearBtn.classList.add("hide")
    }else {
        average.innerHTML = `You played <span class="azul">${scoreArray.length}</span> time/s. Your average: <span class="azul">${Number(scoreArray.reduce((a, v) => (a + v)) / scoreArray.length).toFixed(0)}</span>/10`
        chartDiv.innerHTML = `<canvas id="chart"></canvas>`;
        createChart();
        averageText.classList.add("hide")
        clearBtn.classList.remove("hide") 
    }
}

// Funcion aplicada al homeButton para volver al inicio
function goHome(){
    cardQuiz.classList.remove("hide");
    scoreCard.classList.add("hide");
    containerAverage.classList.remove("hide")
    chartDiv.classList.remove("hide")
    clearBtn.innerHTML = "Clear games";
    showStats()
}

// Funcion para limpir el localStorage  
function clearStorage() {
    if (clearBtn.classList.contains("clicked")){         
        localStorage.clear();
        scoreArray = [];
        clearBtn.classList.remove("clicked");  
        chartDiv.classList.add("hide")
        showStats()
    } else {        
        clearBtn.classList.add("clicked");  
        clearBtn.innerHTML = "Are you agree?";
    }
}

// Funcion para crear la grafica chart.js 
function createChart () {
    let xValues = scoreArray.map((game,index) => "Game " + (index + 1));
    let yValues = scoreArray.map(game => game);
    const barColor = "#0d6efd";
    
    new Chart("chart", {
        type: "bar",
        
        data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColor,
            data: yValues,
            barPercentage: 0.5,  
        }]
        },

        options: {
        legend: {display: false},
        title: {display: true},
        scales: {
            yAxes: [{
            gridLines: {display: false},
            ticks: {
                min: 0,
                max: 10,
            },
            }]
        }
        }
    });
}

// Botones con eventos y funciones 
clearBtn.addEventListener("click", clearStorage); 
restartButton.addEventListener("click", startGame);
startButton.addEventListener("click", startGame);
homeButton.addEventListener("click", goHome)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

// Llamada a funciones globales
showStats();




    