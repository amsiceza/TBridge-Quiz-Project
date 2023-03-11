// Llamada a los elementos del DOM para dar funcionalidades.
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const cardQuiz = document.getElementById("quizSport")

console.log(startButton)



// Enlace de la API almacenada en una variable
const API_URL = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"


// LLamada a la API mediante axios.
    // --> En el .then guardaremos los datos en una variable creada ".datosQuiz"
        axios.get(API_URL)
            .then(res => {
                // Guardar el array sobre el que vamos a trabajr en una variable
                const datos = res.data.results
                // Iteramos sobre los datos y agregamos cada objeto al array
                for (let i = 0; i < datos.length; i++) {
                datosQuiz.push(datos[i]);
                }
            })
            .catch(err=> console.error(err))
            
// Variable de datosQuiz = []
    // --> Guarda datos de la api (con axios).
    // --> Sobre esta variable sacamos el contenido.
        const datosQuiz = []
        console.log(datosQuiz)
    
// Variable sobre la que se va a iterar cuando avancen las preguntas
let currentQuestionIndex; 

// Funcion para empezar el quiz (Se aplica sobre el boton Start the Quiz)
function startGame() {
    cardQuiz.classList.add("hide");
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion()
}

startButton.addEventListener("click", startGame);

// Funcion para mostrar las questiones y crear un boton porfunction showQuestion(question) 
function showQuestion(question) {
    
    questionElement.innerText = question.question;
    
    question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    
    if (answer.correct) {
        button.dataset.correct = true;
    }

    answerButtonsElement.appendChild(button);
    
    });
}


function setNextQuestion() {
    showQuestion(datosQuiz[currentQuestionIndex]);
}
