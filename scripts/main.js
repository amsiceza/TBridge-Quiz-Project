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
    // --> Cambia el contenido de contenedor de "question"
    // --> Sacamos un array nuevo con las respuestas correctas e incorrectas.
    // --> Pintar las respuestas tanto correctas como incorrectas

        function showQuestion(question) {
            
            questionElement.innerText = question.question;

            const answerQuiz = datosQuiz.map(({ correct_answer, incorrect_answers }) => ({ correct_answer, incorrect_answers }));
            console.log(answerQuiz)

            
            const buttonTrue = document.createElement("button");
            buttonTrue.innerText = answerQuiz[currentQuestionIndex].correct_answer;
            answerButtonsElement.appendChild(buttonTrue);

        
            answerQuiz[currentQuestionIndex].incorrect_answers.forEach(element => {
                const buttonFalse = document.createElement("button");
                buttonFalse.innerText = element;
                answerButtonsElement.appendChild(buttonFalse);
            });   
        }


        function setNextQuestion() {
            showQuestion(datosQuiz[currentQuestionIndex]);
        }
