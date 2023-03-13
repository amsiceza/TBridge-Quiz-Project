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


// Variable de datosQuiz = []
    // --> Guarda datos de la api (con axios).
    // --> Sobre esta variable sacamos el contenido.
    const datosQuiz = []
    console.log(datosQuiz)

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
            
// Variable sobre la que se va a iterar cuando avancen las preguntas
    // --> Marcara el posicionameniento de las preguntas array.
        let currentQuestionIndex; 

// Funcion para empezar el quiz 
    // --> Se aplica sobre el boton Start the Quiz
    // --> Nos conduce a la pregunta del array posicion [0]
        function startGame() {
            cardQuiz.classList.add("hide");
            currentQuestionIndex = 0;
            questionContainerElement.classList.remove("hide");
            setNextQuestion()
        }

        startButton.addEventListener("click", startGame);

// Funcion para mostrar las questiones y crear un boton porfunction showQuestion(question) 
    // --> Cambia el contenido de contenedor de "question"
    // --> Sacamos un array nuevo con las respuestas correctas e incorrectas.
    // --> Pintar las respuestas tanto correctas como incorrectas
        
        function showQuestion(question) {

            // pinta la pregunta
            questionElement.innerHTML = question.question
            // Crea un arreglo con todas las respuestas (correctas e incorrectas)
            const answers = [...question.incorrect_answers, question.correct_answer]
            // Mezcla las respuestas utilizando sort() y Math.random()
            const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
            // Pinta los botones de respuesta en orden aleatorio
            shuffledAnswers.forEach(answer => {
            const button = document.createElement("button");
            button.id = "answerButton"
            button.innerText = answer;
            answerButtonsElement.appendChild(button);

            // Ejecuta la funcion de check answer
            button.addEventListener("click",()=> {
            checkAnswer(button)})
            });
        }

        function setNextQuestion() {
            showQuestion(datosQuiz[currentQuestionIndex]);
        }

// Variables para guardar en diferentes arrays las respuestas correctas e incorrectas
        let answerFalse = []
        let answerTrue = []

// Funcion para chekear las respuestas
    // --> Se implementa en la función showQuestion
function checkAnswer(button) {
    answerFalse = datosQuiz[currentQuestionIndex].incorrect_answers
    answerTrue = datosQuiz[currentQuestionIndex].correct_answer
        if(answerFalse.includes(button.innerText)){
            button.classList.add("erronea")
            button.disabled = true
            console.log(button)
        }else{
            button.classList.add("correcta")
            button.disabled = true
            console.log(button)

            
        }
}

    


    